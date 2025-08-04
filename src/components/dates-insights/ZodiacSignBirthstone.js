// src/components/date-insights/ZodiacSignBirthstone.js
import React, { useState, useContext } from 'react';
import { Accordion, Card, Form, Container } from 'react-bootstrap';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

const zodiacSigns = [
  { name: 'Capricorn', start: '01-01', end: '01-19', stone: 'Garnet' },
  { name: 'Aquarius', start: '01-20', end: '02-18', stone: 'Amethyst' },
  { name: 'Pisces', start: '02-19', end: '03-20', stone: 'Aquamarine' },
  { name: 'Aries', start: '03-21', end: '04-19', stone: 'Diamond' },
  { name: 'Taurus', start: '04-20', end: '05-20', stone: 'Emerald' },
  { name: 'Gemini', start: '05-21', end: '06-20', stone: 'Pearl' },
  { name: 'Cancer', start: '06-21', end: '07-22', stone: 'Ruby' },
  { name: 'Leo', start: '07-23', end: '08-22', stone: 'Peridot' },
  { name: 'Virgo', start: '08-23', end: '09-22', stone: 'Sapphire' },
  { name: 'Libra', start: '09-23', end: '10-22', stone: 'Opal' },
  { name: 'Scorpio', start: '10-23', end: '11-21', stone: 'Topaz' },
  { name: 'Sagittarius', start: '11-22', end: '12-21', stone: 'Turquoise' },
  { name: 'Capricorn', start: '12-22', end: '12-31', stone: 'Garnet' },
];

export default function ZodiacSignBirthstone({ eventKey }) {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  const [birthDate, setBirthDate] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [birthstone, setBirthstone] = useState('');

  const getZodiacInfo = (dateStr) => {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const mmdd = `${month}-${day}`;

    const sign = zodiacSigns.find(z =>
      mmdd >= z.start && mmdd <= z.end
    );

    if (sign) {
      setZodiac(sign.name);
      setBirthstone(sign.stone);
    } else {
      setZodiac('Unknown');
      setBirthstone('Unknown');
    }
  };

  return (
    <Accordion.Item eventKey={eventKey} className="mb-3">
      <Accordion.Header style={{ backgroundColor: themeStyles.card, color: themeStyles.color }}>
        ✨ Zodiac Sign & Birthstone
      </Accordion.Header>
      <Accordion.Body style={{ backgroundColor: themeStyles.background, color: themeStyles.color }}>
        <Container>
          <Form.Group>
            <Form.Label>Select Your Birthdate</Form.Label>
            <Form.Control
              type="date"
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                getZodiacInfo(e.target.value);
              }}
            />
          </Form.Group>

          {zodiac && (
            <div className="mt-3">
              <p>🔮 <strong>Zodiac Sign:</strong> {zodiac}</p>
              <p>💎 <strong>Birthstone:</strong> {birthstone}</p>
            </div>
          )}
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}
