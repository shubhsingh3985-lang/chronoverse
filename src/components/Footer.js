import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import React, { useContext } from 'react';
import { FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa'; // ← Import icons

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <footer
      className={`page-footer bg-gray-100 text-center py-4 text-sm text-gray-500 ${themeStyles.applied}`}
    >
      <a href="/about" className="mx-2 text-decoration-none" style={{color:themeStyles.color}}>About</a> 
      {/* <a href="/feedback" className="mx-2 text-decoration-none" style={{color:themeStyles.color}}>Feedback</a>  */}
      <div className="mb-2">

        <a
          href="https://www.youtube.com/@TickTockByChronoverse"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-decoration-none text-danger"
          title="YouTube"
        >
          <FaYoutube size={20} />
        </a>
        <a
          href="https://facebook.com/TickTockByChronoverse"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-decoration-none text-primary"
          title="Facebook"
        >
          <FaFacebook size={20} />
        </a>
        <a
          href="https://x.com/ChronoverseTick"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-2 text-decoration-none text-info"
          title="X.com"
        >
          𝕏
        </a>
      </div>

      <div>© {new Date().getFullYear()} Chronoverse — All rights reserved.</div>
    </footer>
  );
}
