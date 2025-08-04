import { ThemeContext } from '../ThemeContext';
import { lightTheme, darkTheme } from '../themes';
import React, { useContext } from 'react';

export default function Footer() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeStyles = theme === 'light' ? lightTheme : darkTheme;
  return (
    <footer className={`page-footer bg-gray-100 text-center py-6 text-sm text-gray-500 ${themeStyles.applied}`}>
      © {new Date().getFullYear()} Chronoverse — All rights reserved.
    </footer>
  )
}
