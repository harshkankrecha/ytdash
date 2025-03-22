import React from 'react';

function Options({format,setFormat}){
    return(
        <div>
            <label>Select Format</label>
            <select value={format} onChange={(e)=>setFormat(e.target.value)}>
            <option value="mp4">MP4</option>
            <option value="mp3">MP3</option>
            </select>
            
        </div>
    );
}
export default Options;