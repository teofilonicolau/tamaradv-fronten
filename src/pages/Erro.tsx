// src/pages/Erro.tsx
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem;
`;

export default function Erro() {
  return (
    <Container>
      <div>
        <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
        <h2>Página não encontrada</h2>
        <p>A TamarADV não perdeu o rumo... você perdeu!</p>
        <a href="/" style={{ color: '#a855f7', fontSize: '1.5rem', textDecoration: 'underline' }}>
          Voltar ao início
        </a>
      </div>
    </Container>
  );
}