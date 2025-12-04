// src/pages/processual-civil/ProcessualCivilHub.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Gavel } from 'lucide-react';

const PeticaoCard: React.FC<{ to: string; title: string; subtitle: string }> = ({
  to,
  title,
  subtitle,
}) => (
  <NavLink
    to={to}
    className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <div className="p-8 text-center">
      <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform bg-gradient-to-br from-purple-600 to-indigo-700">
        <Gavel size={40} className="text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{subtitle}</p>
      <span className="inline-block mt-6 text-purple-600 dark:text-purple-400 font-semibold group-hover:text-purple-800">
        Gerar Petição →
      </span>
    </div>
  </NavLink>
);

export const ProcessualCivilHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex items-center gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-purple-700 dark:text-purple-400 hover:underline font-medium"
          >
            <ArrowLeft size={24} />
            Voltar ao Início
          </NavLink>
        </div>
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-purple-900 dark:text-purple-300 mb-4">
            Direito Processual Civil
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            Petições processuais completas com fundamentação no CPC/2015 e jurisprudência atualizada.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PeticaoCard
            to="/processual-civil/execucao-titulo"
            title="Execução de Título Extrajudicial"
            subtitle="CPC arts. 771 a 925"
          />
          <PeticaoCard
            to="/processual-civil/monitoria"
            title="Ação Monitória"
            subtitle="CPC art. 700 – transformação em execução"
          />
          <PeticaoCard
            to="/processual-civil/embargos-terceiro"
            title="Embargos de Terceiro"
            subtitle="Desconstituição de penhora indevida"
          />
          <PeticaoCard
            to="/processual-civil/impugnacao-cumprimento"
            title="Impugnação ao Cumprimento de Sentença"
            subtitle="Excesso de execução, prescrição intercorrente"
          />
        </div>
      </div>
    </div>
  );
};