// src/pages/consultas/ParecerJuridicoPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { ConsultationService } from '@/services/ConsultationService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { AreaJuridica } from '@/types/ILLM';

interface FormData {
  titulo: string;
  conteudo: string;
  area?: AreaJuridica;
  incluir_jurisprudencia: boolean;
}

export default function ParecerJuridicoPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      area: 'previdenciario',
      incluir_jurisprudencia: true,
    },
  });

  const [parecer, setParecer] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setParecer('');

    try {
      const response = await ConsultationService.parecerJuridico({
        ...data,
        firm_name: 'TamarAdv',
        lawyer_name: 'Dr(a). Tamar',
        signature_text: 'Com os melhores cumprimentos,\nTamarIA - Inteligência Artificial Jurídica',
        ai_persona: 'desembargador aposentado do TJSP, rigoroso, didático e atualizado com STF/STJ',
      });

      const textoParecer =
        response.data.relatorio ||
        response.data.parecer ||
        response.data.resposta ||
        'Parecer jurídico gerado com sucesso.';

      setParecer(textoParecer);
    } catch (error: unknown) {
      console.error('Erro ao gerar parecer jurídico:', error);

      let mensagemErro = 'Erro ao gerar o parecer. Tente novamente em alguns segundos.';

      if (typeof error === 'object' && error !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        const detail = err.response?.data?.detail || err.response?.data?.message;
        if (detail) {
          mensagemErro = typeof detail === 'string' ? detail : 'Erro interno do servidor.';
        }
      }

      setParecer(mensagemErro);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Cabeçalho épico */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-amber-600 via-red-600 to-rose-700 bg-clip-text text-transparent leading-tight">
          Gerador de Parecer Jurídico Oficial
        </h1>
        <p className="mt-8 text-2xl text-gray-700 dark:text-gray-300 font-light max-w-4xl mx-auto">
          Parecer completo com título, ementa, fundamentação legal, jurisprudência atualizada e conclusão técnica.
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-2 gap-12">
        {/* Coluna esquerda - Configurações */}
        <div className="space-y-10">
          <div>
            <label className="block text-xl font-bold text-gray-800 mb-4">
              Título do Parecer
            </label>
            <input
              {...register('titulo', { required: 'O título do parecer é obrigatório' })}
              type="text"
              className="w-full px-7 py-5 text-lg rounded-2xl border-2 border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
              placeholder="Ex: Da possibilidade de revisão da vida toda após o Tema 1.102/STF"
            />
            {errors.titulo && (
              <p className="mt-3 text-red-600 font-semibold">{errors.titulo.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xl font-bold text-gray-800 mb-4">
              Área do Direito
            </label>
            <select
              {...register('area')}
              className="w-full px-7 py-5 text-lg rounded-2xl border-2 border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
            >
              <option value="previdenciario">Previdenciário</option>
              <option value="trabalhista">Trabalhista</option>
              <option value="civil">Civil / Família</option>
              <option value="consumidor">Consumidor</option>
              <option value="processual-civil">Processo Civil</option>
              <option value="geral">Geral / Outras áreas</option>
            </select>
          </div>

          <div className="flex items-center gap-5 p-6 bg-amber-50 rounded-2xl border-2 border-amber-200">
            <input
              type="checkbox"
              {...register('incluir_jurisprudencia')}
              className="w-8 h-8 text-amber-600 rounded focus:ring-amber-500"
            />
            <label className="text-lg font-semibold text-amber-900">
              Incluir jurisprudência atualizada do STF, STJ e Tribunais Regionais
            </label>
          </div>
        </div>

        {/* Coluna direita - Fatos do caso */}
        <div>
          <label className="block text-xl font-bold text-gray-800 mb-4">
            Fatos do Caso / Questão Submetida
          </label>
          <textarea
            {...register('conteudo', { required: 'Descreva os fatos do caso' })}
            rows={18}
            className="w-full px-7 py-6 text-lg rounded-2xl border-2 border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all resize-none font-medium"
            placeholder="Descreva com o máximo de detalhes possível: datas, valores, documentos, decisões administrativas, sentenças, tudo que for relevante para o parecer..."
          />
          {errors.conteudo && (
            <p className="mt-3 text-red-600 font-semibold">{errors.conteudo.message}</p>
          )}
        </div>

        {/* Botão full width */}
        <div className="lg:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 via-red-600 to-rose-700 hover:from-amber-700 hover:via-red-700 hover:to-rose-800 disabled:opacity-70 text-white font-bold text-3xl py-10 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-6">
                <svg className="animate-spin h-12 w-12" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Gerando Parecer Jurídico Completo...
              </span>
            ) : (
              'GERAR PARECER JURÍDICO OFICIAL'
            )}
          </button>
        </div>
      </form>

      {/* Resultado */}
      {parecer && (
        <div className="mt-24 animate-fade-in">
          <LLMResponseArea
            title="PARECER JURÍDICO COMPLETO"
            content={parecer}
            disclaimer="Parecer elaborado por inteligência artificial com base em legislação e jurisprudência. Recomenda-se revisão por advogado habilitado antes de qualquer utilização formal."
          />
        </div>
      )}
    </div>
  );
}