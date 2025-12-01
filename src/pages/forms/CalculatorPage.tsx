// src/pages/forms/CalculatorPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CalculatorService } from '../../services/CalculatorService';
import { CalculationCard } from '../../components/features/CalculationCard';

// ====================== ESTILOS ======================
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 1rem;
`;

const Content = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.primary}20;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 1rem;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px ${({ theme }) => theme.colors.primary}40;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ====================== TIPOS ======================
// Dados comuns a quase todas as calculadoras
interface BaseFormData {
  valor?: string;
  data_inicial?: string;
  data_final?: string;
  indice?: string;
  // Você pode ir adicionando mais campos conforme precisar (taxa, periodo, etc)
  [key: string]: string | undefined;
}

// Tipo genérico para resposta da API (ajuste conforme sua API real)
interface CalculationResponse {
  calculo?: Record<string, unknown>;
  resultado?: string;
  [key: string]: unknown;
}

// ====================== COMPONENTE ======================
const CalculatorPage: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const [formData, setFormData] = useState<BaseFormData>({});
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);

    try {
      let response: { data: CalculationResponse };

      switch (tipo) {
        case 'correcao-monetaria':
          response = await CalculatorService.correcaoMonetaria(formData);
          break;
        case 'juros-mora':
          response = await CalculatorService.jurosMora(formData);
          break;
        case 'tempo-especial':
          response = await CalculatorService.tempoEspecial(formData);
          break;
        case 'revisao-vida-toda':
          response = await CalculatorService.revisaoVidaToda(formData);
          break;
        case 'horas-extras':
          response = await CalculatorService.horasExtras(formData);
          break;
        default:
          alert('Calculadora ainda não implementada');
          setLoading(false);
          return;
      }

      // Normaliza a resposta para o CalculationCard
      const normalizedResult = response.data.calculo ?? response.data ?? { resultado: 'Sucesso' };
      setResult(normalizedResult);
    } catch (error) {
      console.error(error);
      alert('Erro ao calcular. Verifique os campos.');
    } finally {
      setLoading(false);
    }
  };

  const title = tipo
    ? tipo
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Calculadora';

  return (
    <PageContainer>
      <Content>
        <Title>{title}</Title>
        <Subtitle>Preencha os campos necessários para o cálculo</Subtitle>

        <FormContainer>
          <FormGroup>
            <Label>Valor Principal (R$)</Label>
            <Input
              name="valor"
              type="number"
              step="0.01"
              onChange={handleChange}
              placeholder="50000.00"
            />
          </FormGroup>

          <FormGroup>
            <Label>Data Inicial</Label>
            <Input name="data_inicial" type="date" onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Data Final / Vencimento</Label>
            <Input name="data_final" type="date" onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <Label>Índice / Taxa (ex: INPC, SELIC)</Label>
            <Input name="indice" type="text" onChange={handleChange} placeholder="INPC" />
          </FormGroup>

          <Button onClick={handleCalculate} disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular Agora'}
          </Button>
        </FormContainer>

        {result && <CalculationCard data={result} title={title} />}
      </Content>
    </PageContainer>
  );
};

export default CalculatorPage;