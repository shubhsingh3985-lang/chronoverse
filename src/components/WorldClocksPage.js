import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment-timezone';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';

const defaultCities = [
    { name: 'New York', zone: 'America/New_York' },
    { name: 'London', zone: 'Europe/London' },
    { name: 'Tokyo', zone: 'Asia/Tokyo' },
];

const allTimezones = moment.tz.names();

export default function WorldClocksPage() {
    const { theme } = useContext(ThemeContext);
    const themeStyles = theme === 'light' ? lightTheme : darkTheme;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    var userTimeZoneData = { name: userTimeZone.split('/')[1], zone: userTimeZone };
    if (!defaultCities.some(city => city.zone === userTimeZone)) {
        defaultCities.unshift(userTimeZoneData);
    }
    const [cities, setCities] = useState(() => {
        debugger

        const stored = localStorage.getItem('userTimezones');
        return stored ? JSON.parse(stored) : defaultCities;
    });
    const [currentTimes, setCurrentTimes] = useState({});
    const [selectedZone, setSelectedZone] = useState('');
    const [showAnalog, setShowAnalog] = useState(false);

    // Load cities from localStorage or use defaults
    useEffect(() => {
        const stored = localStorage.getItem('userTimezones');
        setCities(stored ? JSON.parse(stored) : defaultCities);
    }, []);

    useEffect(() => {
        const updateTimes = () => {
            const now = {};
            cities.forEach(({ zone }) => {
                now[zone] = moment().tz(zone);
            });
            setCurrentTimes(now);
        };

        updateTimes();
        const interval = setInterval(updateTimes, 1000);
        return () => clearInterval(interval);
    }, [cities]);

    useEffect(() => {
        localStorage.setItem('userTimezones', JSON.stringify(cities));
    }, [cities]);

    const handleAddTimezone = () => {
        if (selectedZone && !cities.find((c) => c.zone === selectedZone)) {
            setCities((prev) => [...prev, { name: selectedZone.split('/').pop().replace('_', ' '), zone: selectedZone }]);
            setSelectedZone('');
        }
    };

    const renderAnalogClock = (zone) => {
        const now = currentTimes[zone];
        if (!now) return null;

        const hour = now.hour() % 12;
        const minute = now.minute();
        const second = now.second();

        const hourDeg = (hour + minute / 60) * 30;
        const minuteDeg = (minute + second / 60) * 6;
        const secondDeg = second * 6;

        return (
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="gray" strokeWidth="2" fill="none" />
                <line x1="50" y1="50" x2={50 + 20 * Math.sin((hourDeg * Math.PI) / 180)} y2={50 - 20 * Math.cos((hourDeg * Math.PI) / 180)} stroke={themeStyles.color} strokeWidth="3" />
                <line x1="50" y1="50" x2={50 + 30 * Math.sin((minuteDeg * Math.PI) / 180)} y2={50 - 30 * Math.cos((minuteDeg * Math.PI) / 180)} stroke={themeStyles.color} strokeWidth="2" />
                <line x1="50" y1="50" x2={50 + 35 * Math.sin((secondDeg * Math.PI) / 180)} y2={50 - 35 * Math.cos((secondDeg * Math.PI) / 180)} stroke="red" strokeWidth="1" />
                <circle cx="50" cy="50" r="2" fill="black" />
            </svg>
        );
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">🕒 World Clocks</h2>

            <Row className="align-items-center mb-4">
                <Col md={8}>
                    <Form.Select
                        value={selectedZone}
                        onChange={(e) => setSelectedZone(e.target.value)}
                        style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}
                    >
                        <option value="">Select a timezone to add</option>
                        {allTimezones.map((tz) => (
                            <option key={tz} value={tz}>
                                {tz}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={2}>
                    <Button className="w-100" variant="primary" onClick={handleAddTimezone}>
                        Add
                    </Button>
                </Col>
                <Col md={2}>
                    <Button variant={theme === 'light' ? 'outline-dark' : 'outline-light'} onClick={() => setShowAnalog(!showAnalog)} className="w-100">
                        {showAnalog ? 'Digital' : 'Analog'}
                    </Button>
                </Col>
            </Row>

            <Row className="g-4">
                {cities.map(({ name, zone }) => (
                    <Col key={zone} xs={12} sm={6} md={4}>
                        <Card
                            className="text-center shadow"
                            style={{
                                backgroundColor: themeStyles.card,
                                color: themeStyles.color,
                                borderRadius: '1rem',
                            }}
                        >
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                {showAnalog ? (
                                    renderAnalogClock(zone)
                                ) : (
                                    <Card.Text style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
                                        {currentTimes[zone]?.format('HH:mm:ss') || '--:--:--'}
                                    </Card.Text>
                                )}
                                <small>{zone}</small>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
