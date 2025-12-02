// src/pages/forms/GenericFormPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PrevidenciarioService } from '@/services/PrevidenciarioService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { IPrevidenciarioResponse, PrevidenciarioInput } from '@/types/IPrevidenciario';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 4rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  background: white;
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #e0e7ff;
  border-radius: 1rem;
  font-size: 1.1rem;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.3rem;
  border: 2px solid #e0e7ff;
  border-radius: 1rem;
  font-size: 1.1rem;
  min-height: 240px;
  resize: vertical;
  font-family: inherit;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to right, #6366f1, #8b5cf6, #ec4899);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.4s;
  &:hover:not(:disabled) {
    transform: translateY(-10px);
    box-shadow: 0 40px 80px rgba(139, 92, 246, 0.7);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function GenericFormPage() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IPrevidenciarioResponse | null>(null);
  const [formData, setFormData] = useState<PrevidenciarioInput>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result: IPrevidenciarioResponse;

      switch (tipo) {
        case 'aposentadoria-especial':
          result = (await PrevidenciarioService.aposEspecial(formData)).data;
          break;
        case 'aposentadoria-invalidez':
          result = (await PrevidenciarioService.aposInvalidez(formData)).data;
          break;
        case 'aposentadoria-rural':
          result = (await PrevidenciarioService.aposRural(formData)).data;
          break;
        case 'aposentadoria-tempo-contribuicao':
          result = (await PrevidenciarioService.aposTempoContribuicao(formData)).data;
          break;
        case 'auxilio-doenca':
          result = (await PrevidenciarioService.auxilioDoenca(formData)).data;
          break;
        case 'salario-maternidade':
          result = (await PrevidenciarioService.salarioMaternidade(formData)).data;
          break;
        case 'pensao-morte':
          result = (await PrevidenciarioService.pensaoMorte(formData)).data;
          break;
        case 'bpc-loas':
          result = (await PrevidenciarioService.bpcLoas(formData)).data;
          break;
        case 'revisao-vida-toda':
          result = (await PrevidenciarioService.revisaoVidaToda(formData)).data;
          break;
        case 'revisao-beneficio':
          result = (await PrevidenciarioService.revisaoBeneficio(formData)).data;
          break;
        default:
          alert('Petição não implementada ainda');
          setLoading(false);
          return;
      }

      setResponse(result);
    } catch (error: unknown) {
      console.error('Erro na geração da petição:', error);

      let errorMessage = 'Erro ao conectar com o servidor';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (typeof error === 'object' && error !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        const detail = err.response?.data?.detail || err.response?.data?.message;
        if (detail) {
          errorMessage = Array.isArray(detail) ? detail[0].msg || detail[0] : detail;
        }
      }

      alert(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTitle = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace('Contribuicao', 'Contribuição')
      .replace('Loas', 'LOAS')
      .replace('Bpc', 'BPC');
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{formatTitle(tipo || 'Petição')}</Title>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-lg font-bold mb-2">Nome Completo</label>
              <Input name="nome_cliente" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">CPF</label>
              <Input name="cpf_cliente" onChange={handleChange} required maxLength={11} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">Data de Nascimento</label>
              <Input name="data_nascimento" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2">Número do Benefício (se houver)</label>
              <Input name="numero_beneficio" onChange={handleChange} />
            </div>
          </div>

          <div className="mb-12">
            <label className="block text-xl font-bold mb-4">
              Descreva o caso com TODOS os detalhes possíveis
            </label>
            <TextArea
              name="descricao_caso"
              onChange={handleChange}
              placeholder="Doenças, períodos trabalhados, agentes nocivos, salários antigos, documentos anexados, tudo que puder ajudar..."
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'GERANDO PETIÇÃO COM IA...' : 'GERAR PETIÇÃO JURÍDICA AGORA'}
          </Button>
        </form>

        {response && (
          <div className="mt-16">
            <LLMResponseArea
              title="PETIÇÃO PRONTA PARA PROTOCOLO"
              content={response.peticao_completa}
              disclaimer={response.ethics.disclaimer}
            />
          </div>
        )}
      </FormWrapper>
    </Container>
  );
}