import React, { useEffect, useState, createContext, useContext } from 'react';

// Context yaratish
export const ThemeContext = createContext();

// Provider komponenti
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage dan darkMode-ni olish
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false;
  });

  useEffect(() => {
    // darkMode o'zgarishi bo'lganda localStorage ga saqlash
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Komponentlarga murojaat
export const useTheme = () => useContext(ThemeContext);
