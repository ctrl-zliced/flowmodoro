import React, { useCallback, useState, useRef, useEffect } from "react";
import {
    Typography as Text,
    Fab,
    Stack,
    Button,
    useTheme,
    Snackbar,
    Alert,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { formatTime, formatTimeMS } from "../utils/formatting.js";

/**
 * StopwatchProps interface for Stopwatch component
 * @interface
 * @property {number} time - The current time in milliseconds
 * @property {React.Dispatch<React.SetStateAction<number>>} setTime - Function to set the time
 * @property {boolean} isRunning - Whether the stopwatch is running
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsRunning - Function to set the running state
 * @property {number} breakTime - The break time in milliseconds
 * @property {React.Dispatch<React.SetStateAction<number>>} setBreakTime - Function to set the break time
 */
interface StopwatchProps {
    time: number;
    setTime: React.Dispatch<React.SetStateAction<number>>;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    isBreak: boolean;
    setIsBreak: React.Dispatch<React.SetStateAction<boolean>>;
    breakTime: number;
    setBreakTime: React.Dispatch<React.SetStateAction<number>>;
    showStats?: boolean;
    setShowStats?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Stopwatch component
 * @param {StopwatchProps} props - StopwatchProps interface
 * @returns {JSX.Element} Stopwatch component
 */
function Stopwatch({
    time,
    setTime,
    isRunning,
    setIsRunning,
    isBreak,
    setIsBreak,
    breakTime,
    setBreakTime,
    showStats,
    setShowStats,
}: StopwatchProps): JSX.Element {
    const [startTime, setStartTime] = useState(0);
    const [breakEndTime, setBreakEndTime] = useState(0);
    const interval = useRef<NodeJS.Timeout>();
    const breakInterval = useRef<NodeJS.Timeout>();
    const theme = useTheme();
    const [breakSnackbarOpen, setBreakSnackbarOpen] = useState(false);
    const [totalFlowTime, setTotalFlowTime] = useState(0);
    const [totalFlowTimeDisplay, setTotalFlowTimeDisplay] = useState(0);
    const [resets, setResets] = useState(0);
    const [totalBreakTime, setTotalBreakTime] = useState(0);
    const [totalBreakTimeDisplay, setTotalBreakTimeDisplay] = useState(0);
    const [breaksCompleted, setBreaksCompleted] = useState(0);
    const [breakStartTime, setBreakStartTime] = useState(0);

    const platform = window.navigator.platform;
    const screenHeight = window.innerHeight;

    const resetStats = () => {
        setTotalFlowTime(0);
        setTotalFlowTimeDisplay(0);
        setResets(0);
        setTotalBreakTime(0);
        setBreaksCompleted(0);
        setTotalBreakTimeDisplay(0);
        localStorage.setItem("totalFlowTime", "0");
        localStorage.setItem("totalBreakTime", "0");
        localStorage.setItem("breaksCompleted", "0");
        localStorage.setItem("resets", "0");
    };

    const updateTotalFlowTime = () => {
        setTotalFlowTime(Math.round((totalFlowTime + time) / 1000) * 1000);
    };

    const handleReset = useCallback(() => {
        updateTotalFlowTime();
        if (time > 0) {
            setResets(resets + 1);
        }
        setStartTime(0);
        setTime(0);
        setIsRunning(false);
        setBreakTime(0);
        localStorage.setItem("resets", (resets +1).toString());
        localStorage.setItem("time", "0");
    }, [
        setTime,
        setIsRunning,
        setTotalFlowTime,
        time,
        setBreakTime,
        resets,
        // setResets,
    ]);

    const handleStartClick = useCallback(() => {
        if (!isRunning) {
            setStartTime(Date.now() - time);
            setIsRunning(true);
            setIsBreak(false);
        } else {
            clearInterval(interval.current);
            setIsRunning(false);
        }
    }, [isRunning, time, setIsRunning]);

    const updateTime = useCallback(() => {
        console.log(platform);
        const now = Date.now();
        const elapsedTime = now - startTime;
        setTime(elapsedTime);
        localStorage.setItem("time", elapsedTime.toString());
        setTotalFlowTimeDisplay(totalFlowTime + elapsedTime);
        localStorage.setItem("totalFlowTime", (totalFlowTime + elapsedTime).toString());
        setBreakTime(elapsedTime / 5);
    }, [startTime, setTime, totalFlowTime]);

    const handleBreakClick = useCallback(() => {
        if (!isBreak) {
            updateTotalFlowTime();
            setBreakStartTime(breakTime);
            setBreakEndTime(Date.now() + breakTime); // set break end time
            setIsBreak(true);
        } else {
            setTotalBreakTime(totalBreakTime + (breakStartTime - breakTime));
            setTotalFlowTime(Math.round((totalFlowTime - time) / 1000) * 1000);
            clearInterval(breakInterval.current);
            setIsBreak(false);
        }
    }, [isBreak, breakTime, setBreakTime, setIsBreak]);

    const updateBreakTime = useCallback(() => {
        const now = Date.now();
        setBreakTime(breakEndTime - now);
        setTotalBreakTimeDisplay(totalBreakTime + (breakStartTime - breakTime));
        if (time > 0) {
            setTime(breakTime * 5);
            localStorage.setItem("time", (breakTime * 5).toString());
        }
        if (breakTime <= 0) {
            setTotalBreakTime(totalBreakTime + breakStartTime);
            setBreaksCompleted(breaksCompleted + 1);
            setBreakSnackbarOpen(true);
            setIsBreak(false);
            setTime(0);
            localStorage.setItem("totalBreakTime", (totalBreakTime + breakStartTime).toString());
            localStorage.setItem("breaksCompleted", (breaksCompleted + 1).toString());
            localStorage.setItem("time", "0");
        }
    }, [breakEndTime, breakTime, setBreakTime]);

    useEffect(() => {
        if (isRunning) {
            interval.current = setInterval(updateTime, 500);
        } else {
            clearInterval(interval.current);
        }

        return () => clearInterval(interval.current);
    }, [isRunning, updateTime]);

    useEffect(() => {
        if (isBreak) {
            breakInterval.current = setInterval(updateBreakTime, 10);
        } else {
            clearInterval(breakInterval.current);
        }
        return () => clearInterval(breakInterval.current);
    }, [isBreak, updateBreakTime]);

    // get stats from local storage
    useEffect(() => {
        const storedTotalFlowTime = localStorage.getItem("totalFlowTime");
        const storedTotalBreakTime = localStorage.getItem("totalBreakTime");
        const storedBreaksCompleted = localStorage.getItem("breaksCompleted");
        const storedResets = localStorage.getItem("resets");
        const storedTime = localStorage.getItem("time");

        if (storedTime) {
            setTime(parseInt(storedTime));
            setBreakTime(parseInt(storedTime) / 5);
        }

        if (storedTotalFlowTime && storedTime) {
            setTotalFlowTime(parseInt(storedTotalFlowTime) - parseInt(storedTime));
            setTotalFlowTimeDisplay(parseInt(storedTotalFlowTime));
        }
        if (storedTotalBreakTime) {
            setTotalBreakTime(parseInt(storedTotalBreakTime));
            setTotalBreakTimeDisplay(parseInt(storedTotalBreakTime));
        }
        if (storedBreaksCompleted) {
            setBreaksCompleted(parseInt(storedBreaksCompleted));
        }
        if (storedResets) {
            setResets(parseInt(storedResets));
        }
    }, []);
    
    return (
        <div>
            <Text
                color={
                    isRunning
                        ? "white"
                        : isBreak
                        ? theme.palette.success.main
                        : "rgba(255,255,255,0.2)"
                }
                variant="h2"
                textAlign={"center"}
            >
                {formatTime(time)}
            </Text>

            {/* fab buttons for timer */}
            <Stack
                direction="row"
                gap={1}
                alignItems={"center"}
                justifyContent={"space-between"}
                className="stopwatch-buttons"
                style={{ paddingBottom: platform === "iPhone" ? 52 : 20 }}
            >
                {/* break button */}
                <Button
                    size="small"
                    variant="contained"
                    style={{
                        textTransform: "none",
                        backgroundColor:
                            breakTime > 0 && !isRunning
                                ? theme.palette.primary.light
                                : "",
                    }}
                    disabled={isRunning || breakTime <= 0}
                    onClick={() => handleBreakClick()}
                >
                    {breakTime > 0 ? `${formatTimeMS(breakTime)}` : "Break"}
                    {isBreak ? (
                        <PauseIcon fontSize="small" />
                    ) : !isRunning && breakTime > 0 ? (
                        <PlayArrow fontSize="small" />
                    ) : null}
                </Button>

                {/* reset button */}
                <Fab
                    style={{ marginLeft: "auto" }}
                    size="small"
                    color="secondary"
                    onClick={() => handleReset()}
                >
                    <RestartAltIcon />
                </Fab>

                {/* start button */}
                <Fab
                    onClick={() => handleStartClick()}
                    size="large"
                    color={isRunning ? "error" : "primary"}
                >
                    {isRunning ? <PauseIcon /> : <PlayArrow />}
                </Fab>

                <Snackbar
                    style={{
                        bottom: platform === "iPhone" ? 52 : 32,
                        width: "100vw",
                        position: "fixed",
                    }}
                    open={breakSnackbarOpen}
                    message="Note archived"
                    onClose={() => setBreakSnackbarOpen(false)}
                >
                    <Alert
                        style={{
                            width: "95%",
                            transition: "all 0.5s ease-in-out",
                        }}
                        elevation={4}
                        severity="info"
                        onClose={() => setBreakSnackbarOpen(false)}
                    >
                        Break is over!
                    </Alert>
                </Snackbar>
            </Stack>

            {/* stats */}
            {showStats && 
            <div>
                <Text
                    color="rgba(255,255,255,0.2)"
                    variant="subtitle2"
                    textAlign={"center"}
                >
                    Resets: {resets}
                </Text>
                <Text
                    color="rgba(255,255,255,0.2)"
                    variant="subtitle2"
                    textAlign={"center"}
                >
                    Full breaks: {breaksCompleted}
                </Text>
                <Text
                    color="rgba(255,255,255,0.2)"
                    variant="subtitle2"
                    textAlign={"center"}
                >
                    Total flowtime: {formatTime(totalFlowTimeDisplay)}
                </Text>
                <Text
                    color="rgba(255,255,255,0.2)"
                    variant="subtitle2"
                    textAlign={"center"}
                >
                    Total breaktime: {formatTime(totalBreakTimeDisplay)}
                </Text>

                <div className="flex flex-row justify-center">
                    <Button
                        variant="text"
                        size="small"
                        className="hover:scale-105"
                        onClick={resetStats}
                    >
                        reset
                    </Button>
                </div>
            
            </div>
            }
        </div>
    );
}

export default Stopwatch;
