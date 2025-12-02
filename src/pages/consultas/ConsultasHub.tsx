// src/pages/consultas/ConsultasHub.tsx — VERSÃO FINAL 2025 (PRONTA PRA PRODUÇÃO)
import React from 'react';
import { NavCard } from '@/components/ui/NavCard'; // ← Usando alias @ (mais limpo e moderno)
import { Brain, FileText, ScrollText } from 'lucide-react';

export const ConsultasHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb + Botão Voltar */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="text-sm breadcrumbs text-gray-600 dark:text-gray-400">
            <ul>
              <li>
                <a href="/" className="hover:text-indigo-600 transition-colors">
                  Home
                </a>
              </li>
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                Consultas & IA
              </li>
            </ul>
          </div>

          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium flex items-center gap-2 transition-colors"
          >
            ← Voltar para Home
          </a>
        </div>

        {/* Cabeçalho principal */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Consultas & IA Jurídica
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Três ferramentas poderosas com inteligência artificial jurídica brasileira
          </p>
        </header>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <NavCard
            to="/consulta"
            title="Consulta Rápida"
            description="Pergunte qualquer coisa jurídica com resposta instantânea"
            icon={<Brain size={64} className="text-white" />}
            highlight={true}
          />

          <NavCard
            to="/analise-texto"
            title="Análise de Texto"
            description="Resumo, extração de informações e análise de contratos"
            icon={<FileText size={64} className="text-white" />}
          />

          <NavCard
            to="/parecer-juridico"
            title="Parecer Jurídico"
            description="Parecer completo com fundamentação e jurisprudência"
            icon={<ScrollText size={64} className="text-white" />}
            badge="Mais completo"
          />
        </div>
      </div>
    </div>
  );
};