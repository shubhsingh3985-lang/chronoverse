// src/components/TimezoneInfoPage.js
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment-timezone';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Time Zone Info – Chronoverse</title>
  <meta name="description" content="View detailed information about time zones across the world. Includes UTC offsets, daylight saving, and current time." />
</Helmet>

const TimezoneInfoPage = () => {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [selectedTimezone, setSelectedTimezone] = useState(moment.tz.guess());
  const [currentTime, setCurrentTime] = useState(moment().tz(selectedTimezone));
  const allTimezones = moment.tz.names();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().tz(selectedTimezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedTimezone]);

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card
        style={{
          backgroundColor: themeStyles.card,
          color: themeStyles.color,
          width: '100%',
          maxWidth: '600px',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}
        className="shadow"
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">🌐 Timezone Info</Card.Title>

          <Form.Group className="mb-4">
            <Form.Label>Select a Timezone</Form.Label>
            <Form.Select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              style={{
                backgroundColor: themeStyles.background,
                color: themeStyles.color,
                border: '1px solid #ccc'
              }}
            >
              {allTimezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Row className="mb-2">
            <Col xs={6}>🕒 Current Time:</Col>
            <Col xs={6} className="text-end fw-bold">
              {currentTime.format('HH:mm:ss')}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6}>⏱️ UTC Offset:</Col>
            <Col xs={6} className="text-end fw-bold">
              {currentTime.format('Z')}
            </Col>
          </Row>

          <Row className="mb-2">
            <Col xs={6}>🔁 DST Active:</Col>
            <Col xs={6} className="text-end fw-bold">
              {currentTime.isDST() ? 'Yes' : 'No'}
            </Col>
          </Row>

          <Row>
            <Col xs={6}>✉️ Abbreviation:</Col>
            <Col xs={6} className="text-end fw-bold">
              {currentTime.format('z')}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TimezoneInfoPage;
