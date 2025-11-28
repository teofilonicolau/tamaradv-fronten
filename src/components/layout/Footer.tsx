// src/components/layout/Footer.tsx  ← VERSÃO FINAL CENTRALIZADA E BONITA
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.primary}20;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const FooterBold = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        Created and developed by <FooterBold>TamarAI</FooterBold>
        <br />
        © 2025 Todos os direitos reservados
      </FooterText>
    </FooterContainer>
  );
};