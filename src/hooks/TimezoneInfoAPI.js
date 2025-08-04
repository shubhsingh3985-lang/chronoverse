import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';

export default function TimezoneInfoAPI() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [timezone, setTimezone] = useState('Etc/UTC');
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!timezone) return;
    fetch(`https://worldtimeapi.org/api/timezone/${encodeURIComponent(timezone)}`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo(null));
  }, [timezone]);

  const timezones = info?.timezone ? null : []; // you can preload dropdown list via static array.

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card
        style={{
          backgroundColor: themeStyles.card,
          color: themeStyles.color,
          maxWidth: '600px',
          width: '100%',
          borderRadius: '1rem',
          padding: '1.5rem'
        }}
        className="shadow"
      >
        <Card.Body>
          <Card.Title className="text-center mb-4">🌐 Timezone Info (via API)</Card.Title>

          <Form.Group className="mb-4">
            <Form.Label>Select Timezone (IANA format)</Form.Label>
            <Form.Control
              as="input"
              list="tz-list"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              disabled={Boolean(info)}
              style={{
                backgroundColor: themeStyles.input,
                color: themeStyles.color,
              }}
            />
            <datalist id="tz-list">
              {/* load your timezone names list from moment.tz.names or static */}
              <option>Etc/UTC</option>
              <option>Asia/Kolkata</option>
              <option>America/New_York</option>
              {/* ... */}
            </datalist>
          </Form.Group>

          {info && (
            <>
              <Row className="mb-2">
                <Col xs={6}>🕒 DateTime:</Col>
                <Col xs={6} className="text-end fw-bold">
                  {info.datetime}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>⏱️ UTC Offset:</Col>
                <Col xs={6} className="text-end fw-bold">
                  {info.utc_offset}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6}>🔁 DST:</Col>
                <Col xs={6} className="text-end fw-bold">
                  {info.dst ? 'Yes' : 'No'}
                </Col>
              </Row>
              <Row>
                <Col xs={6}>📛 Abbreviation:</Col>
                <Col xs={6} className="text-end fw-bold">
                  {info.abbreviation}
                </Col>
              </Row>
            </>
          )}

          {!info && <p className="text-center text-muted">Loading…</p>}
        </Card.Body>
      </Card>
    </Container>
  );
}
