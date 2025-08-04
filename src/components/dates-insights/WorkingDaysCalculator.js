// src/components/date-insights/WorkingDaysCalculator.js
import React, { useState, useContext } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const getWorkingDays = (start, end) => {
  let count = 0;
  const current = new Date(start);
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
};

export default function WorkingDaysCalculator({eventKey}) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const startDate = start ? new Date(start) : null;
  const endDate = end ? new Date(end) : null;

  const isStartWorking = startDate ? !isWeekend(startDate) : null;
  const isEndWorking = endDate ? !isWeekend(endDate) : null;

  const validRange = startDate && endDate && startDate <= endDate;
  const workingDays = validRange ? getWorkingDays(startDate, endDate) : null;

  return (
    <Accordion.Item eventKey={eventKey} className="mb-3" style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}>
      <Accordion.Header>📆 Working Days Calculator</Accordion.Header>
      <Accordion.Body >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              style={{ backgroundColor: themeStyles.background, color: themeStyles.color }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              style={{ backgroundColor: themeStyles.background, color: themeStyles.color }}
            />
          </Form.Group>
        </Form>

        {startDate && (
          <p>
            Start Date (<strong>{start}</strong>) is{' '}
            <strong>{isStartWorking ? 'a Working Day' : 'a Weekend'}</strong>.
          </p>
        )}
        {endDate && (
          <p>
            End Date (<strong>{end}</strong>) is{' '}
            <strong>{isEndWorking ? 'a Working Day' : 'a Weekend'}</strong>.
          </p>
        )}

        {validRange && (
          <p>
            Total <strong>{workingDays}</strong> working day(s) between the selected dates.
          </p>
        )}

        {!validRange && startDate && endDate && (
          <p className="text-danger">⚠️ End date should be after start date.</p>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
