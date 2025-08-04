import React, { useEffect, useState, useContext } from 'react';
import '../../styles/FlipClock.css';
import { ThemeContext } from '../../ThemeContext';

export default function FlipClock() {
  const { theme } = useContext(ThemeContext);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getFormatted = () => {
    const hours = time.getHours();
    const h = hours % 12 || 12;
    const m = time.getMinutes();
    const s = time.getSeconds();

    return {
      hours: (hours < 10 ? '0' : '') + hours,
      minutes: (m < 10 ? '0' : '') + m,
      seconds: (s < 10 ? '0' : '') + s,
      ampm: hours >= 12 ? 'PM' : 'AM',
    };
  };

  const { hours, minutes, seconds, ampm } = getFormatted();

  return (
    <div className={`flip-clock-container ${theme}`}>
      <div className="flip-unit">
        <span className="flip-label">HOURS</span>
        <div className="flip-card">{hours}</div>
      </div>
      <div className="flip-unit">
        <span className="flip-label">MIN</span>
        <div className="flip-card">{minutes}</div>
      </div>
      <div className="flip-unit">
        <span className="flip-label">SEC</span>
        <div className="flip-card">{seconds}</div>
      </div>
      <div className="flip-unit ampm">
        <span>{ampm}</span>
      </div>
    </div>
  );
}
