// arquivo: src/components/styles/Theme.tsx
import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { theme } from './themeConfig';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SCThemeProvider theme={theme}>{children}</SCThemeProvider>;
};

// Extensão de tipos
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      cardBackground: string;
      textPrimary: string;
      textSecondary: string;
      success: string;
      danger: string;
    };
    typography: {
      fontFamily: string;
      h1: string;
      h2: string;
      h3: string;
      body: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
  }
}
