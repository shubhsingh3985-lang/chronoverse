// src/AppLayout.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';
import RouterNavbar from './components/RouterNavbar';
import Footer from './components/Footer';

// Pages
import Home from './Home';
import StopwatchPage from './components/StopwatchPage';
import CountdownTimerPage from './components/CountdownTimerPage';
import TimezoneInfoPage from './components/TimezoneInfoPage.js'
import TimezoneConverter  from './components/TimezoneConverter'
import WorldClocksPage from './components/WorldClocksPage';
import AlarmManager from './components/AlarmManager'
import PomodoroTimer from './components/PomodoroTimer'
import DateCalculator from './components/DateCalculator'
import DateInsights from './components/DateInsights'
import CalendarView from './components/CalendarView'
import TimeInWords from './components/TimeInWords'

export default function AppLayout() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div className="flex flex-col min-h-screen">
      <div
        style={{
          background: themeStyles.gradientBackground,
          color: themeStyles.color,
          minHeight: '100vh',
        }}
      >
        <RouterNavbar />
        <div className="page-wrapper px-3 py-4">
          <Routes>
            {/* Time Tools */}
            <Route path="/" element={<Home />} />
            <Route path="/stopwatch" element={<StopwatchPage />} />
            <Route path="/countdown-timer" element={<CountdownTimerPage />} />

            {/* Time Zones */}
            <Route path="/timezone" element={<TimezoneInfoPage />} />
            <Route path="/converter" element={<TimezoneConverter />} />
            <Route path="/worldclocks" element={<WorldClocksPage />} />

            {/* Productivity */}
            <Route path="/alarm" element={<AlarmManager />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />

            {/* Calendars */}
            <Route path="/datecalculator" element={<DateCalculator />} />
            <Route path="/date-insights" element={<DateInsights />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/timeinwords" element={<TimeInWords />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}
