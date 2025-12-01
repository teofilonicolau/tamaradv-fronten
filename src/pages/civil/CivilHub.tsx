import React from 'react';
import styled from 'styled-components';
import { NavCard } from '../../components/ui/NavCard'; // 

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const CivilHub: React.FC = () => {
  return (
    <div>
      <h2>Direito Civil</h2>
      <Grid>
        <NavCard to="/civil/peticao-cobranca" title="Ação de Cobrança" description="Cobrança de dívidas cíveis." />
        <NavCard to="/civil/peticao-indenizacao" title="Ação de Indenização" description="Danos morais e materiais." />
      </Grid>
    </div>
  );
};

export default CivilHub;