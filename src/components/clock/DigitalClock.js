// src/components/clock/DigitalClock.js
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';
import { Button } from 'react-bootstrap';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (!is24Hour) {
      ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${!is24Hour ? ampm : ''}`;
  };

  return (
    <div>
      <div className="display-3 fw-bold" style={{ letterSpacing: '2px', color: themeStyles.textColour}}>
        {formatTime()}
      </div>
      <div style={{paddingTop: '40px'}}>
        <Button
          onClick={() => setIs24Hour(!is24Hour)}
        >Toggle {is24Hour ? '12h' : '24h'}</Button>
      </div>
    </div>
  );
}
