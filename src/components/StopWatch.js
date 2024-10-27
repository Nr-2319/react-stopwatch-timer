import { Button, Flex, Heading } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import CardPallete from "./CardPallete";

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const startStopWatch = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }
    };

    const pauseStopwatch = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const resetStopwatch = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTime(0); // Reset time to 0
    };

    const formatTime = (time) => {
        const milliseconds = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
        )}:${String(milliseconds).padStart(3, "0")}`;
    };

    return (
        <>
            <div>
                <Heading size="8" align="center" weight="medium">
                    <Flex gap="1" justify="center">
                        {formatTime(time)
                            .split("")
                            .map((text, index) => (
                                <CardPallete key={index} text={text} />
                            ))}
                    </Flex>
                </Heading>
            </div>

            <Flex gap="9">
                {!isRunning ? (
                    <Button
                        onClick={startStopWatch}
                        disabled={isRunning}
                        className="btn"
                        color="cyan"
                        variant="soft"
                    >
                        Start
                    </Button>
                ) : (
                    <Button
                        onClick={pauseStopwatch}
                        disabled={!isRunning}
                        className="btn"
                        color="crimson"
                        variant="soft"
                    >
                        Stop
                    </Button>
                )}

                <Button
                    onClick={resetStopwatch}
                    className="btn"
                    color="orange"
                    variant="soft"
                >
                    Reset
                </Button>
            </Flex>
        </>
    );
};

export default StopWatch;
