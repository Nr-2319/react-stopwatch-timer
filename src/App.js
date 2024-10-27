import { useState } from "react";
import "./App.css";

import TimeDisplay from "./components/TimeDisplay";
import WatchDisplay from "./components/WatchDisplay";
import { Button } from "@radix-ui/themes";

export default function App() {
    const [isStopWatch, setIsStopWatch] = useState(true);

    function handleClick(event, msg) {
        event.stopPropagation();

        if (msg === "stopwatch") {
            setIsStopWatch(true);
        } else {
            setIsStopWatch(false);
        }
    }

    return (
        <>
            <div className="parent">
                <TimeDisplay />
                <WatchDisplay isStopWatch={isStopWatch} />

                <div className="buttons">
                    <Button
                        onClick={(e) => handleClick(e,"stopwatch")}
                        className={`btn ${isStopWatch ? "active" : null}`}
                        color="green"
                        variant="soft"
                    >
                        Stop Watch
                    </Button>
                    <Button
                        onClick={(e) => handleClick(e,"timer")}
                        className={`btn ${!isStopWatch ? "active" : null}`}
                        color="green"
                        variant="soft"
                    >
                        Timer
                    </Button>
                </div>

                
            </div>
        </>
    );
}
