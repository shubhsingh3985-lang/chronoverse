// src/components/clock/AnalogClock.js
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { lightTheme, darkTheme } from '../../themes';

export default function AnalogClock({givenTime}) {
  const [time, setTime] = useState(new Date(givenTime) ?? new Date());
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const radius = 80;
  const center = 100;
  const handWidth = 3;

  const hour = time.getHours() % 12;
  const minute = time.getMinutes();
  const second = time.getSeconds();

  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = second * 6;

  const getCoords = (angle, length) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: center + length * Math.sin(rad),
      y: center - length * Math.cos(rad)
    };
  };

  const hourHand = getCoords(hourAngle, 40);
  const minuteHand = getCoords(minuteAngle, 55);
  const secondHand = getCoords(secondAngle, 65);

  return (
    <div className="d-flex justify-content-center">
      <svg width="200" height="200">
        {/* Clock face */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke={themeStyles.textColour} strokeWidth="6" />

        {/* Hour hand */}
        <line
          x1={center}
          y1={center}
          x2={hourHand.x}
          y2={hourHand.y}
          stroke="#334155"
          strokeWidth={handWidth + 1}
        />

        {/* Minute hand */}
        <line
          x1={center}
          y1={center}
          x2={minuteHand.x}
          y2={minuteHand.y}
          stroke="#334155"
          strokeWidth={handWidth}
        />

        {/* Second hand */}
        <line
          x1={center}
          y1={center}
          x2={secondHand.x}
          y2={secondHand.y}
          stroke="#ef4444"
          strokeWidth={2}
        />

        {/* Center dot */}
        <circle cx={center} cy={center} r={4} fill="#334155" />
      </svg>
    </div>
  );
}
