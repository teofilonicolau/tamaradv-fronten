// src/pages/forms/GenericProcessualCivilForm.tsx
import React, { useState, type ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProcessualCivilService } from '@/services/ProcessualCivilService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { ProcessualCivilInput, IProcessualCivilResponse } from '@/types/IProcessualCivil';
import type { AxiosError } from 'axios';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  padding: 4rem 1rem;
`;

const FormWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 2rem;
  padding: 4rem;
  box-shadow: 0 30px 100px rgba(79, 70, 229, 0.2);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #4f46e5, #7c3aed, #a855f7);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
  font-size: 1.1rem;
  &:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 5px rgba(124, 58, 237, 0.2); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #c7d2fe;
  border-radius: 1rem;
  font-size: 1.1rem;
  resize: vertical;
  &:focus { outline: none; border-color: #7c3aed; box-shadow: 0 0 0 5px rgba(124, 58, 237, 0.2); }
`;

const Button = styled.button`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to right, #4f46e5, #7c3aed, #a855f7);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.4s;
  &:hover:not(:disabled) { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(124, 58, 237, 0.7); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export default function GenericProcessualCivilForm() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IProcessualCivilResponse | null>(null);

  const [formData, setFormData] = useState<ProcessualCivilInput>({
    tipo_peticao: tipo || '',
    parte_contraria: '',
    cpf_cnpj_parte_contraria: '',
    descricao_pedido: '',
    valor_execucao: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result;

      if (tipo === 'execucao-titulo')
        result = await ProcessualCivilService.execucaoTitulo(formData);
      else if (tipo === 'monitoria')
        result = await ProcessualCivilService.monitoria(formData);
      else if (tipo === 'embargos-terceiro')
        result = await ProcessualCivilService.embargosTerceiro(formData);
      else if (tipo === 'impugnacao-cumprimento')
        result = await ProcessualCivilService.impugnacaoCumprimento(formData);
      else
        throw new Error('Tipo de petição não suportado');

      setResponse(result.data);
    } catch (error) {
      console.error('Erro na geração da petição:', error);

      const axiosError = error as AxiosError<{ detail?: Array<{ msg: string }> | string }>;
      const backendMsg = axiosError.response?.data?.detail;

      const msg = Array.isArray(backendMsg)
        ? backendMsg[0]?.msg
        : typeof backendMsg === 'string'
        ? backendMsg
        : 'Erro ao comunicar com o servidor. Tente novamente.';

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (tipo) {
      case 'execucao-titulo':
        return 'Execução de Título Extrajudicial';
      case 'monitoria':
        return 'Ação Monitória';
      case 'embargos-terceiro':
        return 'Embargos de Terceiro';
      case 'impugnacao-cumprimento':
        return 'Impugnação ao Cumprimento de Sentença';
      default:
        return 'Processual Civil';
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{getTitle()}</Title>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">
                Parte Contrária (Nome/Razão Social)
              </label>
              <Input
                name="parte_contraria"
                onChange={handleChange}
                required
                placeholder="Ex: João Silva ou Empresa XYZ Ltda"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">
                CPF/CNPJ da Parte Contrária
              </label>
              <Input
                name="cpf_cnpj_parte_contraria"
                onChange={handleChange}
                required
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
              />
            </div>

            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">
                Valor da Execução (R$)
              </label>
              <Input
                name="valor_execucao"
                type="number"
                step="0.01"
                min="0"
                onChange={handleChange}
                required
                placeholder="15000.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-lg font-bold mb-2 text-indigo-700">
                Descrição Completa do Pedido e dos Fatos
              </label>
              <TextArea
                name="descricao_pedido"
                onChange={handleChange}
                rows={8}
                required
                placeholder="Descreva com detalhes: origem da dívida, título executivo, fatos do processo, valores atualizados, provas, etc..."
              />
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'GERANDO PETIÇÃO...' : 'GERAR PETIÇÃO AGORA'}
          </Button>
        </form>

        {response && (
          <div className="mt-16">
            <LLMResponseArea
              title={`${getTitle()} - PETIÇÃO PRONTA`}
              content={response.texto_peticao || 'Petição gerada com sucesso, mas o conteúdo está vazio.'}
              disclaimer={response.ethics.disclaimer}
            />
          </div>
        )}
      </FormWrapper>
    </Container>
  );
}