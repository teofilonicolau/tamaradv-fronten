// src/pages/CalculadorasHub.tsx
import React from 'react';
import { NavCard } from '../../components/ui/NavCard'; 
import {
  Calculator,
  Clock,
  Gavel,
  DollarSign,
  TrendingUp,
  Moon,
  Heart,
  Zap,
  Briefcase,
  FileText,
  Calendar,
} from 'lucide-react';

export const CalculadorasHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700 mb-6">
            Calculadoras Jurídicas Inteligentes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            12 ferramentas com cálculos precisos, atualizadas com EC 103, Tema 1.102/STF e CLT reformada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* PREVIDENCIÁRIO */}
          <NavCard
            to="/calculadoras/tempo-especial"
            title="Tempo Especial"
            description="Converta insalubridade/periculosidade"
            icon={<Zap className="w-9 h-9 text-white" />}
            badge="MAIS USADA"
            highlight
          />
          <NavCard
            to="/calculadoras/revisao-vida-toda"
            title="Revisão da Vida Toda"
            description="Inclua salários antes de 1994"
            icon={<TrendingUp className="w-9 h-9 text-white" />}
            badge="TEMA 1.102"
            highlight
          />
          <NavCard
            to="/calculadoras/regra-transicao-ec103"
            title="Regra de Transição"
            description="Pedágio 50%/100% e pontos"
            icon={<Gavel className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/periodo-graca"
            title="Período de Graça"
            description="Qualidade de segurado mantida?"
            icon={<Calendar className="w-9 h-9 text-white" />}
          />

          {/* TRABALHISTA */}
          <NavCard
            to="/calculadoras/horas-extras"
            title="Horas Extras"
            description="50%, 100%, reflexos e noturno"
            icon={<Clock className="w-9 h-9 text-white" />}
            badge="EM ALTA"
            highlight
          />
          <NavCard
            to="/calculadoras/adicional-noturno"
            title="Adicional Noturno"
            description="20% + hora reduzida"
            icon={<Moon className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/verbas-rescisorias"
            title="Verbas Rescisórias"
            description="FGTS, multa, férias, 13º"
            icon={<Briefcase className="w-9 h-9 text-white" />}
          />

          {/* GERAIS */}
          <NavCard
            to="/calculadoras/correcao-monetaria"
            title="Correção Monetária"
            description="INPC, IPCA, IGP-M"
            icon={<TrendingUp className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/juros-mora"
            title="Juros de Mora"
            description="1% ao mês pro rata die"
            icon={<DollarSign className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/pensao-alimenticia"
            title="Pensão Alimentícia"
            description="Percentual sugerido + base legal"
            icon={<Heart className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/liquidacao-sentenca"
            title="Liquidação de Sentença"
            description="Honorários + atualização"
            icon={<FileText className="w-9 h-9 text-white" />}
          />
          <NavCard
            to="/calculadoras/valor-causa"
            title="Valor da Causa"
            description="12 ou 60 parcelas"
            icon={<Calculator className="w-9 h-9 text-white" />}
          />
        </div>

        <div className="mt-20 text-center text-gray-500 dark:text-gray-400">
          <p>Todas as calculadoras usam os endpoints oficiais da TamarAI v1</p>
        </div>
      </div>
    </div>
  );
};