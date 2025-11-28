// src/components/features/CalculationCard.tsx
import React from 'react';
import styled from 'styled-components';

// === ESTILOS (mantidos) ===
const ResultContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 24px;
  margin-top: 24px;
  border-left: 5px solid ${({ theme }) => theme.colors?.success || '#10b981'};
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const ResultTitle = styled.h3`
  color: ${({ theme }) => theme.colors?.primary || '#4f46e5'};
  margin: 0;
  font-size: 1.25rem;
`;

// === TIPO RECURSIVO PARA DADOS DE CÁLCULO (flexível e seguro)
type CalculationValue =
  | string
  | number
  | boolean
  | null
  | CalculationValue[]
  | { [key: string]: CalculationValue };

type CalculationData = {
  [key: string]: CalculationValue;
};

// === PROPS TIPADAS ===
interface CalculationCardProps {
  data: CalculationData;
  title: string;
}

// === COMPONENTE 100% TIPADO ===
export const CalculationCard: React.FC<CalculationCardProps> = ({ data, title }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Função recursiva totalmente tipada
  const renderValue = (value: CalculationValue): React.ReactNode => {
    if (value === null || value === undefined) return '—';

    if (typeof value === 'boolean') {
      return value ? 'Sim' : 'Não';
    }

    if (typeof value === 'number') {
      // Formata valores monetários automaticamente
      if (value > 1000) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      }
      return value.toLocaleString('pt-BR');
    }

    if (Array.isArray(value)) {
      return (
        <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
          {value.map((item, i) => (
            <li key={i}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }

    if (typeof value === 'object') {
      return (
        <div style={{ marginLeft: '16px' }}>
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <strong>{k.replace(/_/g, ' ')}:</strong> {renderValue(v)}
            </div>
          ))}
        </div>
      );
    }

    return String(value);
  };

  return (
    <ResultContainer>
      <ResultHeader>
        <ResultTitle>Resultado: {title}</ResultTitle>
      </ResultHeader>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td
                style={{
                  textTransform: 'capitalize',
                  width: '40%',
                  padding: '12px',
                  color: '#4b5563',
                  fontWeight: '600',
                }}
              >
                {key.replace(/_/g, ' ')}
              </td>
              <td
                style={{
                  padding: '12px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                }}
              >
                {renderValue(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ResultContainer>
  );
};