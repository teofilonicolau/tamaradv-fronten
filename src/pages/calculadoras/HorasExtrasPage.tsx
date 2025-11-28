// src/pages/calculadoras/HorasExtrasPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  calculateHorasExtras,
  type HorasExtrasInput,
  type HorasExtrasOutput,
} from '../../services/calculadoras/HorasExtrasService';
import { CalculationCard } from '../../components/common/CalculationCard';
import { LLMResponseArea } from '../../components/common/LLMResponseArea';

// Named export (padrão profissional)
export const HorasExtrasPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HorasExtrasInput>();

  const [result, setResult] = React.useState<HorasExtrasOutput | null>(null);
  const [lastInput, setLastInput] = React.useState<HorasExtrasInput | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: HorasExtrasInput) => {
    setLoading(true);
    try {
      const res = await calculateHorasExtras(data);
      setResult(res);
      setLastInput(data); // Guarda exatamente o que o usuário digitou
    } catch (err) {
      console.error('Erro no cálculo:', err);
      alert('Erro ao calcular. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-blue-900">Calculadora de Horas Extras</h1>
        <p className="mt-3 text-lg text-gray-600">Calcule com precisão o valor das suas horas extras trabalhadas</p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Horas Extras Trabalhadas *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('horas', {
              required: 'Informe a quantidade de horas',
              min: { value: 0.01, message: 'Deve ser maior que zero' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Ex: 10.5"
          />
          {errors.horas && <p className="text-red-600 text-sm mt-2 font-medium">{errors.horas.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Salário Base Mensal (R$) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('salario', {
              required: 'Informe o salário base',
              min: { value: 1, message: 'Salário deve ser maior que zero' },
            })}
            className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="Ex: 3000.00"
          />
          {errors.salario && <p className="text-red-600 text-sm mt-2 font-medium">{errors.salario.message}</p>}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-900 to-indigo-800 hover:from-blue-800 hover:to-indigo-700 disabled:opacity-70 text-white font-bold text-lg py-5 rounded-xl shadow-lg transition transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? 'Calculando valor exato...' : 'Calcular Horas Extras'}
          </button>
        </div>
      </form>

      {/* RESULTADO PERFEITO */}
      {result && lastInput && (
        <>
          <CalculationCard
            title="Resultado do Cálculo de Horas Extras"
            data={{
              'Horas Extras Informadas': `${lastInput.horas} horas`,
              'Salário Base Mensal': `R$ ${lastInput.salario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              'Valor da Hora Normal': `R$ ${result.valorHoraNormal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              'Valor da Hora Extra (50%)': `R$ ${result.valorHoraExtra.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
              'Valor Total a Receber': `R$ ${result.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            }}
          />

          {result.detalhes && (
            <LLMResponseArea
              title="Explicação Jurídica Completa"
              content={result.detalhes}
            />
          )}
        </>
      )}
    </div>
  );
};