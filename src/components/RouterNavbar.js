import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import '../styles/RouterNavbar.css'
import { Alert } from 'react-bootstrap'; // Make sure this is imported

const menuGroups = [
  {
    title: 'Time Tools',
    items: [
      { name: 'Clock', href: '/', icon: '🕰️' },
      { name: 'Stopwatch', href: '/stopwatch', icon: '⏱️' },
      { name: 'Countdown Timer', href: '/countdown-timer', icon: '⏬' }
    ]
  },
  {
    title: 'Time Zones',
    items: [
      { name: 'Timezone Info', href: '/timezone', icon: '🌐' },
      { name: 'Timezone Converter', href: '/converter', icon: '🔄' },
      { name: 'World Clocks', href: '/worldclocks', icon: '🗺️' }
    ]
  },
  {
    title: 'Productivity',
    items: [
      { name: 'Alarm Manager', href: '/alarm', icon: '🔔' },
      { name: 'Pomodoro Timer', href: '/pomodoro', icon: '🎯' }
    ]
  },
  {
    title: 'Calendars',
    items: [
      { name: 'Date Calculator', href: '/datecalculator', icon: '📅' },
      { name: 'Date Insights', href: '/date-insights', icon: '📅' },
      { name: 'Calendar', href: '/calendar', icon: '🗓️' },
      { name: 'Time in Words', href: '/timeinwords', icon: '🗣️' }
    ]
  }
];

export default function RouterNavbar({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <>
    <Navbar
      bg="transparent"
      variant={theme}
      expand="lg"
      className="glass-navbar shadow-lg py-3 mx-3 my-2 rounded"
    >
      <Container fluid className="align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/" className="nav-brand d-flex align-items-center">
          <img
            src="/favicon.png"
            alt="Chronoverse Logo"
            width="32"
            height="38"
            className=""
          />
          Chronoverse
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
          <Nav className="align-items-center gap-4 nav-center">
            {menuGroups.map(group => (
              <NavDropdown
                key={group.title}
                title={group.title}
                id={`nav-${group.title}`}
                menuVariant={theme}
                className="nav-dropdown"
              >
                {group.items.map(({ name, href, icon }) => (
                  <NavDropdown.Item
                    as={Link}
                    to={href}
                    key={href}
                    className="nav-item-custom"
                  >
                    <span className="me-2">{icon}</span>
                    {name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ))}
          </Nav>
        </Navbar.Collapse>

        <Button variant={themeStyles.btnVariant} onClick={toggleTheme} className="toggle-btn">
          {theme === 'light' ? '🌙 Dark Mode' : '🌞 Light Mode'}
        </Button>
      </Container>
        
    </Navbar>
    <div className="mx-3 mb-3">
        <Alert variant="info" className="text-center m-0 py-2 small shadow-sm rounded">
          🚧 <strong>Chronoverse is just getting started!</strong> Some features may not work perfectly yet.
          We're actively improving things and adding new tools every week. 🙏 Thanks for your patience!
         <br/> <a href="/about" ><b>About Chronoverse.</b></a>
        </Alert>
      </div>
    </>
  );
}