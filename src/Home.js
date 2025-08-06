// src/Home.js
import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';
import ClockPage from './components/ClockPage';
import { Helmet } from 'react-helmet';
import { initAnalytics, logAnalyticsEvent } from './analytics/analytics';

<Helmet>
  <title>Home | Chronoverse</title>
  <meta name="description" content="Chronoverse is your all-in-one time toolkit — Pomodoro timer, alarms, clocks, timezone converter, calendar tools, and more. Built for productivity." />
</Helmet>

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className="py-4 px-3">
      <Container className="d-flex flex-column align-items-center">


        {/* Clocks below the welcome */}
        <div className="w-100" style={{ maxWidth: '700px' }}>
          <ClockPage />
        </div>
      </Container>
    </div>
  );
}
