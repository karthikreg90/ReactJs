import React, { useState, useEffect } from "react";


function Timer(){
    const [time, setTime] = useState("");

    useEffect(() => {
        console.log("Component Did mount and update");
        const interVal = setInterval(showDate, 1000);

        return () => {
            console.log("Component will unmount");
            clearInterval(interVal);
        }
    }, []);

    function showDate(){
        setTime(new Date().toString());
    }

    return(
        <div>
            Current Timer
            <b>{time}</b>
        </div>
    );
}

export default Timer;