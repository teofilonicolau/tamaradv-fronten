// src/pages/forms/ConsultaPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { GeneralService } from '../../services/GeneralService';
import { LLMResponseArea } from '../../components/features/LLMResponseArea';
import type { AreaJuridica } from '../../types/ILLM';

interface ConsultaPayload {
  texto: string;
  area?: AreaJuridica;
  firm_name?: string;
  lawyer_name?: string;
  signature_text?: string;
  ai_persona?: string;
}

interface ConsultaResponse {
  resposta: string;
  ethics: {
    disclaimer: string;
    generated_at: string;
    requires_lawyer_review: boolean;
    ai_tool_version?: string;
    responsibility_notice?: string;
  };
}

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  font-size: 1.1rem;
  font-family: inherit;
  margin-bottom: 1.5rem;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(to right, #1e40af, #3b82f6);
  color: white;
  padding: 1rem 3rem;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ConsultaPage: React.FC = () => {
  const [pergunta, setPergunta] = useState('');
  const [response, setResponse] = useState<ConsultaResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!pergunta.trim()) {
      alert('Digite sua dúvida antes de enviar.');
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      const payload: ConsultaPayload = {
        texto: pergunta,
        area: 'geral' as const,
        firm_name: 'TamarADV',
        lawyer_name: 'Dr(a). TamarAI',
        signature_text: 'Assinado digitalmente por IA supervisionada',
        ai_persona: 'Advogado Especialista em Direito Brasileiro',
      };

      const res = await GeneralService.ia.consulta(payload);

      setResponse({
        resposta: res.data.resposta ?? 'A IA não retornou uma resposta válida.',
        ethics: {
          disclaimer: res.data.ethics?.disclaimer ?? 'Resposta gerada por inteligência artificial.',
          generated_at: res.data.ethics?.generated_at ?? new Date().toISOString(),
          requires_lawyer_review: res.data.ethics?.requires_lawyer_review ?? true,
          ai_tool_version: res.data.ethics?.ai_tool_version,
          responsibility_notice:
            res.data.ethics?.responsibility_notice ??
            'Esta resposta foi gerada por inteligência artificial e deve ser revisada por um advogado humano antes de qualquer uso.',
        },
      });
    } catch (err) {
      console.error('Erro na consulta à IA:', err);
      alert('Erro ao conectar com a IA. Tente novamente em alguns instantes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-bold text-blue-900 mb-4 text-center">
        Consulta Jurídica com TamarAI
      </h1>
      <p className="text-center text-lg text-gray-600 mb-8">
        Descreva o caso ou dúvida jurídica. A IA responderá com base no ordenamento brasileiro.
      </p>

      <TextArea
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
        placeholder="Ex: Meu cliente trabalhou 10 anos em ambiente insalubre. Tem direito a aposentadoria especial?"
      />

      <div className="text-center">
        <Button onClick={handleSend} disabled={loading}>
          {loading ? 'Consultando TamarAI...' : 'Enviar Consulta'}
        </Button>
      </div>

      {response && (
        <LLMResponseArea
          title="Resposta da IA Jurídica"
          generatedText={response.resposta}
          disclaimer={response.ethics} // ← Agora 100% compatível!
        />
      )}
    </Container>
  );
};

export default ConsultaPage;