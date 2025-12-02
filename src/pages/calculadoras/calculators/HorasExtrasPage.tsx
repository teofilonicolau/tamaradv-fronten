// src/pages/calculadoras/calculators/
// HorasExtrasPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { CalculatorService } from '../../../services/CalculatorService';
import { CalculationCard } from '../../../components/ui/CalculationCard';
import { LLMResponseArea } from '../../../components/ui/LLMResponseArea';

interface HorasExtrasRequest {
  jornada_contratual: number;
  jornada_real: number;
  dias_trabalhados: number;
  valor_hora: number;
}

interface HorasExtrasCalculo {
  horas_extras_diarias: number;
  valor_total: number;
  observacao: string;
}

interface HorasExtrasResponse {
  calculo: HorasExtrasCalculo;
  area?: string;
  status?: string;
}

export const HorasExtrasPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HorasExtrasRequest>();

  const [result, setResult] = React.useState<HorasExtrasResponse | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: HorasExtrasRequest) => {
    setLoading(true);
    try {
      const response = await CalculatorService.horasExtras({
        jornada_contratual: Number(data.jornada_contratual),
        jornada_real: Number(data.jornada_real),
        dias_trabalhados: Number(data.dias_trabalhados),
        valor_hora: Number(data.valor_hora),
      });

      setResult(response.data);
    } catch (err) {
      const error = err as {
        response?: { data?: { detail?: string } };
        message?: string;
      };

      console.error('Erro ao calcular horas extras:', err);
      alert(error.response?.data?.detail || error.message || 'Erro inesperado no servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-400">
          Calculadora de Horas Extras
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Cálculo preciso com base na jornada real vs contratual, conforme a CLT e jurisprudência atualizada.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Jornada Contratual */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Jornada Contratual (horas por dia) *
          </label>
          <input
            type="number"
            step="0.5"
            {...register('jornada_contratual', {
              required: 'Campo obrigatório',
              min: { value: 1, message: 'Mínimo 1 hora' },
              max: { value: 12, message: 'Máximo 12 horas' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 dark:text-white bg-transparent"
            placeholder="Ex: 8"
          />
          {errors.jornada_contratual && (
            <p className="text-red-500 text-sm mt-2">{errors.jornada_contratual.message}</p>
          )}
        </div>

        {/* Jornada Real */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Jornada Real Trabalhada (horas por dia) *
          </label>
          <input
            type="number"
            step="0.5"
            {...register('jornada_real', {
              required: 'Campo obrigatório',
              min: { value: 1, message: 'Mínimo 1 hora' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 dark:text-white bg-transparent"
            placeholder="Ex: 10"
          />
          {errors.jornada_real && (
            <p className="text-red-500 text-sm mt-2">{errors.jornada_real.message}</p>
          )}
        </div>

        {/* Dias Trabalhados */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Dias Trabalhados no Mês *
          </label>
          <input
            type="number"
            {...register('dias_trabalhados', {
              required: 'Campo obrigatório',
              min: { value: 1, message: 'Mínimo 1 dia' },
              max: { value: 31, message: 'Máximo 31 dias' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 dark:text-white bg-transparent"
            placeholder="Ex: 22"
          />
          {errors.dias_trabalhados && (
            <p className="text-red-500 text-sm mt-2">{errors.dias_trabalhados.message}</p>
          )}
        </div>

        {/* Valor da Hora */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Valor da Hora Normal (R$) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('valor_hora', {
              required: 'Campo obrigatório',
              min: { value: 0.01, message: 'Valor deve ser maior que zero' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 dark:text-white bg-transparent"
            placeholder="Ex: 25.50"
          />
          {errors.valor_hora && (
            <p className="text-red-500 text-sm mt-2">{errors.valor_hora.message}</p>
          )}
        </div>

        {/* Botão */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-800 hover:to-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-xl py-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 duration-200 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Calculando...
              </>
            ) : (
              'Calcular Horas Extras'
            )}
          </button>
        </div>
      </form>

      {/* Resultado */}
      {result && (
        <div className="space-y-8 animate-fade-in">
          <CalculationCard
            title="Resultado do Cálculo de Horas Extras"
            data={{
              'Horas Extras Diárias': `${result.calculo.horas_extras_diarias.toFixed(2)} horas`,
              'Valor Total Devido': `R$ ${result.calculo.valor_total.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
              'Observação': result.calculo.observacao || 'Sem observações adicionais.',
            }}
          />

          {result.calculo.observacao && (
            <LLMResponseArea
              title="Fundamentação Jurídica e Explicação Detalhada"
              content={result.calculo.observacao}
            />
          )}
        </div>
      )}
    </div>
  );
};