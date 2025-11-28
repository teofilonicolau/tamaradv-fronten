// src/components/styles/themeConfig.ts
import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#1D4ED8',
    background: '#F8FAFC',
    cardBackground: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#60A5FA',
    background: '#0F172A',
    cardBackground: '#1E293B',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
  },
};