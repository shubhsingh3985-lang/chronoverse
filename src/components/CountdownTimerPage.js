import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import { Helmet } from 'react-helmet';

<Helmet>
    <title>Countdown Timer – Chronoverse</title>
    <meta name="description" content="Set custom countdown timers for tasks, workouts, or reminders. Minimal design, clear alerts, and theme support." />
</Helmet>

export default function CountdownTimerPage() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const [timeLeft, setTimeLeft] = useState(0);
    const [inputTime, setInputTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const formatTime = (ms) => {
        const milliseconds = ms % 1000;
        const totalSeconds = Math.floor(ms / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const hours = Math.floor(totalSeconds / 3600);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
            seconds
        ).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
    };

    const startTimer = () => {
        if (timeLeft <= 0) return;

        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1000) {
                    clearInterval(intervalRef.current);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1000;
            });
        }, 1000);
    };

    const pauseTimer = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    const stopTimer = () => {
        pauseTimer();
        const totalMs =
            (inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds) * 1000;
        setTimeLeft(totalMs);
    };


    const resetTimer = () => {
        pauseTimer();
        setTimeLeft(0);
        setInputTime({ hours: 0, minutes: 0, seconds: 0 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputTime({ ...inputTime, [name]: Number(value) });
    };

    const setCountdown = () => {
        const totalMs =
            (inputTime.hours * 3600 + inputTime.minutes * 60 + inputTime.seconds) * 1000;
        setTimeLeft(totalMs);
    };
    const setTimer = () => {
        const totalMs =
            inputTime.hours * 3600000 +
            inputTime.minutes * 60000 +
            inputTime.seconds * 1000;

        setTimeLeft(totalMs);
    };

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => Math.max(prev - 10, 0));
            }, 10);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, timeLeft]);
    return (
        <Container className="my-5 d-flex justify-content-center">
            <Card
                style={{
                    backgroundColor: themeStyles.card,
                    color: themeStyles.color,
                    width: '100%',
                    maxWidth: '500px',
                    borderRadius: '1rem',
                    padding: '1rem'
                }}
                className="shadow"
            >
                <Card.Body>
                    <Card.Title className="text-center mb-4">⏬ Countdown Timer</Card.Title>

                    {/* Input Fields and Set Button */}
                    <Row className="mb-3 justify-content-center align-items-end">
                        <Col xs={4}>
                            <Form.Label className="small">Hours</Form.Label>
                            <Form.Control
                                type="number"
                                name="hours"
                                value={inputTime.hours}
                                onChange={handleInputChange}
                                disabled={isRunning}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Label className="small">Minutes</Form.Label>
                            <Form.Control
                                type="number"
                                name="minutes"
                                value={inputTime.minutes}
                                onChange={handleInputChange}
                                disabled={isRunning}
                            />
                        </Col>
                        <Col xs={4}>
                            <Form.Label className="small">Seconds</Form.Label>
                            <Form.Control
                                type="number"
                                name="seconds"
                                value={inputTime.seconds}
                                onChange={handleInputChange}
                                disabled={isRunning}
                            />
                        </Col>
                        <Col xs={12} className="mt-3">
                            <Button
                                variant="primary"
                                onClick={setCountdown}
                                className="w-100 rounded-pill"
                                disabled={isRunning}
                            >
                                Set
                            </Button>
                        </Col>
                    </Row>

                    {/* Time Display */}
                    <h1
                        className="display-4 text-center my-4"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                        {formatTime(timeLeft)}
                    </h1>

                    {/* Control Buttons */}
                    <Row className="text-center">
                        <Col>
                            <Button
                                variant={theme === 'light' ? 'dark' : 'light'}
                                onClick={isRunning ? pauseTimer : startTimer}
                                className="w-100 rounded-pill"
                                disabled={timeLeft === 0}
                            >
                                {isRunning ? 'Pause' : 'Start'}
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                variant={theme === 'light' ? 'secondary' : 'outline-light'}
                                onClick={stopTimer}
                                className="w-100 rounded-pill"
                                disabled={!isRunning}
                            >
                                Restart
                            </Button>
                        </Col>

                        <Col>
                            <Button
                                variant="danger"
                                onClick={resetTimer}
                                className="w-100 rounded-pill"
                            >
                                Reset
                            </Button>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Container>
    );
}
