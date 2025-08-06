// src/components/AlarmManager.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Button, Form, Card, Container, ListGroup } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import alarmSound from '../assets/alarm.mp3'; // Add your custom sound here
import { Helmet } from 'react-helmet';

<Helmet>
    <title>Alarm Manager | Chronoverse</title>
    <meta name="description" content="Set smart alarms with sound, repeat settings, and theme support. Never miss an important task again." />
</Helmet>

export default function AlarmManager() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;

    const [alarms, setAlarms] = useState(() => {
        const saved = localStorage.getItem('alarms');
        return saved ? JSON.parse(saved) : [];
    });
    const [time, setTime] = useState('');
    const [label, setLabel] = useState('');
    const [repeat, setRepeat] = useState('none');
    const timeInputRef = useRef();
    const audioRef = useRef(new Audio(alarmSound));

    useEffect(() => {
        const interval = setInterval(checkAlarms, 1000);
        return () => clearInterval(interval);
    }, [alarms]);

    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }, [alarms]);

    const checkAlarms = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const currentDay = now.getDay();

        alarms.forEach((alarm) => {
            if (
                alarm.enabled &&
                alarm.time === currentTime &&
                (!alarm.lastTriggered || alarm.lastTriggered !== currentTime) &&
                (
                    alarm.repeat === 'daily' ||
                    (alarm.repeat === 'weekly' && alarm.createdDay === currentDay) ||
                    alarm.repeat === 'none'
                )
            ) {
                // Play alarm sound
                audioRef.current.play();

                // Update trigger time
                setAlarms((prev) =>
                    prev.map((a) =>
                        a.id === alarm.id
                            ? { ...a, lastTriggered: currentTime }
                            : a
                    )
                );
            }
        });
    };

    const addAlarm = () => {
        if (!time) return;
        const newAlarm = {
            id: Date.now(),
            time,
            label,
            repeat,
            createdDay: new Date().getDay(), // Save current weekday
            enabled: true,
            lastTriggered: null
        };
        setAlarms([...alarms, newAlarm]);
        setTime('');
        setLabel('');
        setRepeat('none');
    };


    const toggleAlarm = (id) => {
        setAlarms((prev) =>
            prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
        );
    };

    const deleteAlarm = (id) => {
        setAlarms((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <Container className="my-5">
            <Card
                style={{
                    backgroundColor: themeStyles.card,
                    color: themeStyles.color,
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '1rem'
                }}
            >
                <Card.Title className="text-center mb-4">🔔 Alarm Manager</Card.Title>

                <Form className="mb-4">
                    <Form.Group>
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Label</Form.Label>
                        <Form.Control
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="e.g. Morning Alarm"
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Repeat</Form.Label>
                        <Form.Select
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                        >
                            <option value="none">None</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                        </Form.Select>
                    </Form.Group>

                    <Button className="mt-3 w-100" onClick={addAlarm}>
                        Add Alarm
                    </Button>
                </Form>

                <ListGroup>
                    {alarms.map((alarm) => (
                        <ListGroup.Item
                            key={alarm.id}
                            style={{
                                backgroundColor: themeStyles.background,
                                color: themeStyles.color
                            }}
                            className="d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong>{alarm.time}</strong> - {alarm.label || 'No label'} (
                                {alarm.repeat})
                            </div>
                            <div>
                                <Form.Check
                                    type="switch"
                                    checked={alarm.enabled}
                                    onChange={() => toggleAlarm(alarm.id)}
                                    className="me-2"
                                />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteAlarm(alarm.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </Container>
    );
}
