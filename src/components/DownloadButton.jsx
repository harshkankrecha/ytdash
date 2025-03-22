import React from 'react';

function DownloadButton({onDownload}){
    return(
        <div>
            <button onClick={onDownload}>
                Download
            </button>
        </div>
    );
}

export default DownloadButton;