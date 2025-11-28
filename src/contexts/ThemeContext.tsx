// src/contexts/ThemeContext.tsx  ← SÓ COMPONENTE (ESLint feliz pra sempre!)
import React, { useState, useEffect, type ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../components/styles/themeConfig';
import { ThemeContext } from './theme-context';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('tamaradv-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('tamaradv-theme', mode);
  }, [mode]);

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <SCThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};