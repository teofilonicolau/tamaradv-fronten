// src/contexts/theme-context.ts  ← SÓ O CONTEXTO (ESLint 100% feliz!)
import { createContext } from 'react';

type ThemeMode = 'light' | 'dark';

export interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);