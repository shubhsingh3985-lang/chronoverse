// Example: src/components/DateInsights/DayOfWeek.js
import React, { useState, useContext } from 'react';
import { Accordion, Form, Card } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

export default function DayOfWeek() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [date, setDate] = useState('');
  const [day, setDay] = useState(''); 

  const handleChange = (e) => {
    const selected = e.target.value;
    setDate(selected);
    const dayName = new Date(selected).toLocaleDateString('en-US', { weekday: 'long' });
    setDay(dayName);
  };

  return (
    <Accordion.Item eventKey="0">
      <Accordion.Header>📅 Day of the Week</Accordion.Header>
      <Accordion.Body style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}>
        <Form>
          <Form.Group>
            <Form.Label>Select a Date</Form.Label>
            <Form.Control type="date" value={date} onChange={handleChange} />
          </Form.Group>
        </Form>
        {day && <Card.Text className="mt-3">Day: <strong>{day}</strong></Card.Text>}
      </Accordion.Body>
    </Accordion.Item>
  );
}
