// src/pages/previdenciario/PrevidenciarioHub.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Calculator, ArrowLeft, Scale } from 'lucide-react';

const PeticaoCard: React.FC<{
  to: string;
  title: string;
  subtitle: string;
  isCalculator?: boolean;
  isRevisao?: boolean;
}> = ({ to, title, subtitle, isCalculator, isRevisao }) => (
  <NavLink
    to={to}
    className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
  >
    <div className="p-8 text-center">
      <div
        className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform ${
          isCalculator
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
            : isRevisao
            ? 'bg-gradient-to-br from-purple-500 to-pink-600'
            : 'bg-gradient-to-br from-blue-500 to-blue-700'
        }`}
      >
        {isCalculator ? (
          <Calculator size={40} className="text-white" />
        ) : isRevisao ? (
          <Scale size={40} className="text-white" />
        ) : (
          <FileText size={40} className="text-white" />
        )}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-lg">{subtitle}</p>

      <span className="inline-block mt-6 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-800">
        {isCalculator ? 'Calcular →' : 'Gerar Petição →'}
      </span>
    </div>
  </NavLink>
);

export const PrevidenciarioHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Botão Voltar */}
        <div className="mb-12 flex items-center gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            <ArrowLeft size={24} />
            Voltar ao Início
          </NavLink>
        </div>

        {/* Cabeçalho */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-blue-900 dark:text-blue-300 mb-4">
            Direito Previdenciário
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Gere petições completas com IA jurídica especializada em INSS. Todos os modelos seguem o Tema 1.102/STF, EC 103 e jurisprudência atualizada.
          </p>
        </header>

        {/* Grid de Petições */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <PeticaoCard
            to="/previdenciario/peticao/aposentadoria-especial"
            title="Aposentadoria Especial"
            subtitle="Insalubridade e periculosidade (25, 20 ou 15 anos)"
          />
          <PeticaoCard
            to="/previdenciario/peticao/aposentadoria-invalidez"
            title="Aposentadoria por Invalidez"
            subtitle="Incapacidade total e permanente"
          />
          <PeticaoCard
            to="/previdenciario/peticao/aposentadoria-rural"
            title="Aposentadoria Rural / Híbrida"
            subtitle="Trabalhador rural, boia-fria, segurado especial"
          />
          <PeticaoCard
            to="/previdenciario/peticao/aposentadoria-tempo-contribuicao"
            title="Aposentadoria por Tempo"
            subtitle="Regra 86/96, transição, pedágio"
          />
          <PeticaoCard
            to="/previdenciario/peticao/auxilio-doenca"
            title="Auxílio-Doença"
            subtitle="Incapacidade temporária + carência"
          />
          <PeticaoCard
            to="/previdenciario/peticao/salario-maternidade"
            title="Salário-Maternidade"
            subtitle="Urbano, rural e contribuinte individual"
          />
          <PeticaoCard
            to="/previdenciario/peticao/pensao-morte"
            title="Pensão por Morte"
            subtitle="Cônjuge, companheiro(a), filhos"
          />
          <PeticaoCard
            to="/previdenciario/peticao/bpc-loas"
            title="BPC/LOAS"
            subtitle="Idoso ou deficiente de baixa renda"
          />
          <PeticaoCard
            to="/previdenciario/peticao/revisao-vida-toda"
            title="Revisão da Vida Toda"
            subtitle="Inclusão de salários antes de 07/1994"
            isRevisao
          />
          <PeticaoCard
            to="/previdenciario/peticao/revisao-beneficio"
            title="Revisão Genérica do Benefício"
            subtitle="Erro de cálculo, teto, buraco negro..."
            isRevisao
          />
        </div>

        {/* Botão Grande para Calculadoras */}
        <div className="text-center">
          <PeticaoCard
            to="/calculadoras"
            title="Calculadoras Previdenciárias"
            subtitle="Tempo especial, Revisão Vida Toda, Regra de Transição, Período de Graça..."
            isCalculator
          />
        </div>
      </div>
    </div>
  );
};