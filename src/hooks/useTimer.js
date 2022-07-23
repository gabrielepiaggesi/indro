import { useEffect, useState } from "react";

function fancyTimeFormat(duration)
{   
    if (duration === null) return null;
    //~~ stand for Math.floor()
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    console.log(ret);
    return ret;
}

export const useTimer = (startTime) => {
    const [time, setTime] = useState(startTime);
    const [fancyTime, setFancyTime] = useState(fancyTimeFormat(startTime));
    const [intervalID, setIntervalID] = useState(null);
    let hasTimerEnded = time <= 0;
    const isTimerRunning = intervalID != null;

    const update = () => {
        setTime(time => {
            const newTime = time - 1;
            setFancyTime(fancyTime => fancyTimeFormat(newTime));
            return newTime;
        });
    }
    
    const startTimer = (timing) => {
        console.log(timing);
        setTime(time => timing);
        setFancyTime(fancyTime => fancyTimeFormat(timing));
        hasTimerEnded = timing <= 0;
        if (!hasTimerEnded && !isTimerRunning) {
            console.log('GOING!');
            setIntervalID(setInterval(update, 1000));
        }
    };
    
    const stopTimer = () => {
        clearInterval(intervalID);
        setIntervalID(null);
    };

    const resetTimer = () => {
        clearInterval(intervalID);
        setIntervalID(null);
        setTime(null);
        setFancyTime(null);
    };
    
    // clear interval when the timer ends
    useEffect(() => {
        if (hasTimerEnded) {
            clearInterval(intervalID);
            setIntervalID(null);
        }
    }, [hasTimerEnded])
    
    // clear interval when component unmounts
    useEffect(() => () => {
        clearInterval(intervalID);
    }, [])
    
    return {
        time,
        fancyTime,
        startTimer,
        stopTimer,
        resetTimer
    };
}