import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DigitalClock from './clock/DigitalClock';
import AnalogClock from './clock/AnalogClock';
import FlipClock from './clock/FlipClock';
import '../styles/ClockPage.css'

export default function ClockPage() {
  const [view, setView] = useState('digital');

  const renderClock = () => {
    switch (view) {
      case 'digital':
        return <DigitalClock />;
      case 'analog':
        return <AnalogClock />;
      case 'flip':
        return <FlipClock />;
      default:
        return null;
    }
  };

  return (
    <div className="text-center">
      <h2 className="fw-bold mb-4">
        Welcome to <span className="text-primary">Chronoverse</span>

      </h2>
      <p className="lead mb-5">
        Your one-stop platform for everything about time — clocks, countdowns, timezones, and more.
      </p>


      <div className="clock-container mx-auto p-4 rounded-4 shadow-sm" style={{ minHeight: '250px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderClock()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap" >
        {/* {['digital', 'analog', 'flip'].map((type) => ( */}
        {['digital', 'analog'].map((type) => (
          <button
            key={type}
            onClick={() => setView(type)}
            className={`clock-toggle-button ${view === type ? 'active' : ''}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Clock
          </button>
        ))}
      </div>
    </div>
  );
}
