// src/components/common/CalculationCard.tsx
import React from 'react';

interface Props {
  title: string;
  data: Record<string, string>;
}

export const CalculationCard: React.FC<Props> = ({ title, data }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">{title}</h2>
    <dl className="grid grid-cols-1 gap-4">
      {Object.entries(data).map(([label, value]) => (
        <div key={label} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
          <dt className="font-medium text-gray-700 dark:text-gray-300">{label}</dt>
          <dd className="text-right font-bold text-blue-900 dark:text-blue-200">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);