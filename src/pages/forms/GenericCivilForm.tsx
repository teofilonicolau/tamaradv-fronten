// src/pages/forms/GenericCivilForm.tsx
import React, { useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CivilService } from '@/services/CivilService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { CivilInput, ICivilResponse } from '@/types/ICivil';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
  padding: 4rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 30px 100px rgba(0, 0, 0.15);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #f59e0b, #f97316, #ef4444);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #fde68a;
  border-radius: 1rem;
  font-size: 1.1rem;
  &:focus { outline: none; border-color: #f59e0b; box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.2); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #fde68a;
  border-radius: 1rem;
  font-size: 1.1rem;
  resize: vertical;
  &:focus { outline: none; border-color: #f59e0b; box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.2); }
`;

const Button = styled.button`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to right, #f59e0b, #f97316, #ef4444);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.4s;
  &:hover:not(:disabled) { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(245, 158, 11, 0.7); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export default function GenericCivilForm() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ICivilResponse | null>(null);

  const [formData, setFormData] = useState<CivilInput>({
    tipo_acao: '',
    parte_contraria: '',
    cpf_cnpj_parte_contraria: '',
    descricao_caso: '',
    valor_causa: 0,
    data_fato_gerador: '',
    tentativa_acordo_extrajudicial: false,
    urgencia_caso: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result;
      if (tipo === 'peticao-cobranca') {
        result = await CivilService.peticaoCobranca(formData);
      } else if (tipo === 'peticao-indenizacao') {
        result = await CivilService.peticaoIndenizacao(formData);
      } else {
        throw new Error('Tipo inválido');
      }
      setResponse(result.data);
    } catch (error) {
      const err = error as { response?: { data?: { detail?: Array<{ msg?: string }> } } };
      alert(err.response?.data?.detail?.[0]?.msg || 'Erro ao gerar petição');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (tipo === 'peticao-cobranca') return 'Ação de Cobrança';
    if (tipo === 'peticao-indenizacao') return 'Ação de Indenização';
    return 'Direito Civil';
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{getTitle()}</Title>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-lg font-bold mb-2 text-amber-700">Parte Contrária</label>
              <Input name="parte_contraria" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-amber-700">CPF/CNPJ da Parte Contrária</label>
              <Input name="cpf_cnpj_parte_contraria" placeholder="000.000.000-00" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-amber-700">Data do Fato Gerador</label>
              <Input name="data_fato_gerador" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-amber-700">Valor da Causa (R$)</label>
              <Input name="valor_causa" type="number" step="0.01" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-lg font-bold mb-2 text-amber-700">Descrição do Caso</label>
              <TextArea rows={7} name="descricao_caso" onChange={handleChange} required placeholder="Conte tudo que aconteceu..." />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'GERANDO PETIÇÃO...' : 'GERAR AGORA'}
          </Button>
        </form>

        {response && (
          <div className="mt-16">
            <LLMResponseArea
              title={`${getTitle()} - PETIÇÃO PRONTA`}
              content={response.texto_peticao}
              disclaimer={response.ethics.disclaimer}
            />
          </div>
        )}
      </FormWrapper>
    </Container>
  );
}