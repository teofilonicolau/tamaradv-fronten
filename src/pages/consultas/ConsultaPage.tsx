// src/pages/consultas/ConsultaPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { ConsultationService } from '@/services/ConsultationService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { AreaJuridica } from '@/types/ILLM';

interface FormData {
  pergunta: string;
  area?: AreaJuridica;
}

export default function ConsultaPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      pergunta: '',
      area: 'geral',
    },
  });

  const [resposta, setResposta] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    if (!data.pergunta.trim()) return;

    setLoading(true);
    setResposta('');

    try {
      const response = await ConsultationService.consulta({
        pergunta: data.pergunta,
        area: data.area,
        firm_name: 'TamarAdv',
        lawyer_name: 'Dr(a). Tamar',
        signature_text: 'Atenciosamente,\nTamarIA - Inteligência Artificial Jurídica Brasileira',
        ai_persona: 'advogado experiente, didático e atualizado com a jurisprudência do STF e STJ',
      });

      // Agora 100% type-safe com seu ILLM.ts perfeito
      const texto =
        response.data.resposta ??
        response.data.resultado ??
        response.data.relatorio ??
        response.data.parecer ??
        'Consulta realizada com sucesso pela TamarIA.';

      setResposta(texto);
    } catch {
      setResposta('Erro ao conectar com a TamarIA. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      // AGORA O TYPESCRIPT AMA ESSA LINHA — TUDO TIPADO CORRETAMENTE
      reset({ pergunta: '', area: 'geral' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Consulta Jurídica com Inteligência Artificial
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
          Pergunte qualquer coisa sobre Direito Brasileiro. Resposta instantânea, precisa e fundamentada.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <div>
          <label className="block text-xl font-bold text-gray-800 dark:text-gray-200 mb-5">
            Qual é a sua dúvida jurídica?
          </label>
          <textarea
            {...register('pergunta', {
              required: 'Digite sua pergunta para continuar',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            })}
            rows={10}
            className="w-full px-8 py-7 text-lg rounded-3xl border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:bg-gray-900 transition-all duration-300 resize-none font-medium placeholder-gray-500"
            placeholder="Ex: Qual o prazo para revisão da vida toda em 2025? Posso incluir salários de antes de 1994?"
          />
          {errors.pergunta && (
            <p className="mt-4 text-red-600 font-semibold text-lg">{errors.pergunta.message}</p>
          )}
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Área do Direito (opcional — melhora a resposta)
          </label>
          <select
            {...register('area')}
            className="w-full px-6 py-5 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-700 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 dark:bg-gray-900 transition-all"
          >
            <option value="geral">Todas as áreas</option>
            <option value="previdenciario">Previdenciário (INSS)</option>
            <option value="trabalhista">Trabalhista</option>
            <option value="civil">Civil / Família</option>
            <option value="consumidor">Consumidor</option>
            <option value="processual-civil">Processo Civil</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-2xl md:text-3xl py-8 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl flex items-center justify-center gap-6"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-12 w-12" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Consultando TamarIA...</span>
            </>
          ) : (
            'Consultar Inteligência Artificial Jurídica'
          )}
        </button>
      </form>

      {resposta && (
        <div className="mt-24 animate-fade-in">
          <LLMResponseArea
            title="Resposta da TamarIA"
            content={resposta}
            disclaimer="Esta resposta foi gerada por inteligência artificial com base em legislação e jurisprudência atualizada. Sempre revise com um advogado antes de tomar decisões jurídicas."
          />
        </div>
      )}
    </div>
  );
}