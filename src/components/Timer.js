import { Button, Flex, Heading } from "@radix-ui/themes";
import React, { useState, useEffect, useRef } from "react";
import CardPallete from "./CardPallete";

const Timer = () => {
    const [time, setTime] = useState(0); // Time in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [show, setShow] = useState(false);
    const timerRef = useRef(null);
    const [anyClicked, setAnyClicked] = useState(false);

    // Start the countdown based on the Button clicked
    const startTimer = (durationInMinutes) => {
        setAnyClicked(true);
        clearInterval(timerRef.current);
        const min = parseInt(durationInMinutes * 60);
        setTime(min);
        setIsRunning(true);
    };

    // Pause the countdown
    const pauseTimer = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        } else {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
    };

    // Reset the timer
    const resetTimer = () => {
        setAnyClicked(false);
        clearInterval(timerRef.current);
        setTime(0);
        setIsRunning(false);
        setShow(false);
    };

    useEffect(() => {
        if (isRunning && time > 0) {
            setShow(false);
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (time === 0) {
            if (anyClicked) {
                setShow(true);
            }
            clearInterval(timerRef.current);
            setIsRunning(false);
        }

        return () => clearInterval(timerRef.current);
    }, [isRunning, time, anyClicked]);

    // Format the time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <>
            <Heading mb="5" size="8" align="center" weight="medium">
                <Flex gap="1" justify="center">
                    {formatTime(time)
                        .split("")
                        .map((text, index) => (
                            <CardPallete key={index} text={text} />
                        ))}
                </Flex>
            </Heading>

            {show ? (
                <Heading m="5" size="5">
                    Time Finished
                </Heading>
            ) : (
                <Heading m="5" size="5"></Heading>
            )}

            <Flex gap="9" justify="center">
                <Button
                    size="3"
                    variant="soft"
                    color="sky"
                    onClick={() => startTimer(0.09)}
                >
                    + 5 sec
                </Button>
                <Button
                    size="3"
                    variant="soft"
                    color="sky"
                    onClick={() => startTimer(1)}
                >
                    + 1 min
                </Button>
                <Button
                    size="3"
                    variant="soft"
                    color="blue"
                    onClick={() => startTimer(5)}
                >
                    + 5 min
                </Button>
                <Button
                    size="3"
                    variant="soft"
                    color="teal"
                    onClick={() => startTimer(10)}
                >
                    + 10 min
                </Button>
            </Flex>

            <Flex justify="center" gap="9">
                <Button
                    variant="soft"
                    className="btn"
                    color={`${isRunning ? "crimson" : "cyan"}`}
                    onClick={pauseTimer}
                >
                    {isRunning ? "Pause" : "Resume"}
                </Button>
                <Button
                    variant="soft"
                    className="btn"
                    color="orange"
                    onClick={resetTimer}
                >
                    Reset
                </Button>
            </Flex>
        </>
    );
};

export default Timer;
