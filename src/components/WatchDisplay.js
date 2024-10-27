import React from "react";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

const WatchDisplay = ({ isStopWatch }) => {
    return (
        <div
            style={{
                height: "350px",
                padding: "1em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                textAlign: "center",
            }}
        >
            {isStopWatch ? <StopWatch /> : <Timer />}
        </div>
    );
};

export default WatchDisplay;
