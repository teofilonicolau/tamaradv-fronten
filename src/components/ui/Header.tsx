// src/components/ui/Header.tsx  ← VERSÃO FINAL OFICIAL (LOGO PEQUENA E HEADER )
import { NavLink } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}30;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.8rem;
  background: linear-gradient(to right, #1D4ED8, #6366F1);
 60%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const LogoIcon = styled.div`
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #1D4ED8, #6366F1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 1.4rem;
  box-shadow: 0 4px 15px rgba(29, 78, 216, 0.3);
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
        <LogoLink to="/">
          <LogoIcon>T</LogoIcon>
          TamarAI
        </LogoLink>

        <RightGroup>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            aria-label="Alternar tema claro/escuro"
          >
            {mode === 'dark' ? <Sun size={22} color="#fbbf24" /> : <Moon size={22} color="#6366f1" />}
          </button>
        </RightGroup>
      </Nav>
    </HeaderContainer>
  );
};