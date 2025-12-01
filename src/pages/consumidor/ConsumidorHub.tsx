import React from 'react';
import styled from 'styled-components';
import { NavCard } from '../../components/ui/NavCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const ConsumidorHub: React.FC = () => {
  return (
    <div>
      <h2>Direito do Consumidor</h2>
      <Grid>
        <NavCard to="/consumidor/peticao-cobranca-indevida" title="Cobrança Indevida" description="Repetição de indébito." />
        <NavCard to="/consumidor/peticao-vicio-produto" title="Vício do Produto" description="Produto com defeito." />
      </Grid>
    </div>
  );
};

export default ConsumidorHub;