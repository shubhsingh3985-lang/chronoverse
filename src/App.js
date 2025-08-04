// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';
import AppLayout from './AppLayout';
import moment from 'moment';

function App() {
  moment.locale('en');
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const appliedTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ backgroundColor: appliedTheme.background, minHeight: '100vh' }}>
        <Router>
          <AppLayout />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
