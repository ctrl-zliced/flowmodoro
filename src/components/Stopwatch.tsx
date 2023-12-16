import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Typography as Text,
  Fab,
  Stack,
  Button,
  useTheme,
} from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { formatTime, formatTimeMS } from '../utils/formatting.js';


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
}: StopwatchProps): JSX.Element {
  const [startTime, setStartTime] = useState(0);
  const [breakEndTime, setBreakEndTime] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  const breakInterval = useRef<NodeJS.Timeout>();
  const theme = useTheme();
  const alarm = new Audio(
    'https://assets.coderrocketfuel.com/pomodoro-times-up.mp3',
  );
  // const [alarm, setAlarm] = useState(null)
  // useEffect(() => {
  // // setAlarm(new Audio('https://assets.coderrocketfuel.com/pomodoro-times-up.mp3'))
  // }, [])

  const handleReset = useCallback(() => {
    setStartTime(0);
    setTime(0);
    setIsRunning(false);
    setBreakTime(0);
  }, [setTime, setIsRunning]);

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
    const now = Date.now();
    const elapsedTime = now - startTime;
    setTime(elapsedTime);
    setBreakTime(elapsedTime / 5);
  }, [startTime, setTime]);

  const handleBreakClick = useCallback(() => {
    if (!isBreak) {
      setBreakEndTime(Date.now() + breakTime); // set break end time
      setIsBreak(true);
    } else {
      clearInterval(breakInterval.current);
      setIsBreak(false);
    }
  }, [isBreak, breakTime, setBreakTime, setIsBreak]);

  const updateBreakTime = useCallback(() => {
    const now = Date.now();
    setBreakTime(breakEndTime - now);
    if (breakTime <= 0) {
      alarm.play();
      alert('Break time is over!');
      setIsBreak(false);
    }
  }, [breakEndTime, breakTime, setBreakTime]);

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(updateTime, 10);
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

  return (
    <div>
      <Text variant="h2" textAlign={'center'}>
        {formatTime(time)}
      </Text>

      {/* break button */}
      <Button
        size="small"
        variant="contained"
        className="bottom-6 left-6"
        style={{
          position: 'absolute',
          textTransform: 'none',
          backgroundColor:
            breakTime > 0 && !isRunning ? theme.palette.primary.light : '',
        }}
        disabled={isRunning || breakTime <= 0}
        onClick={() => handleBreakClick()}
      >
        {breakTime > 0 ? `${formatTimeMS(breakTime)}` : 'Break'}
        {isBreak ? (
          <PauseIcon fontSize="small" />
        ) : !isRunning && breakTime > 0 ? (
          <PlayArrow fontSize="small" />
        ) : null}
      </Button>

      {/* fab buttons for timer */}
      <Stack
        direction="row"
        gap={1}
        alignItems={'end'}
        style={{ position: 'absolute', bottom: 24, right: 24 }}
      >
        <Fab size="small" color="secondary" onClick={() => handleReset()}>
          <RestartAltIcon />
        </Fab>
        <Fab
          onClick={() => handleStartClick()}
          size="large"
          color={isRunning ? 'error' : 'primary'}
        >
          {isRunning ? <PauseIcon /> : <PlayArrow />}
        </Fab>
      </Stack>
    </div>
  );
}

export default Stopwatch;
