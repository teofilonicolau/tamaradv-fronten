import React from 'react';
import type { GenericCalcResult } from '@/types/CalculatorResults';

interface CalculationCardProps {
  title: string;
  data: GenericCalcResult;
}

export const CalculationCard: React.FC<CalculationCardProps> = ({ title, data }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const formatValue = (value: string | number | boolean | null | undefined): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
    return String(value);
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-l-8 border-indigo-600">
      <h2 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300 mb-6">{title}</h2>
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <span className="font-semibold text-gray-700 dark:text-gray-300 capitalize">
              {key.replace(/_/g, ' ')}
            </span>
            <span className="font-bold text-indigo-900 dark:text-indigo-200 text-lg">
              {formatValue(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};