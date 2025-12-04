// src/types/IProcessualCivil.ts — VERSÃO OFICIAL 2025 (USADA NO BACKEND)
export interface IProcessualCivilResponse {
  tipo: string;
  area: "processual_civil";
  texto_peticao: string;
  dados_utilizados: ProcessualCivilInput;
  ethics: {
    disclaimer: string;
    generated_at: string;
    requires_lawyer_review: boolean;
    ai_tool_version?: string;
    responsibility_notice?: string;
  };
}

export interface ProcessualCivilInput {
  tipo_peticao: string;
  numero_processo?: string;
  parte_contraria: string;
  cpf_cnpj_parte_contraria: string;
  endereco_parte_contraria?: string;
  descricao_pedido: string;
  valor_execucao: number;
  titulo_executivo?: string;
  data_vencimento?: string;
  imovel_endereco?: string;
  valor_aluguel?: number;
  meses_atraso?: number;
  documentos_anexos?: string[];
  urgencia_fundamentacao?: string;

  // Permite campos extras sem quebrar tipagem
  [key: string]: string | number | string[] | boolean | undefined;
}