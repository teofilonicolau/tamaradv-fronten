// src/components/common/LLMResponseArea.tsx
import React from 'react';

interface Props {
  title: string;
  content: string;
}

export const LLMResponseArea: React.FC<Props> = ({ title, content }) => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl shadow-lg">
    <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-200 mb-6">{title}</h2>
    <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
      {content}
    </div>
  </div>
);