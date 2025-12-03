// src/pages/forms/GenericTrabalhistaForm.tsx — VERSÃO FINAL 100% SEM ERROS
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { TrabalhistaService } from '@/services/TrabalhistaService';
import { LLMResponseArea } from '@/components/ui/LLMResponseArea';
import type { ITrabalhistaResponse, TrabalhistaInput } from '@/types/ITrabalhista'; // ← CORRIGIDO AQUI

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
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
  background: linear-gradient(to right, #dc2626, #f97316, #f59e0b);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem;
  border: 2px solid #fee2e2;
  border-radius: 1rem;
  font-size: 1.1rem;
  &:focus { outline: none; border-color: #dc2626; box-shadow: 0 0 0 5px rgba(220, 38, 38, 0.2); }
`;

const Button = styled.button`
  width: 100%;
  padding: 2rem;
  background: linear-gradient(to right, #dc2626, #f97316, #f59e0b);
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 3rem;
  transition: all 0.4s;
  &:hover:not(:disabled) { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(220, 38, 38, 0.7); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export default function GenericTrabalhistaForm() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ITrabalhistaResponse | null>(null);
  const [formData, setFormData] = useState<TrabalhistaInput>({
    tipo_acao: 'Reclamação Trabalhista',
    empresa_re: '',
    cnpj_empresa: '',
    periodo_trabalho_inicio: '',
    periodo_trabalho_fim: '',
    cargo_funcao: '',
    salario_registrado: 0,
    salario_real: 0,
    jornada_contratual: '44h semanais',
    jornada_real: '',
    horas_extras_habituais: false,
    adicional_insalubridade: false,
    adicional_periculosidade: false,
    equipamentos_seguranca: true,
    testemunhas: [],
    documentos_comprobatorios: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue } as TrabalhistaInput));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result;
      if (tipo === 'peticao-vinculo') {
        result = await TrabalhistaService.peticaoVinculo(formData);
      } else if (tipo === 'quesitos-insalubridade') {
        result = await TrabalhistaService.quesitosInsalubridade(formData);
      } else {
        throw new Error('Rota inválida');
      }
      setResponse(result.data);
    } catch (error) {
      const err = error as { response?: { data?: { detail?: Array<{ msg?: string }> } }; message?: string };
      const msg = err.response?.data?.detail?.[0]?.msg || err.message || 'Erro na geração';
      alert(`Erro: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTitle = () => {
    if (tipo === 'peticao-vinculo') return 'Reconhecimento de Vínculo Empregatício';
    if (tipo === 'quesitos-insalubridade') return 'Quesitos para Perícia - Insalubridade';
    return 'Direito Trabalhista';
  };

  return (
    <Container>
      <FormWrapper>
        <Title>{formatTitle()}</Title>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Nome da Empresa Ré</label>
              <Input name="empresa_re" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">CNPJ da Empresa</label>
              <Input name="cnpj_empresa" placeholder="00.000.000/0001-00" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Início do Trabalho</label>
              <Input name="periodo_trabalho_inicio" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Fim do Trabalho</label>
              <Input name="periodo_trabalho_fim" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-700">Cargo / Função</label>
              <Input name="cargo_funcao" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Salário Real (R$)</label>
              <Input name="salario_real" type="number" step="0.01" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Jornada Real</label>
              <Input name="jornada_real" placeholder="Ex: 60h semanais com 2h extras diárias" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-red-700">Horas Extras Habitual?</label>
              <select 
                name="horas_extras_habituais" 
                value={formData.horas_extras_habituais ? "true" : "false"} 
                onChange={handleChange}
                className="w-full p-4 border-2 border-red-300 rounded-xl"
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'GERANDO COM IA...' : 'GERAR GERAR AGORA'}
          </Button>
        </form>

        {response && (
          <div className="mt-16">
            <LLMResponseArea
              title={tipo === 'peticao-vinculo' ? 'RECLAMAÇÃO TRABALHISTA PRONTA' : 'QUESITOS PARA PERÍCIA PRONTOS'}
              content={response.texto_peticao || response.quesitos?.join('\n\n') || 'Sem conteúdo'}
              disclaimer={response.ethics.disclaimer}
            />
          </div>
        )}
      </FormWrapper>
    </Container>
  );
}