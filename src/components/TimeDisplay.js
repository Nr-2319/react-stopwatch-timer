/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

const TimeDisplay = () => {
    const [currTime, setCurrTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrTime(new Date());
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    const formatTime = currTime.toLocaleTimeString();

    return <div>{formatTime}</div>;
};

export default TimeDisplay;
