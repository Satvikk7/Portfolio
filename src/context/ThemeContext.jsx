import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  SYSTEM: 'system',
  VISUAL: 'visual',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(THEMES.SYSTEM);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });

  const toggleTheme = (e) => {
    if (isTransitioning) return;
    
    // Capture click coordinates for the explosion origin
    if (e && e.clientX !== undefined) {
      setClickCoords({ x: e.clientX, y: e.clientY });
    } else {
      // Fallback to center if no event (e.g. mobile or keyboard)
      setClickCoords({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    setIsTransitioning(true);
    
    // Delayed theme swap to happen during the "impact" of the explosion
    setTimeout(() => {
      setTheme((prev) => (prev === THEMES.SYSTEM ? THEMES.VISUAL : THEMES.SYSTEM));
    }, 400); // Sync with explosion impact

    // Reset transition state after animation finishes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, clickCoords }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
