// src/pages/consultas/ConsultaIAPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { GeneralService } from '../../services/GeneralService';
import { LLMResponseArea } from '../../components/common/LLMResponseArea';
import type { AreaJuridica } from '../../types/ILLM';

interface ConsultaForm {
  texto: string;
  area?: AreaJuridica;
}

export const ConsultaIAPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, // ← CORRETO: desestruturado aqui
  } = useForm<ConsultaForm>();

  const [resposta, setResposta] = React.useState<string>('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: ConsultaForm) => {
    if (!data.texto.trim()) return;

    setLoading(true);
    setResposta('');

    try {
      const response = await GeneralService.ia.consulta({
        texto: data.texto,
        area: data.area || undefined,
      });

      const textoResposta =
        response.data.resposta ||
        response.data.analise ||
        response.data.parecer ||
        response.data.consulta ||
        'Resposta gerada com sucesso pela IA.';

      setResposta(textoResposta);
    } catch (error) {
      console.error('Erro na consulta IA:', error);
      setResposta('Erro ao consultar a IA. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Consulta Jurídica com Inteligência Artificial
        </h1>
        <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Faça qualquer pergunta jurídica. Resposta instantânea, fundamentada e atualizada com doutrina e jurisprudência.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Sua pergunta jurídica
          </label>
          <textarea
            {...register('texto', {
              required: 'Digite sua pergunta para continuar',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            })}
            rows={8}
            className="w-full px-6 py-5 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:bg-gray-800 transition-all resize-none"
            placeholder="Ex: Qual o prazo para revisão da vida toda após o Tema 1.102 do STF?"
          />
          {errors.texto && (
            <p className="mt-2 text-red-500 font-medium">{errors.texto.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Área do Direito (opcional)
          </label>
          <select
            {...register('area')}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:border-indigo-500 dark:bg-gray-800"
          >
            <option value="">Todas as áreas</option>
            <option value="previdenciario">Previdenciário</option>
            <option value="trabalhista">Trabalhista</option>
            <option value="civil">Civil</option>
            <option value="consumidor">Consumidor</option>
            <option value="processual-civil">Processual Civil</option>
            <option value="geral">Geral</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 disabled:cursor-not-allowed disabled:opacity-70 text-white font-bold text-xl py-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] duration-200 flex items-center justify-center gap-4"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Consultando a IA...
            </>
          ) : (
            'Consultar Inteligência Artificial'
          )}
        </button>
      </form>

      {resposta && (
        <div className="mt-16 animate-fade-in">
          <LLMResponseArea
            title="Resposta da TamarIA"
            content={resposta}
          />
        </div>
      )}
    </div>
  );
};