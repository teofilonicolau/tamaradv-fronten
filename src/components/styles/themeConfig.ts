// arquivo: src/components/styles/themeConfig.ts
import type { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#0056b3',
    secondary: '#007bff',
    background: '#f8f8f8',
    cardBackground: '#ffffff',
    textPrimary: '#333333',
    textSecondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    body: '1rem',
  },
  spacing: {
    small: '8px',
    medium: '16px',
    large: '24px',
    extraLarge: '40px',
  },
};
