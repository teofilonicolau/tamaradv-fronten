// arquivo: src/styles/GlobalStyles.ts

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset Básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.typography.fontFamily};
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #root {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  /* Estilos para títulos */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    font-weight: 600;
  }
  
  h1 { font-size: ${({ theme }) => theme.typography.h1}; }
  h2 { font-size: ${({ theme }) => theme.typography.h2}; }
  h3 { font-size: ${({ theme }) => theme.typography.h3}; }

  /* Links e botões genéricos */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    cursor: pointer;
  }
`;