// src/components/TimezoneConverter.js
import React, { useState, useContext } from 'react';
import moment from 'moment-timezone';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

const TimezoneConverter = () => {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

const [inputTime, setInputTime] = useState(
  moment().format('YYYY-MM-DDTHH:mm')
);
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState('');

  const handleConvert = () => {
    if (!inputTime || !fromZone || !toZone) return;

    const source = moment.tz(inputTime, fromZone);
    const target = source.clone().tz(toZone);
    setConvertedTime(target.format('YYYY-MM-DD HH:mm:ss z'));
  };

  const allTimezones = moment.tz.names();

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card
        style={{
          backgroundColor: themeStyles.card,
          color: themeStyles.color,
          width: '100%',
          maxWidth: '600px',
          padding: '1rem',
          borderRadius: '1rem',
        }}
        className="shadow"
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">🌐 Timezone Converter</Card.Title>
          
          <Form.Group className="mb-3">
            <Form.Label>Input Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label>From Timezone</Form.Label>
              <Form.Select value={fromZone} onChange={(e) => setFromZone(e.target.value)}>
                {allTimezones.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>To Timezone</Form.Label>
              <Form.Select value={toZone} onChange={(e) => setToZone(e.target.value)}>
                {allTimezones.map((zone) => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <Button
            variant={theme === 'light' ? 'dark' : 'light'}
            className="w-100 rounded-pill mb-3"
            onClick={handleConvert}
          >
            Convert
          </Button>

          {convertedTime && (
            <div className="text-center mt-3">
              <h5>Converted Time:</h5>
              <p style={{ fontSize: '1.25rem' }}>{convertedTime}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TimezoneConverter;
