// src/types/ILLM.ts

export interface IEthicsDisclaimer {
  disclaimer: string;
  generated_at: string;
  requires_lawyer_review: boolean;
  ai_tool_version?: string;
  responsibility_notice?: string; // ← Agora opcional (realidade do backend)
}

export type StructuredData = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Date
    | string[]
    | StructuredData
    | StructuredData[];
};

export interface ILLMResponse {
  tipo: string;
  area: AreaJuridica;
  texto_peticao?: string;
  resposta?: string;
  consulta?: string;
  parecer?: string;
  analise?: string;
  resultado?: string;
  dados_utilizados?: StructuredData;
  ethics: IEthicsDisclaimer;
  status: 'success' | 'error' | 'warning';
}

export type AreaJuridica =
  | 'previdenciario'
  | 'trabalhista'
  | 'consumidor'
  | 'civil'
  | 'processual-civil'
  | 'geral';

export interface IConsultaInput {
  texto: string;
  area?: AreaJuridica;
  contexto_adicional?: string;
}

export interface IConsultaJuridicaInput extends IConsultaInput {
  firm_name?: string;
  lawyer_name?: string;
  signature_text?: string;
  ai_persona?: string;
}

export interface IPeticaoPayload {
  area: AreaJuridica;
  tipo_peticao: string;
  [key: string]: string | number | boolean | null | string[] | StructuredData | undefined;
}