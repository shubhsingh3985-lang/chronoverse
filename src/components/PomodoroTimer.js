import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  ProgressBar,
  Form,
  Collapse,
} from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import alarmSound from '../assets/alarm.mp3';
import { Helmet } from 'react-helmet';

<Helmet>
  <title>	Pomodoro Timer – Chronoverse</title>
  <meta name="description" content="Boost focus with the Pomodoro Technique. Includes session tracking, break reminders, and auto-switching." />
</Helmet>

const DEFAULT_DURATIONS = {
  pomodoro: 25,
  short: 5,
  long: 15,
};

export default function PomodoroTimer() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [durations, setDurations] = useState(() => {
    const saved = localStorage.getItem('pomodoroDurations');
    return saved ? JSON.parse(saved) : DEFAULT_DURATIONS;
  });

  const [mode, setMode] = useState('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState(durations.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alarmSound));

  // Handle mode change
  useEffect(() => {
    setSecondsLeft(durations[mode] * 60);
    pause();
  }, [mode]);

  // Countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsRunning(false);
            audioRef.current.play();

            // Auto-switch logic
            const nextMode =
              mode === 'pomodoro' ? 'short' : mode === 'short' ? 'pomodoro' : 'pomodoro';

            setMode(nextMode);
            return durations[nextMode] * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };
  const reset = () => {
    pause();
    setSecondsLeft(durations[mode] * 60);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progress =
    ((durations[mode] * 60 - secondsLeft) / (durations[mode] * 60)) * 100;

  const handleDurationChange = (key, value) => {
    const updated = {
      ...durations,
      [key]: Math.max(1, parseInt(value) || 1),
    };
    setDurations(updated);
    localStorage.setItem('pomodoroDurations', JSON.stringify(updated));
    if (mode === key) setSecondsLeft(updated[key] * 60);
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card
        style={{
          backgroundColor: themeStyles.card,
          color: themeStyles.color,
          width: '100%',
          maxWidth: '400px',
          borderRadius: '1rem',
          padding: '1.5rem',
        }}
        className="shadow"
      >
        <Card.Title className="text-center mb-4">🍅 Pomodoro Timer</Card.Title>

        <div className="text-center w-100 mb-4">
          <Button
            variant={theme === 'light' ? 'outline-secondary' : 'outline-light'}
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            {showSettings ? 'Hide Settings' : '⏱ Customize Durations'}
          </Button>
        </div>

        <Collapse in={showSettings}>
          <div className="mt-4">
            {['pomodoro', 'short', 'long'].map((key) => (
              <Form.Group key={key} className="mb-2">
                <Form.Label>{key === 'pomodoro' ? 'Pomodoro' : key === 'short' ? 'Short Break' : 'Long Break'} (minutes)</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={durations[key]}
                  onChange={(e) => handleDurationChange(key, e.target.value)}
                />
              </Form.Group>
            ))}
          </div>
        </Collapse>
        <ButtonGroup className="w-100 mb-4">
          {['pomodoro', 'short', 'long'].map((key) => (
            <Button
              key={key}
              variant={
                mode === key
                  ? 'primary'
                  : theme === 'light'
                    ? 'outline-dark'
                    : 'outline-light'
              }
              onClick={() => setMode(key)}
              className="text-capitalize"
            >
              {key === 'short' ? 'Short Break' : key === 'long' ? 'Long Break' : 'Pomodoro'}
            </Button>
          ))}
        </ButtonGroup>

        <h1
          className="display-3 text-center mb-3"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {formatTime(secondsLeft)}
        </h1>

        <ProgressBar
          now={progress}
          variant={theme === 'light' ? 'primary' : 'info'}
          className="mb-4"
        />

        <div className="d-flex justify-content-around mb-3">
          {isRunning ? (
            <Button variant="warning" onClick={pause} className="rounded-pill px-4">
              Pause
            </Button>
          ) : (
            <Button variant="success" onClick={start} className="rounded-pill px-4">
              Start
            </Button>
          )}
          <Button variant="danger" onClick={reset} className="rounded-pill px-4">
            Reset
          </Button>
        </div>


      </Card>
    </Container>
  );
}
