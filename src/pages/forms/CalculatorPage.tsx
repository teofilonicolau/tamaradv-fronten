import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CalculatorService } from '../../services/CalculatorService';
import { CalculationCard } from '../../components/features/CalculationCard';

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  width: 100%;
  font-weight: bold;
  margin-top: 10px;
`;

const CalculatorPage: React.FC = () => {
  const { tipo } = useParams<{ tipo: string }>();
  const [formData, setFormData] = useState<any>({});
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = async () => {
    try {
      let res;
      // Mapeamento simples de calculadora
      switch(tipo) {
        case 'correcao-monetaria':
          res = await CalculatorService.correcaoMonetaria(formData);
          break;
        case 'juros-mora':
          res = await CalculatorService.jurosMora(formData);
          break;
        case 'tempo-especial':
          res = await CalculatorService.tempoEspecial(formData);
          break;
        // Adicione os outros cases aqui...
        default:
          alert('Calculadora não implementada nesta demo.');
          return;
      }
      setResult(res.data.calculo);
    } catch (err) {
      alert('Erro ao calcular. Verifique os valores.');
    }
  };

  return (
    <div>
      <h2>Calculadora: {tipo?.replace(/-/g, ' ')}</h2>
      <FormContainer>
        {/* Inputs genéricos para demonstração - Ajuste conforme o DTO da calculadora */}
        <FormGroup>
          <Label>Valor / Tempo</Label>
          <Input name="valor" type="number" onChange={handleChange} placeholder="Digite o valor ou tempo" />
        </FormGroup>
        <FormGroup>
          <Label>Data Inicial / Início</Label>
          <Input name="data_inicial" type="date" onChange={handleChange} />
        </FormGroup>
         <FormGroup>
          <Label>Índice / Taxa (se aplicável)</Label>
          <Input name="indice" type="text" onChange={handleChange} placeholder="Ex: INPC" />
        </FormGroup>
        
        <Button onClick={handleCalculate}>Calcular Agora</Button>
      </FormContainer>

      {result && <CalculationCard data={result} title="Resultado do Cálculo" />}
    </div>
  );
};

export default CalculatorPage;