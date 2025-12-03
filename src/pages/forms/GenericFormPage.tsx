// src/pages/forms/GenericFormPage.tsx — VERSÃO FINAL 100% SEM ERROS
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
  max-width: 1200px;
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
  &:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2); }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.3rem;
  border: 2px solid #e0e7ff;
  border-radius: 1rem;
  font-size: 1.1rem;
  min-height: 180px;
  resize: vertical;
  &:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2); }
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
  &:hover:not(:disabled) { transform: translateY(-10px); box-shadow: 0 40px 80px rgba(139, 92, 246, 0.7); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

export default function GenericFormPage() {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<IPrevidenciarioResponse | null>(null);
  const [formData, setFormData] = useState<PrevidenciarioInput>({
    atividade_especial: false,
    justica_gratuita: true,
    tutela_antecipada: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name === 'atividade_especial') {
      setFormData(prev => ({ ...prev, [name]: value === 'true' }));
    } else {
      const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      setFormData(prev => ({ ...prev, [name]: finalValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result;

      switch (tipo) {
        case 'aposentadoria-especial':
          result = await PrevidenciarioService.aposEspecial(formData);
          break;
        case 'aposentadoria-invalidez':
          result = await PrevidenciarioService.aposInvalidez(formData);
          break;
        case 'aposentadoria-rural':
          result = await PrevidenciarioService.aposRural(formData);
          break;
        case 'aposentadoria-tempo-contribuicao':
          result = await PrevidenciarioService.aposTempoContribuicao(formData);
          break;
        case 'auxilio-doenca':
          result = await PrevidenciarioService.auxilioDoenca(formData);
          break;
        case 'salario-maternidade':
          result = await PrevidenciarioService.salarioMaternidade(formData);
          break;
        case 'pensao-morte':
          result = await PrevidenciarioService.pensaoMorte(formData);
          break;
        case 'bpc-loas':
          result = await PrevidenciarioService.bpcLoas(formData);
          break;
        case 'revisao-vida-toda':
          result = await PrevidenciarioService.revisaoVidaToda(formData);
          break;
        case 'revisao-beneficio':
          result = await PrevidenciarioService.revisaoBeneficio(formData);
          break;
        default:
          throw new Error('Tipo de petição não encontrado');
      }

      setResponse(result.data);
    } catch (error) {
      const err = error as { response?: { data?: { detail?: Array<{ msg?: string }> } }; message?: string };
      const msg = err.response?.data?.detail?.[0]?.msg || err.message || 'Erro ao gerar petição';
      alert(`Erro: ${msg}`);
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
        <Title>{formatTitle(tipo || 'Petição Previdenciária')}</Title>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* DADOS PESSOAIS */}
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Nome Completo</label>
              <Input name="nome" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">CPF (11 dígitos)</label>
              <Input name="cpf" onChange={handleChange} maxLength={11} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">RG</label>
              <Input name="rg" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Órgão Emissor</label>
              <Input name="orgao_emissor" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Data de Nascimento</label>
              <Input name="data_nascimento" type="date" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Telefone</label>
              <Input name="telefone" onChange={handleChange} />
            </div>
            <div className="col-span-2">
              <label className="block text-lg font-bold mb-2 text-indigo-700">Endereço Completo</label>
              <Input name="endereco_completo" onChange={handleChange} required />
            </div>

            {/* DADOS DO BENEFÍCIO */}
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Tipo do Benefício</label>
              <Input name="tipo_beneficio" onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Número do Benefício</label>
              <Input name="numero_beneficio" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">DIB</label>
              <Input name="dib" type="date" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">DER</label>
              <Input name="der" type="date" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Processo Administrativo</label>
              <Input name="numero_processo_administrativo" onChange={handleChange} />
            </div>
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Motivo da Recusa</label>
              <Input name="motivo_recusa" onChange={handleChange} />
            </div>

            {/* ATIVIDADE ESPECIAL — CORRIGIDO AQUI */}
            <div>
              <label className="block text-lg font-bold mb-2 text-indigo-700">Atividade Especial?</label>
              <select
                name="atividade_especial"
                value={formData.atividade_especial ? "true" : "false"}
                onChange={handleChange}
                className="w-full p-4 border-2 border-indigo-300 rounded-xl focus:border-purple-500 transition"
              >
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>

            {/* AQUI ESTAVA O ERRO — AGORA 100% SEGURO */}
            {formData.atividade_especial === true && (
              <div className="col-span-2">
                <label className="block text-lg font-bold mb-2 text-indigo-700">
                  Agentes Nocivos (ruído, calor, químicos, etc)
                </label>
                <TextArea
                  name="exposicao_agentes_nocivos"
                  onChange={handleChange}
                  rows={4}
                  placeholder="Ex: Ruído 90dB sem proteção eficaz, exposição a benzeno, calor acima de 28ºC..."
                />
              </div>
            )}

            <div className="col-span-2">
              <label className="block text-lg font-bold mb-2 text-indigo-700">CID Principal</label>
              <Input name="cid_principal" onChange={handleChange} />
            </div>

            <div className="col-span-2">
              <label className="block text-lg font-bold mb-2 text-indigo-700">Informações Médicas e Histórico</label>
              <TextArea name="informacoes_medicas" onChange={handleChange} rows={6} />
            </div>

            <div className="col-span-2">
              <label className="block text-lg font-bold mb-2 text-indigo-700">Comarca / Cidade / UF</label>
              <div className="grid grid-cols-3 gap-4">
                <Input name="comarca" placeholder="Comarca" onChange={handleChange} />
                <Input name="cidade_comarca" placeholder="Cidade" onChange={handleChange} />
                <Input name="estado_comarca" placeholder="UF" onChange={handleChange} />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'GERANDO PETIÇÃO COM IA...' : 'GERAR PETIÇÃO JURÍDICA AGORA'}
          </Button>
        </form>

        {response && (
          <div className="mt-16">
            <LLMResponseArea
              title="PETIÇÃO GERADA COM SUCESSO"
              content={response.peticao_completa}
              disclaimer={response.ethics.disclaimer}
            />
          </div>
        )}
      </FormWrapper>
    </Container>
  );
}