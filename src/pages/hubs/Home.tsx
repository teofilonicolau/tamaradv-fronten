// src/pages/hubs/Home.tsx ← VERSÃO FINAL 100% FUNCIONAL (LIGHT + DARK PERFEITOS)
import { NavLink } from 'react-router-dom';
import { FileText, Calculator, MessageCircle } from 'lucide-react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  background: linear-gradient(to right, #1D4ED8, #6366F1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 800px;
  margin-bottom: 5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
`;

const Card = styled(NavLink)`
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 4rem 2rem;
  border-radius: 2rem;
  text-decoration: none;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  border: 1px solid ${({ theme }) => theme.colors.primary}20;

  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 35px 70px -12px rgba(0, 0, 0, 0.3);
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
    margin: 2rem 0 1rem;
  }

  p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
`;

const Icon = styled.div`
  width: 90px;
  height: 90px;
  margin: 0 auto 1.5rem;
  color: #1D4ED8;
`;

export const Home = () => {
  return (
    <Container>
      <Title>TamarAdv</Title>
      <Subtitle>Petições, cálculos e consultas jurídicas com inteligência artificial</Subtitle>
      <Grid>
        <Card to="/previdenciario">
          <Icon><FileText size={90} /></Icon>
          <h2>Petições Jurídicas</h2>
          <p>Acesse agora →</p>
        </Card>
        <Card to="/calculadoras">
          <Icon><Calculator size={90} /></Icon>
          <h2>Calculadoras Jurídicas</h2>
          <p>Acesse agora →</p>
        </Card>
        <Card to="/consultas/ia">
          <Icon><MessageCircle size={90} /></Icon>
          <h2>Consultas & IA</h2>
          <p>Acesse agora →</p>
        </Card>
      </Grid>
    </Container>
  );
};