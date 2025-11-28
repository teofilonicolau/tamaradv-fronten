import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PrevidenciarioService } from '../../services/PrevidenciarioService';
import { GeneralService } from '../../services/GeneralService';
import { LLMResponseArea } from '../../components/features/LLMResponseArea';
import { ILLMResponse } from '../../types/ILLM';

const FormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;

  &:disabled {
    background-color: #ccc;
  }
`;

interface GenericFormProps {
  area: 'previdenciario' | 'trabalhista' | 'consumidor' | 'civil' | 'processual';
}

const GenericFormPage: React.FC<GenericFormProps> = ({ area }) => {
  const { tipo } = useParams<{ tipo: string }>();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ILLMResponse | null>(null);
  
  // Estado inicial genérico (pode ser refinado com schemas específicos)
  const [formData, setFormData] = useState<any>({});

  // Lista de campos essenciais (simplificado para demonstração dinâmica)
  // Em produção, você pode ter schemas específicos para cada tipo
  const commonFields = [
    'nome', 'cpf', 'rg', 'endereco_completo', 'telefone', 
    'parte_contraria', 'cpf_cnpj_parte_contraria', 'descricao_caso', 'valor_causa'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      let result;
      
      // Roteamento Dinâmico para o Serviço Correto
      if (area === 'previdenciario') {
         // Mapeamento manual para métodos do PrevidenciarioService
         if (tipo === 'peticao-aposentadoria-especial') result = await PrevidenciarioService.aposentadoriaEspecial(formData);
         else if (tipo === 'peticao-auxilio-doenca') result = await PrevidenciarioService.auxilioDoenca(formData);
         else if (tipo === 'peticao-bpc-loas') result = await PrevidenciarioService.bpcLoas(formData);
         // ... adicione outros cases conforme necessário ou use any para método dinâmico
         else result = await PrevidenciarioService.aposentadoriaTempoContribuicao(formData); // fallback
      } 
      else if (area === 'trabalhista') {
        if (tipo === 'peticao-vinculo') result = await GeneralService.trabalhista.vinculo(formData);
        else result = await GeneralService.trabalhista.quesitos(formData);
      }
      else if (area === 'consumidor') {
        if (tipo === 'peticao-cobranca-indevida') result = await GeneralService.consumidor.cobrancaIndevida(formData);
        else result = await GeneralService.consumidor.vicioProduto(formData);
      }
      else if (area === 'civil') {
        if (tipo === 'peticao-cobranca') result = await GeneralService.civil.cobranca(formData);
        else result = await GeneralService.civil.indenizacao(formData);
      }
      else if (area === 'processual') {
        if (tipo === 'peticao-execucao') result = await GeneralService.processual.execucao(formData);
        else result = await GeneralService.processual.monitoria(formData);
      }

      setResponse(result?.data || result); // Ajuste dependendo se o axios retorna data direto
    } catch (error) {
      alert('Erro ao gerar petição. Verifique os dados.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nova Petição: {tipo?.replace(/-/g, ' ').toUpperCase()}</h2>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          {/* Renderização Dinâmica de Campos Comuns */}
          {commonFields.map((field) => (
            <FormGroup key={field}>
              <Label>{field.replace(/_/g, ' ')}</Label>
              {field.includes('descricao') ? (
                <TextArea name={field} onChange={handleChange} required />
              ) : (
                <Input type={field.includes('valor') ? 'number' : 'text'} name={field} onChange={handleChange} />
              )}
            </FormGroup>
          ))}

          {/* Campo Extra Genérico para inputs que não estão na lista comum */}
          <p style={{marginTop: 20, fontStyle: 'italic', fontSize: '0.9rem'}}>
            * Preencha os campos acima. A IA utilizará os dados para estruturar a petição.
          </p>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Gerando Petição com IA...' : 'Gerar Petição'}
          </SubmitButton>
        </form>
      </FormContainer>

      {response && (
        <LLMResponseArea 
          title={`Resultado: ${tipo}`}
          generatedText={response.texto_peticao || response.resposta || "Sem texto gerado."}
          disclaimer={response.ethics}
        />
      )}
    </div>
  );
};

export default GenericFormPage;