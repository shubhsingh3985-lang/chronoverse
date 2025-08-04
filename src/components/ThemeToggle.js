// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  localStorage.setItem('chronoverse-theme', theme)
  return (
    <Button variant={theme === 'light' ? 'primary' : 'info'} onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}

