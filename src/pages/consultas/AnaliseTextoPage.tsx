// src/pages/consultas/AnaliseTextoPage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { ConsultationService } from '@/services/ConsultationService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';

interface FormData {
  texto: string;
  tipo_analise: 'resumo' | 'extrair_informacoes' | 'risco' | 'contrato';
}

export default function AnaliseTextoPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [resultado, setResultado] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setResultado('');

    try {
      const response = await ConsultationService.analise({
        texto: data.texto,
        tipo_analise: data.tipo_analise,
        firm_name: 'TamarAdv',
        lawyer_name: 'Dr(a). Tamar',
        signature_text: 'Atenciosamente,\nTamarIA',
        ai_persona: 'analista jurídico especialista em contratos e documentos',
      });

      const textoResultado =
        response.data.resultado ||
        response.data.analise ||
        response.data.resposta ||
        'Análise concluída com sucesso.';

      setResultado(textoResultado);
    } catch (error: unknown) {
      console.error('Erro na análise:', error);
      setResultado(
        'Erro ao analisar o documento. Verifique sua conexão ou tente novamente mais tarde.'
      );
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Título épico */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-16 leading-tight">
        Análise Inteligente de Textos e Documentos
      </h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Campo de texto grande */}
        <div>
          <label className="block text-xl font-bold text-gray-800 mb-4">
            Cole o texto, contrato, petição, sentença ou qualquer documento
          </label>
          <textarea
            {...register('texto', {
              required: 'Você precisa colar o texto para analisar',
            })}
            rows={14}
            className="w-full px-6 py-5 text-lg rounded-2xl border-2 border-gray-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all duration-200 resize-none font-mono"
            placeholder="Ex: Contrato de prestação de serviços, sentença judicial, petição inicial, e-mail de cobrança..."
          />
          {errors.texto && (
            <p className="text-red-600 font-medium mt-3">{errors.texto.message}</p>
          )}
        </div>

        {/* Tipo de análise */}
        <div>
          <label className="block text-xl font-bold text-gray-800 mb-4">
            O que você quer fazer com esse texto?
          </label>
          <select
            {...register('tipo_analise')}
            className="w-full px-6 py-5 text-lg rounded-2xl border-2 border-gray-300 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
          >
            <option value="resumo">Resumir o documento</option>
            <option value="extrair_informacoes">
              Extrair informações (partes, valores, prazos, cláusulas)
            </option>
            <option value="risco">Análise de risco jurídico</option>
            <option value="contrato">Revisão completa de contrato</option>
          </select>
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white font-bold text-2xl py-7 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-4">
              <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analisando documento com IA...
            </span>
          ) : (
            'Analisar com Inteligência Artificial'
          )}
        </button>
      </form>

      {/* Resultado */}
      {resultado && (
        <div className="mt-20 animate-fade-in">
          <LLMResponseArea
            title="Resultado da Análise Jurídica"
            content={resultado}
            disclaimer="Esta análise foi gerada por IA. Sempre revise com um advogado antes de tomar decisões jurídicas."
          />
        </div>
      )}
    </div>
  );
}