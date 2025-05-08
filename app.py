from flask import Flask,request,jsonify
from dotenv import load_dotenv
import os
import re
import boto3
import uuid
import yt_dlp
from botocore.exceptions import NoCredentialsError
from flask_cors import CORS
import subprocess
from moviepy.video.io.VideoFileClip import VideoFileClip


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://ytdashfrontend.onrender.com"}})
load_dotenv()
aws_access_key = os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY")
aws_region = os.getenv("AWS_DEFAULT_REGION")

S3_BUCKET = 'youtubedownloadertempstorage'
s3_client = boto3.client('s3')



def download_and_upload_to_s3(video_url,format_option,start_time,end_time):
    file_id = str(uuid.uuid4())    
    output_path = f"/tmp/{file_id}.{'mp3' if format_option == 'audio' else 'mp4'}"
    trimmed_output_path = f"/tmp/trimmed_{file_id}.{'mp3' if format_option == 'audio' else 'mp4'}"
    
    ydl_opts = {
        'format': 'bestaudio' if format_option == 'audio' else 'best',
        'outtmpl': output_path,           
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])    
    try:
        ffmpeg_command = [
            'ffmpeg', '-i', output_path,
            '-ss', start_time, '-to', end_time,
            '-c', 'copy', trimmed_output_path
        ]
        subprocess.run(ffmpeg_command, check=True)

        s3_client.upload_file(trimmed_output_path, S3_BUCKET, file_id)        
        download_url = s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': S3_BUCKET, 'Key': file_id},
            ExpiresIn=600
        )
        
        return (download_url,trimmed_output_path)
    except NoCredentialsError:
        return (None,None)

@app.route('/api',methods=['POST'])
def home():    
    data = request.json
    video_url = data.get('videoUrl')
    format_option = data.get('format','video')
    start_time = data.get('startTime')
    end_time = data.get('endTime')
    pattern = r'^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$'
    
    if not video_url or len(video_url.rstrip())==0:
        return jsonify({'message':'No video url provided'}),400
    if not re.match(pattern,start_time) or not re.match(pattern,end_time):
        return jsonify({'message':'Timestamps are in incorrect format'}),400
    if start_time>end_time:
        return jsonify({'message':'End time should be after Start time'}),400
    download_link,output_path = download_and_upload_to_s3(video_url,format_option,start_time,end_time)    
    if download_link and output_path:
        return jsonify({'downloadLink':download_link}),200
        # audio_text = extract_audio_to_text(output_path) 
        # if audio_text:       
        #     return jsonify({'downloadLink':download_link,'audioText':audio_text}),200
        # else:
        #     return jsonify({'message':'Failed to download audio'}),500 
    else:
        return jsonify({'message':'Failed to download video'}),500
    

if __name__ == '__main__':
    app.run(debug=True)

