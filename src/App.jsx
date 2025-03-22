import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './components/InputField';
import DownloadButton from './components/DownloadButton';
import Options from './components/Options';
import DownloadStatus from './components/DownloadStatus';
function App() {
  const [videoUrl,setVideoUrl] = useState('');
  const [format,setFormat] = useState('mp4');
  const [downloadLink,setDownloadLink] = useState('');
  const [audioText,setAudioText] = useState('');
  const [status,setStatus] = useState('');
  const [btnStatus,setBtnStatus] = useState(false);
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [errorStr,setErrorStr] = useState(""); 
  
  const handleDownload = async () => {
    setStatus('loading');
    setBtnStatus(true);
    try {      
      const response = await axios.post('https://ytdashserver.onrender.com/api',{ videoUrl,format,startTime,endTime })
      setDownloadLink(response.data.downloadLink);
      setAudioText(response.data.audioText);
      setStatus('completed');
      setBtnStatus(false);
      setErrorStr("");
    } catch(error) {           
      setStatus('error');
      setErrorStr('Failed! Try with correct values..');
      setBtnStatus(false);
    }
  }

  return (
    <div class="main">
      <div class="ribbon-box">
      <div class="ribbon">Youtube Downloader</div>
      </div>      
      <h1 class="main-heading">YTDash</h1>
      <InputField videoUrl={videoUrl} setVideoUrl={setVideoUrl} onDownload={handleDownload} format={format} setFormat={setFormat} btnStatus={btnStatus} setBtnStatus={setBtnStatus} setEndTime={setEndTime} setStartTime={setStartTime} startTime={startTime} endTime={endTime} startError={startError} setStartError={setStartError} endError={endError} setEndError={setEndError}/>     
      <DownloadStatus status={status} downloadLink={downloadLink} audioText={audioText} errorStr={errorStr}/>
    </div>
  )
}
export default App;
