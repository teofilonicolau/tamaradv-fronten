// src/components/layout/LayoutWrapper.tsx
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.4s ease;
`;

const Content = styled.main`
  flex: 1;
  background: transparent !important;
`;

export const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MainContainer>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </MainContainer>
  );
};