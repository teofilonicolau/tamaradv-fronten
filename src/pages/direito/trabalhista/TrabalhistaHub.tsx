// src/pages/direito/trabalhista/TrabalhistaHub.tsx
import React from 'react';
import styled from 'styled-components';
import { NavCard } from '../../../components/ui/NavCard';

const Container = styled.div`
  min-height: 100vh;
  background: #f9fafb;
  padding: 4rem 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 3rem;
`;

export const TrabalhistaHub: React.FC = () => {
  return (
    <Container>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-red-800 mb-4">Direito Trabalhista</h1>
        <p className="text-xl text-gray-600">Gere petições e quesitos com IA em segundos</p>
      </div>

      <Grid>
        <NavCard
          to="/trabalhista/peticao-vinculo"
          title="Reconhecimento de Vínculo Empregatício"
          description="Trabalhador sem carteira assinada"
          badge="MAIS USADO"
          highlight
        />
        <NavCard
          to="/trabalhista/quesitos-insalubridade"
          title="Quesitos para Perícia de Insalubridade"
          description="Grau médio ou máximo"
        />
      </Grid>
    </Container>
  );
};