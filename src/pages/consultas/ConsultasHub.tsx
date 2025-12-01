// src/pages/consultas/ConsultasHub.tsx
import React from 'react';
import { NavCard } from '../../components/ui/NavCard'; // ← CORRIGIDO
import { Brain, FileText, ScrollText } from 'lucide-react';

export const ConsultasHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Consultas & IA Jurídica
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
          Três ferramentas poderosas com inteligência artificial jurídica brasileira
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <NavCard
          to="/consultas/consulta"
          title="Consulta Rápida"
          description="Pergunte qualquer coisa jurídica com resposta instantânea"
          icon={<Brain size={64} className="text-white" />}
          highlight={true}
        />
        <NavCard
          to="/consultas/analise"
          title="Análise de Texto"
          description="Resumo, extração de informações e análise de contratos"
          icon={<FileText size={64} className="text-white" />}
        />
        <NavCard
          to="/consultas/parecer"
          title="Parecer Jurídico"
          description="Parecer completo com fundamentação e jurisprudência"
          icon={<ScrollText size={64} className="text-white" />}
          badge="Mais completo"
        />
      </div>
    </div>
  );
};