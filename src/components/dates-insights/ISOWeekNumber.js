// src/components/insights/ISOWeekNumber.js
import React, { useState, useContext } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

function getISOWeekNumber(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const diff = target - firstThursday;
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

export default function ISOWeekNumber({ eventKey }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [date, setDate] = useState('');
  const [week, setWeek] = useState(null);

  const handleChange = (e) => {
    const inputDate = new Date(e.target.value);
    setDate(e.target.value);
    if (!isNaN(inputDate)) {
      setWeek(getISOWeekNumber(inputDate));
    }
  };

  return (
    <Accordion.Item eventKey={eventKey}  className="mb-3">
        <Accordion.Header className={`theme-accordion-header .${theme}`}>🗓️ ISO Week number</Accordion.Header>
      <Accordion.Body style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}>
        <Form.Group>
          <Form.Label>Select Date</Form.Label>
          <Form.Control type="date" value={date} onChange={handleChange} />
        </Form.Group>
        {week !== null && (
          <p className="mt-3">ISO Week Number: <strong>{week}</strong></p>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
