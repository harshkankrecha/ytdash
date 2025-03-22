import React from 'react';
import './DownloadStatusButton.css';

function DownloadStatus({status,downloadLink,audioText,errorStr}){
    return (
        <div className="download-status">
            { status === 'loading' && <div className="loader"></div>             
            }
            { status === 'completed' && (
            <p className="response-text">
            {audioText}<a className='download-link' href={downloadLink} target="_blank" rel="noopener noreferrer">Claim your content!</a>
            
            </p>
            )}
            { status === 'error' && <p className="error-text">{ errorStr }</p> }
        </div>
    );
}
export default DownloadStatus;