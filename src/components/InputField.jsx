import React from 'react';
import './InputField.css';
import TimeInput from './TimeInput';

function InputField({videoUrl,setVideoUrl,onDownload,format,setFormat,btnStatus,setBtnStatus,setEndTime,setStartTime,startTime,endTime,startError,setStartError,endError,setEndError}){
    return (
        <>
        <div className="input-field">            
            <select value={format} onChange={(e)=>setFormat(e.target.value)} className="select-box">
            <option value="mp4">MP4</option>
            <option value="mp3">MP3</option>
            </select>          
            <input
            type="text"
            value={videoUrl}
            onChange={(e)=>setVideoUrl(e.target.value)}
            className="input-box"
            />
            <button disabled={ btnStatus === true} onClick={onDownload} className="download-btn">
                Download
            </button>
            
        </div>
        <div>
            <TimeInput setEndTime={setEndTime} setStartTime={setStartTime} startTime={startTime} endTime={endTime} startError={startError} setStartError={setStartError} endError={endError} setEndError={setEndError} setBtnStatus={setBtnStatus}/>
        </div>
        </>
    );
}
export default InputField;