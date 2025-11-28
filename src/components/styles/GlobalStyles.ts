// src/components/styles/GlobalStyles.ts  ← VERSÃO FINAL QUE GANHA DO TAILWIND
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: ${({ theme }) => theme.colors.background} !important;
    color: ${({ theme }) => theme.colors.textPrimary} !important;
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  /* FORÇA O TEMA EM CIMA DE QUALQUER CLASSE TAILWIND */
  body, .bg-white, .bg-gray-50, .bg-gray-100 {
    background-color: ${({ theme }) => theme.colors.background} !important;
  }

 ￼}

  .text-gray-900, .text-black, h1, h2, h3, h4, h5, h6, p, span, div {
    color: ${({ theme }) => theme.colors.textPrimary} !important;
  }

  .text-gray-600, .text-gray-500 {
    color: ${({ theme }) => theme.colors.textSecondary} !important;
  }

  /* CARDS E CONTAINERS */
  .card, [class*="bg-white"], .shadow, .rounded-lg, .border {
    background-color: ${({ theme }) => theme.colors.cardBackground} !important;
    border-color: ${({ theme }) => theme.colors.primary}30 !important;
  }

  /* INPUTS E TEXTAREA */
  input, textarea, select {
    background-color: ${({ theme }) => theme.colors.cardBackground} !important;
    color: ${({ theme }) => theme.colors.textPrimary} !important;
    border: 1px solid ${({ theme }) => theme.colors.primary}40 !important;
  }

  input::placeholder, textarea::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary} !important;
  }
`;