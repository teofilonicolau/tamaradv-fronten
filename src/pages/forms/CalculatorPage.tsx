// src/pages/forms/CalculatorPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CalculatorService } from '../../services/CalculatorService';
import { CalculationCard } from '../../components/ui/CalculationCard';
import type {
  ICorrecaoMonetariaInput,
  IJurosMoraInput,
  ITempoEspecialInput,
  IRevisaoVidaTodaInput,
  IHorasExtrasInput,
} from '../../types/ICalculator';
import type { GenericCalcResult } from '../../types/CalculatorResults';

// ====================== ESTILOS ======================
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 4rem 1rem;
`;

const Content = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBackground};
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 1rem;
  font-size: 1.1rem;
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 5px ${({ theme }) => theme.colors.primary}20;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1.4rem;
  margin-top: 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: bold;
  font-size: 1.4rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.primary}50;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ====================== COMPONENTE ======================
const CalculatorPage: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<GenericCalcResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setResult(null);

    try {
      switch (tipo) {
        case 'correcao-monetaria': {
          const { data } = await CalculatorService.correcaoMonetaria(
            formData as unknown as ICorrecaoMonetariaInput
          );
          setResult(data.calculo);
          break;
        }
        case 'juros-mora': {
          const { data } = await CalculatorService.jurosMora(
            formData as unknown as IJurosMoraInput
          );
          setResult(data.calculo);
          break;
        }
        case 'tempo-especial': {
          const { data } = await CalculatorService.tempoEspecial(
            formData as unknown as ITempoEspecialInput
          );
          setResult(data.calculo);
          break;
        }
        case 'revisao-vida-toda': {
          const { data } = await CalculatorService.revisaoVidaToda(
            formData as unknown as IRevisaoVidaTodaInput
          );
          setResult(data.calculo);
          break;
        }
        case 'horas-extras': {
          const { data } = await CalculatorService.horasExtras(
            formData as unknown as IHorasExtrasInput
          );
          setResult(data.calculo);
          break;
        }
        default:
          alert('Calculadora em desenvolvimento');
          setLoading(false);
          return;
      }
    } catch (error) {
      console.error('Erro na calculadora:', error);
      alert('Erro ao realizar cálculo. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  const title = tipo
    ? tipo.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'Calculadora';

  return (
    <PageContainer>
      <Content>
        <Title>{title}</Title>

        <FormContainer>
          <div className="grid gap-6">
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Valor Principal (R$)
              </label>
              <Input
                name="valor"
                type="number"
                step="0.01"
                onChange={handleChange}
                placeholder="50.000,00"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Data Inicial
              </label>
              <Input name="data_inicial" type="date" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Data Final
              </label>
              <Input name="data_final" type="date" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Índice / Taxa
              </label>
              <Input
                name="indice"
                type="text"
                onChange={handleChange}
                placeholder="INPC, SELIC..."
              />
            </div>
          </div>

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
