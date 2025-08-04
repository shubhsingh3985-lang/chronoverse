// src/components/date-insights/LeapYearChecker.js
import React, { useState, useContext } from 'react';
import { Accordion, Card, Form, Container } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

export default function LeapYearChecker({ eventKey }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);

  const checkLeapYear = (y) => {
    const yr = parseInt(y, 10);
    if (isNaN(yr)) return setResult(null);
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || (yr % 400 === 0);
    setResult(isLeap ? `${yr} is a Leap Year 🟢` : `${yr} is NOT a Leap Year 🔴`);
  };

  return (
    <Accordion.Item eventKey={eventKey} className="mb-3">
      <Accordion.Header style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}>
        📆 Leap Year Checker
      </Accordion.Header>
      <Accordion.Body style={{ backgroundColor: themeStyles.background, color: themeStyles.color }}>
        <Container>
          <Form.Group className="mb-3" controlId="yearInput">
            <Form.Label>Enter Year</Form.Label>
            <Form.Control
              type="number"
              value={year}
              placeholder="e.g. 2024"
              onChange={(e) => {
                setYear(e.target.value);
                checkLeapYear(e.target.value);
              }}
              min="0"
            />
          </Form.Group>
          {result && <p className="mt-3 fw-bold">{result}</p>}
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}
