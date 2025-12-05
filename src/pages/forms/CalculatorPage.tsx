// src/pages/forms/CalculatorPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CalculatorService } from '@/services/CalculatorService';
import { CalculationCard } from '@/components/ui/CalculationCard';
import type { GenericCalcResult } from '@/types/CalculatorResults';
import type { CalculatorField, CalculatorFormData } from '@/types/CalculatorForms';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 1.5rem;
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(to right, #4f46e5, #7c3aed, #ec4899);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Form = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 25px 100px rgba(0,0,0,0.15);
  border: 1px solid #e0e7ff;
  
  @media (prefers-color-scheme: dark) {
    background: #1f2937;
    border-color: #374151;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 1.5rem;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #4338ca;
  
  @media (prefers-color-scheme: dark) {
    color: #a78bfa;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 2px solid #e0e7ff;
  background: white;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background: #374151;
    border-color: #4b5563;
    color: white;
    
    &:focus {
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 2.5rem;
  padding: 1.25rem 2rem;
  background: linear-gradient(to right, #4f46e5, #7c3aed);
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 0.5rem;
  font-weight: 500;
  
  @media (prefers-color-scheme: dark) {
    background: #7f1d1d;
    border-color: #dc2626;
    color: #fca5a5;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

// Mapeamento dos campos por calculadora
const camposPorCalculadora: Record<string, CalculatorField[]> = {
  'tempo-especial': [
    { label: 'Tempo Rural (meses)', name: 'tempo_rural', type: 'number' },
    { label: 'Tempo Urbano (meses)', name: 'tempo_urbano', type: 'number' },
    { label: 'Tempo Especial (meses)', name: 'tempo_especial', type: 'number' },
    { label: 'Início da Atividade Especial', name: 'data_inicio_especial', type: 'date' },
  ],
  'revisao-vida-toda': [
    { label: 'Salários antes de 07/1994 (separados por vírgula)', name: 'salarios_antes_1994', type: 'text', placeholder: '3000,4500,5200' },
    { label: 'Salários após 07/1994 (separados por vírgula)', name: 'salarios_depois_1994', type: 'text', placeholder: '6000,7000,8000' },
    { label: 'Data da DIB', name: 'data_dib', type: 'date' },
  ],
  'periodo-graca': [
    { label: 'Tipo de Segurado', name: 'tipo_segurado', type: 'text', placeholder: 'Empregado, Autônomo, Facultativo...' },
    { label: 'Última Contribuição', name: 'ultima_contribuicao', type: 'date' },
  ],
  'regra-transicao-ec103': [
    { label: 'Sexo', name: 'sexo', type: 'text', placeholder: 'M ou F' },
    { label: 'Idade Atual', name: 'idade_atual', type: 'number' },
    { label: 'Tempo Atual (meses)', name: 'tempo_contribuicao_atual', type: 'number' },
    { label: 'Tempo em 13/11/2019 (meses)', name: 'tempo_contribuicao_em_13_11_2019', type: 'number' },
  ],
  'horas-extras': [
    { label: 'Jornada Contratual (h/dia)', name: 'jornada_contratual', type: 'number' },
    { label: 'Jornada Real (h/dia)', name: 'jornada_real', type: 'number' },
    { label: 'Dias Trabalhados no Mês', name: 'dias_trabalhados', type: 'number' },
    { label: 'Valor da Hora Normal (R$)', name: 'valor_hora', type: 'number', placeholder: '50.00' },
  ],
  'verbas-rescisorias': [
    { label: 'Salário Bruto (R$)', name: 'salario', type: 'number' },
    { label: 'Data de Admissão', name: 'data_admissao', type: 'date' },
    { label: 'Data de Rescisão', name: 'data_rescisao', type: 'date' },
    { label: 'Tipo de Rescisão', name: 'tipo_rescisao', type: 'text', placeholder: 'sem_justa_causa, pedido_demissao, justa_causa' },
  ],
  'adicional-noturno': [
    { label: 'Salário Base (R$)', name: 'salario_base', type: 'number' },
    { label: 'Horas Noturnas por Dia', name: 'horas_noturnas', type: 'number' },
    { label: 'Dias Trabalhados no Mês', name: 'dias_trabalhados', type: 'number' },
  ],
  'pensao-alimenticia': [
    { label: 'Renda do Alimentante (R$)', name: 'renda_alimentante', type: 'number' },
    { label: 'Número de Filhos', name: 'numero_filhos', type: 'number' },
    { label: 'Percentual Sugerido (%)', name: 'percentual_sugerido', type: 'number', placeholder: '30' },
  ],
  'valor-causa': [
    { label: 'Parcelas Vencidas (R$)', name: 'parcelas_vencidas', type: 'number' },
    { label: 'Valor Mensal da Parcela (R$)', name: 'valor_mensal', type: 'number' },
  ],
  'liquidacao-sentenca': [
    { label: 'Valor Principal (R$)', name: 'valor_principal', type: 'number' },
    { label: 'Data da Sentença', name: 'data_sentenca', type: 'date' },
    { label: 'Incluir Honorários?', name: 'incluir_honorarios', type: 'checkbox' },
  ],
  'juros-mora': [
    { label: 'Valor Principal (R$)', name: 'valor_principal', type: 'number' },
    { label: 'Data de Vencimento', name: 'data_vencimento', type: 'date' },
    { label: 'Taxa Mensal (%)', name: 'taxa_mensal', type: 'number', placeholder: '1 para 1%' },
  ],
  'correcao-monetaria': [
    { label: 'Valor Original (R$)', name: 'valor', type: 'number' },
    { label: 'Data Inicial', name: 'data_inicial', type: 'date' },
    { label: 'Índice', name: 'indice', type: 'text', placeholder: 'INPC, IPCA ou IGP-M' },
  ],
};

// Mapeamento dos serviços
const serviceMapping: Record<string, keyof typeof CalculatorService> = {
  'tempo-especial': 'tempoEspecial',
  'revisao-vida-toda': 'revisaoVidaToda',
  'periodo-graca': 'periodoGraca',
  'regra-transicao-ec103': 'regraTransicaoEC103',
  'horas-extras': 'horasExtras',
  'verbas-rescisorias': 'verbasRescisorias',
  'adicional-noturno': 'adicionalNoturno',
  'pensao-alimenticia': 'pensaoAlimenticia',
  'valor-causa': 'valorCausa',
  'liquidacao-sentenca': 'liquidacaoSentenca',
  'juros-mora': 'jurosMora',
  'correcao-monetaria': 'correcaoMonetaria',
};

export default function CalculatorPage() {
  const { tipo } = useParams<{ tipo: string }>();
  const [formData, setFormData] = useState<CalculatorFormData>({});
  const [result, setResult] = useState<GenericCalcResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const campos = camposPorCalculadora[tipo || ''] || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const processFormData = (data: CalculatorFormData, calculatorType: string): CalculatorFormData => {
    const processedData = { ...data };
    
    // Tratamento especial para arrays na revisão da vida toda
    if (calculatorType === 'revisao-vida-toda') {
      if (typeof data.salarios_antes_1994 === 'string') {
        processedData.salarios_antes_1994 = data.salarios_antes_1994
          .split(',')
          .map(s => parseFloat(s.trim()))
          .filter(n => !isNaN(n));
      }
      if (typeof data.salarios_depois_1994 === 'string') {
        processedData.salarios_depois_1994 = data.salarios_depois_1994
          .split(',')
          .map(s => parseFloat(s.trim()))
          .filter(n => !isNaN(n));
      }
    }

    return processedData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipo) return;

    setLoading(true);
    setError(null);
    
    try {
      const serviceName = serviceMapping[tipo];
      if (!serviceName) {
        throw new Error('Calculadora não encontrada');
      }

      const service = CalculatorService[serviceName];
      if (!service) {
        throw new Error('Serviço não disponível');
      }

      const processedData = processFormData(formData, tipo);
      
      // Chamada tipada para o serviço
      const response = await service(processedData as never);
      
      // CORREÇÃO: Usar 'calculo' ao invés de 'resultado'
      setResult(response.data.calculo);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular. Verifique os dados.';
      setError(errorMessage);
      console.error('Erro na calculadora:', err);
    } finally {
      setLoading(false);
    }
  };

  const titulo = tipo
    ? tipo.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join(' ')
    : 'Calculadora';

  if (!tipo || campos.length === 0) {
    return (
      <PageContainer>
        <Content>
          <Title>Calculadora não encontrada</Title>
          <div style={{ textAlign: 'center', color: 'white', fontSize: '1.125rem' }}>
            <p>A calculadora solicitada não está disponível.</p>
          </div>
        </Content>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Content>
        <Title>{titulo}</Title>
        
        <Form onSubmit={handleSubmit}>
          <div>
            {campos.map(campo => (
              <InputGroup key={campo.name}>
                <Label htmlFor={campo.name}>
                  {campo.label}
                </Label>
                <Input
                  id={campo.name}
                  type={campo.type}
                  name={campo.name}
                  value={
                    campo.type === 'checkbox' 
                      ? undefined 
                      : (formData[campo.name] as string | number) || ''
                  }
                  checked={
                    campo.type === 'checkbox' 
                      ? (formData[campo.name] as boolean) || false 
                      : undefined
                  }
                  onChange={handleChange}
                  required
                  placeholder={campo.placeholder}
                />
              </InputGroup>
            ))}
          </div>

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <SubmitButton
            type="submit"
            disabled={loading}
          >
            {loading ? 'Calculando...' : 'CALCULAR AGORA'}
          </SubmitButton>
        </Form>

        {result && (
          <ResultContainer>
            <CalculationCard title={`Resultado - ${titulo}`} data={result} />
          </ResultContainer>
        )}
      </Content>
    </PageContainer>
  );
}