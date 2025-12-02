// src/types/ILLM.ts ← VERSÃO OFICIAL 2025 — TIPO-SEGURA, ESCALÁVEL E PERFEITA
export type AreaJuridica =
  | 'geral'
  | 'previdenciario'
  | 'trabalhista'
  | 'civil'
  | 'consumidor'
  | 'processual-civil';

// Interface principal da resposta da IA — 100% type-safe, sem any
export interface ILLMResponse {
  // Campos comuns a várias rotas
  resposta?: string;
  pergunta?: string;
  area_consultada?: string;

  resultado?: string;
  texto_original?: string;
  tipo_analise?: string;
  palavras?: number;
  caracteres?: number;

  relatorio?: string;
  parecer?: string;
  titulo?: string;
  incluiu_jurisprudencia?: boolean;

  // Metadados do sistema
  escritorio?: string;
  modelo: string;
  tokens_usados: number;
  status: 'success' | 'error' | 'warning';

  // Permite campos extras do backend sem usar "any"
  // unknown é o mais seguro: força type guard quando for usar
  [key: string]: unknown;
}

// ====================== INPUTS EXATOS DO BACKEND ======================

export interface IConsultaInput {
  pergunta: string;
  area?: AreaJuridica;
  firm_name?: string;
  lawyer_name?: string;
  signature_text?: string;
  ai_persona?: string;
}

export interface IAnaliseInput {
  texto: string;
  tipo_analise?: 'resumo' | 'extrair_informacoes' | 'risco' | 'contrato';
  firm_name?: string;
  lawyer_name?: string;
  signature_text?: string;
  ai_persona?: string;
}

export interface IParecerInput {
  titulo: string;
  conteudo: string;
  area?: AreaJuridica;
  incluir_jurisprudencia?: boolean;
  firm_name?: string;
  lawyer_name?: string;
  signature_text?: string;
  ai_persona?: string;
}

// ====================== TIPOS AUXILIARES (OPCIONAIS) ======================

// Se quiser ainda mais segurança ao acessar campos dinâmicos:
export type LLMResponseField = keyof ILLMResponse;

// Para extrair apenas os campos de texto (útil no LLMResponseArea)
export type LLMTextContent = 
  | ILLMResponse['resposta']
  | ILLMResponse['resultado']
  | ILLMResponse['relatorio']
  | ILLMResponse['parecer']
  | string;