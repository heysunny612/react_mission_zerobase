import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(false);
  const toggleMode = () => {
    setMode(!mode);
    updateMode(!mode);
  };

  useEffect(() => {
    const isDark = localStorage.theme === 'dark';
    setMode(isDark);
    updateMode(isDark);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

const updateMode = (mode) => {
  if (mode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};
