// src/types/IPrevidenciario.ts
export interface IPrevidenciarioResponse {
  peticao_completa: string;
  fundamentacao_juridica: string;
  documentos_necessarios: string[];
  valor_estimado?: number;
  tempo_estimado_processo?: string;
  ethics: {
    disclaimer: string;
  };
}

// Input genérico SEM any → usamos unknown + index signature segura
export type PrevidenciarioInput = {
  nome_cliente?: string;
  cpf_cliente?: string;
  data_nascimento?: string;
  data_der?: string;
  numero_beneficio?: string;
  descricao_caso?: string;
  valor_causa?: string | number;
  comarca?: string;

  // Campos específicos (todos opcionais)
  cid_principal?: string;
  data_inicio_incapacidade?: string;
  tempo_total_contribuicao_anos?: number | string;
  periodos_especiais?: Record<string, unknown>[];
  sexo?: 'M' | 'F';
  dib_atual?: string;
  incluir_pre_1994?: boolean;
  renda_familiar_bruta?: number;
  nome_falecido?: string;
  data_obito?: string;
  qualidade_dependente?: string;
  nb_atual?: string;
  tipo_revisao?: string;
  descricao_erro?: string;

  // Permite qualquer campo extra que o advogado digitar
  [key: string]: unknown;
};