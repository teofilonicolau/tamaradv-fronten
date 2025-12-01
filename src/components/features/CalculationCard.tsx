// src/components/features/CalculationCard.tsx
import React from 'react';
import styled from 'styled-components';

// === ESTILOS CORRIGIDOS (agora usa theme.colors.primary) ===
const ResultContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 28px;
  margin-top: 32px;
  border-left: 6px solid ${({ theme }) => theme.colors?.primary || '#6366f1'};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
`;

const ResultTitle = styled.h3`
  color: ${({ theme }) => theme.colors?.primary || '#6366f1'};
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

// === TIPOS (mantidos) ===
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

interface CalculationCardProps {
  data: CalculationData;
  title: string;
}

// === COMPONENTE PERFEITO ===
export const CalculationCard: React.FC<CalculationCardProps> = ({ data, title }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  const renderValue = (value: CalculationValue): React.ReactNode => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
    if (typeof value === 'number') {
      if (Math.abs(value) >= 1000) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      }
      return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside ml-4 mt-1 text-sm">
          {value.map((item, i) => (
            <li key={i}>{renderValue(item)}</li>
          ))}
        </ul>
      );
    }
    if (typeof value === 'object') {
      return (
        <div className="ml-6 mt-2 space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="text-sm">
              <strong className="capitalize">{k.replace(/_/g, ' ')}:</strong>{' '}
              {renderValue(v)}
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
        <ResultTitle>{title}</ResultTitle>
      </ResultHeader>

      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="font-semibold text-gray-700 capitalize">
              {key.replace(/_/g, ' ')}
            </div>
            <div className="font-bold text-gray-900">
              {renderValue(value)}
            </div>
          </div>
        ))}
      </div>
    </ResultContainer>
  );
};