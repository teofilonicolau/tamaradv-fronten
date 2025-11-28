// src/types/styled.d.ts  ← CRIE ESSE ARQUIVO EXATAMENTE ASSIM
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      cardBackground: string;
      textPrimary: string;
      textSecondary: string;
      primary: string;
    };
  }
}