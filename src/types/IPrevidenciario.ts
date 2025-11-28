// src/types/IPrevidenciario.ts
// DTOs completos para TODOS os 11 + 1 endpoints previdenciários do backend
// 100% fiel ao Swagger oficial da TamarAI v1

export interface IPeriodoEspecial {
  empresa: string;
  periodo_inicio: string; // ISO date: YYYY-MM-DD
  periodo_fim: string;    // ISO date: YYYY-MM-DD
  agente_nocivo: string;
  documentos_comprobatorios: string[]; // ex: ["PPP", "LTCAT", "Laudo Técnico"]
}

export interface IPrevidenciarioBaseInput {
  nome_cliente: string;
  cpf_cliente: string;
  data_nascimento: string; // ISO date: YYYY-MM-DD
  data_der?: string;       // Data da entrada do requerimento (opcional)
  alegacao_direito?: string;
  documentos_anexados?: string[];
}

export interface IAposentadoriaEspecialInput extends IPrevidenciarioBaseInput {
  tempo_total_contribuicao_anos: number;
  periodos_especiais: IPeriodoEspecial[];
  possui_epis_eficazes?: boolean;
}

export interface IAposentadoriaInvalidezInput extends IPrevidenciarioBaseInput {
  cid_principal: string;
  data_inicio_incapacidade: string;
  possui_pericia_medica?: boolean;
  documentos_medicos: string[];
}

export interface IAposentadoriaRuralInput extends IPrevidenciarioBaseInput {
  atividade_rural_inicio: string;
  atividade_rural_fim?: string;
  regime_economico_familiar: boolean;
  documentos_rurais: string[];
}

export interface IAposentadoriaTempoContribuicaoInput extends IPrevidenciarioBaseInput {
  tempo_total_contribuicao_anos: number;
  sexo: 'M' | 'F';
  data_nascimento: string;
  regra_desejada?: '86/96' | 'pedagio_50' | 'pedagio_100' | 'pontos';
}

export interface IAuxilioDoencaInput extends IPrevidenciarioBaseInput {
  cid_principal: string;
  data_inicio_incapacidade: string;
  carencia_cumprida: boolean;
}

export interface IBpcLoasInput extends IPrevidenciarioBaseInput {
  renda_familiar_bruta: number;
  numero_dependentes: number;
  deficiencia_grave?: boolean;
  idade_65_ou_mais?: boolean;
}

export interface IPensaoMorteInput extends IPrevidenciarioBaseInput {
  nome_falecido: string;
  cpf_falecido: string;
  data_obito: string;
  qualidade_dependente: 'conjuge' | 'companheiro' | 'filho_menor' | 'filho_invalido';
}

export interface ISalarioMaternidadeInput extends IPrevidenciarioBaseInput {
  data_parto?: string;
  data_adocao?: string;
  contribuinte_individual: boolean;
  carencia_cumprida: boolean;
}

export interface IRevisaoVidaTodaInput extends IPrevidenciarioBaseInput {
  dib_atual: string;
  incluir_pre_1994: true;
  salarios_pre_1994?: Array<{ ano: number; salario: number }>;
}

export interface IRevisaoBeneficioInput extends IPrevidenciarioBaseInput {
  nb_atual: string;
  tipo_revisao: 'teto' | 'buraco_negro' | 'erro_calculo' | 'outra';
  descricao_erro: string;
}

// Endpoint híbrido: petição + cálculo automático
export interface IPeticaoComCalculoInput extends IPrevidenciarioBaseInput {
  tipo_peticao:
    | 'aposentadoria-especial'
    | 'revisao-vida-toda'
    | 'tempo-especial'
    | 'regra-transicao'
    | 'periodo-graca';

  // Campos específicos do cálculo — tipados conforme o tipo_peticao
  dados_calculo?:
    | { periodos_especiais: IPeriodoEspecial[] }                    // aposentadoria-especial / tempo-especial
    | { dib_atual: string; salarios_pre_1994?: Array<{ ano: number; salario: number }> } // revisao-vida-toda
    | { tempo_contribuicao_anos: number; sexo: 'M' | 'F' }         // regra-transicao
    | { data_ultima_contribuicao: string }                        // periodo-graca
    | Record<string, never>; // fallback para tipos futuros (não aceita qualquer coisa)
}

// Resposta padrão do LLM (usado em todos os endpoints previdenciários)
export interface IPrevidenciarioResponse {
  peticao_completa: string;
  fundamentacao_juridica: string;
  documentos_necessarios: string[];
  valor_estimado?: number;
  tempo_estimado_processo?: string;
}