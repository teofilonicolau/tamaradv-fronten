// arquivo: src/components/ui/Footer.tsx
import React from 'react';
import styled from 'styled-components';
import logoTamarAI from '../../assets/logoTamarAI2.jpg'; // novo logo

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: white;
  padding: ${({ theme }) => theme.spacing.large} ${({ theme }) => theme.spacing.extraLarge};
  text-align: center;
  margin-top: auto;
`;

const LogoSmall = styled.img`
  height: 30px;
  margin-right: 10px;
  vertical-align: middle;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <FooterText>
        <LogoSmall src={logoTamarAI} alt="TamarADV Logo AI" />
        © {currentYear} TamarADV. Todos os direitos reservados.
      </FooterText>
      <FooterText>
        Petições jurídicas inteligentes com tecnologia de ponta.
      </FooterText>
    </FooterContainer>
  );
};
