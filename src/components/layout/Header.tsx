// src/components/layout/Header.tsx  ← VERSÃO FINAL LIMPA E PERFEITA
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}20;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  background: linear-gradient(to right, #1D4ED8, #6366F1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -1px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Header = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Nav>
        <Logo>TamarAdv</Logo>
        <RightGroup>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Alternar tema"
          >
            {mode === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </RightGroup>
      </Nav>
    </HeaderContainer>
  );
};