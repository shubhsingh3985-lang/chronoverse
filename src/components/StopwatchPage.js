// src/components/StopwatchPage.js
import React, { useState, useRef, useContext } from 'react';
import { Button, Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';

export default function StopwatchPage() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // time in ms
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hours = Math.floor(totalSeconds / 3600);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  const startStopwatch = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      setIsRunning(true);
    }
  };

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    stopStopwatch();
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps((prev) => [time, ...prev]);
    }
  };

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
          <Card.Title className="text-center">⏱️ Stopwatch</Card.Title>

          <h1 className="display-4 text-center my-4" style={{fontWeight:'400'}}>{formatTime(time)}</h1>

          <Row className="text-center mb-3">
            <Col>
              <Button
                variant={theme === 'light' ? 'dark' : 'light'}
                onClick={isRunning ? stopStopwatch : startStopwatch}
                className="w-100 rounded-pill"
              >
                {isRunning ? 'Stop' : 'Start'}
              </Button>
            </Col>
            <Col>
              <Button
                variant={theme === 'light' ? 'secondary' : 'outline-light'}
                onClick={recordLap}
                className="w-100 rounded-pill"
                disabled={!isRunning}
              >
                Lap
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={resetStopwatch}
                className="w-100 rounded-pill"
              >
                Reset
              </Button>
            </Col>
          </Row>

          {laps.length > 0 && (
            <>
              <h5>Laps</h5>
              <ListGroup variant={theme === 'dark' ? 'dark' : undefined}>
                {laps.map((lap, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{
                      backgroundColor: themeStyles.background,
                      color: themeStyles.color,
                      border: 'none'
                    }}
                  >
                    Lap {laps.length - index}: {formatTime(lap)}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
