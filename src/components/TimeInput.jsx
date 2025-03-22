import React, { useState } from 'react';
function TimeInput({setEndTime,setStartTime,startTime,endTime,startError,setStartError,endError,setEndError,setBtnStatus}) {       
    const inputStyle = {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        width: "120px",
        textAlign: "center",
        margin: "0 auto",
        outline: "none",
    };
    

    const validateTimeFormat = (time) => {
        const timePattern = /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/;
        return timePattern.test(time);
    };

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);

        if (!validateTimeFormat(newStartTime)) {
            setStartError("Start time must be in HH:MM:SS format.");
            setBtnStatus(true);
        } else {
            setStartError("");
            
            if (validateTimeFormat(endTime) && newStartTime > endTime) {
                setEndError("End time cannot be earlier than start time.");
                setEndTime(newStartTime);
                setBtnStatus(true);
            }
            else if(validateTimeFormat(endTime) && newStartTime <= endTime){
                setEndError("");
                setBtnStatus(false);
            }
        }
    };

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        setEndTime(newEndTime);

        if (!validateTimeFormat(newEndTime)) {
            setEndError("End time must be in HH:MM:SS format.");
            setBtnStatus(true);
        } else {
            setEndError("");
            if (validateTimeFormat(startTime) && newEndTime < startTime) {
                setStartError("Start time cannot be later than end time.");
                setStartTime(newEndTime);
                setBtnStatus(true);
            }
            else if(validateTimeFormat(startTime) && newEndTime >= startTime){
                setStartError("");
                setBtnStatus(false);
            }
        }
    };

    return (
        <>
        <div style={{ display: "flex", gap:"20px",justifyContent: "space-between", width:"100%"}}>
            <div style={{ display: "flex",marginTop: "20px" ,marginLeft:"50px" }}>
                <label style={{ fontWeight: "bold", marginTop: "10px",marginRight: "10px", color:"#F05454"}}>Start Time:</label>
                <input
                    type="text"  
                    style={inputStyle}
                    value={startTime}
                    placeholder="HH:MM:SS"
                    onChange={handleStartTimeChange}
                />
                
            </div>
            
            <div style={{ display: "flex",marginTop: "20px",marginRight:"33px" }}>
                <label style={{ fontWeight: "bold", marginTop: "10px",marginRight: "10px", color:"#F05454"}}>End Time:</label>
                <input
                    type="text"  
                    style={inputStyle}
                    value={endTime}
                    placeholder="HH:MM:SS"
                    onChange={handleEndTimeChange}
                />
                
            </div>
            
        </div>
        <div style = {{ display:"flex",justifyContent:"space-between",width:"100%",gap:"20px"}}>
        {startError  ? <div style={{ fontWeight: "bold",color: "#F05454", marginLeft: "50px",marginTop:"20px",marginRight:"10px" }}>{startError}</div>:<div style={{ color: "red", marginLeft: "50px",marginTop:"20px",marginRight:"20px" }}></div>}        
        {endError ? <div style={{ fontWeight: "bold",color: "#F05454", marginRight: "33px",marginTop:"20px",marginLeft:"100px" }}>{endError}</div>:<div style={{ color: "red", marginRight: "33px",marginTop:"20px",marginLeft:"20px" }}></div>}
        </div>
        
        </>
        
    );
}
export default TimeInput;