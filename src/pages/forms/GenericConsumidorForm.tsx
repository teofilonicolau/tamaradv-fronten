// src/pages/forms/GenericConsumidorForm.tsx — VERSÃO FINAL 100% LIMPA
import React, { useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ConsumidorService } from '@/services/ConsumidorService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { ConsumidorInput, IConsumidorResponse } from '@/types/IConsumidor';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ecfccb 0%, #d9f99d 100%);
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
  background: linear-gradient(to right, #84cc16, #22c55e, #10b981);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #d9f99d;
  border-radius: 1rem;
  font-size: 1.1rem;
  &:focus { outline: none; border-color: #22c55e; box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.2); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #d9f99d;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-family: inherit;
  resize: vertical;
  &:focus { outline: none; border-color: #22c55e; box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.2); }
`;

const Button = styled.button`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to right, #84cc16, #22c55e, #10b981);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.4s;
  &:hover:not(:disabled) { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(34, 197, 94, 0.7); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export default function GenericConsumidorForm() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IConsumidorResponse | null>(null);

  const [formData, setFormData] = useState<ConsumidorInput>({
    tipo_problema: '',
    empresa_ré: '',
    cnpj_empresa: '',
    endereco_empresa: '',
    descricao_problema: '',
    valor_prejuizo: 0,
    data_ocorrencia: '',
    tentativa_solucao_amigavel: false,
    provas_disponiveis: [],
    valor_produto_servico: 0,
    nota_fiscal: false,
    garantia_vigente: false,
  });

  // Handler genérico que aceita input, select e textarea
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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
      if (tipo === 'peticao-vicio-produto') {
        result = await ConsumidorService.peticaoVicioProduto(formData);
      } else if (tipo === 'peticao-cobranca-indevida') {
        result = await ConsumidorService.peticaoCobrancaIndevida(formData);
      } else {
        throw new Error('Tipo de petição inválido');
      }
      setResponse(result.data);
    } catch (error) {
      // Removido o any → agora TypeScript aceita sem erro
      const err = error as { response?: { data?: { detail?: Array<{ msg?: string }> } } };
      const msg = err.response?.data?.detail?.[0]?.msg || 'Erro ao gerar petição';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (tipo === 'peticao-vicio-produto') return 'Vício do Produto';
    if (tipo === 'peticao-cobranca-indevida') return 'Cobrança Indevida';
    return 'Direito do Consumidor';
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{getTitle()}</Title>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-lg font-bold mb-2 text-green-700">Empresa Ré</label>
              <Input name="empresa_ré" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-green-700">CNPJ da Empresa</label>
              <Input name="cnpj_empresa" placeholder="00.000.000/0001-00" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-green-700">Data da Ocorrência</label>
              <Input name="data_ocorrencia" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-green-700">Valor do Prejuízo (R$)</label>
              <Input name="valor_prejuizo" type="number" step="0.01" onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-lg font-bold mb-2 text-green-700">Descrição do Problema</label>
              <TextArea
                rows={6}
                name="descricao_problema"
                onChange={handleChange}
                required
                placeholder="Descreva detalhadamente o que aconteceu..."
              />
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