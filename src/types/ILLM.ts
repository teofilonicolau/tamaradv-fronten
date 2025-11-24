// arquivo: src/types/ILLM.ts
// Interface base para o retorno de Petições e Consultas (estilo Gemini)
export interface IEthicsDisclaimer {
  disclaimer: string;
  requires_lawyer_review: boolean;
  responsibility_notice: string;
}

export interface ILLMResponse {
  tipo: string;
  area: string;
  texto_peticao?: string; // para Petições
  resposta?: string; // para Consultas
  resultado?: string; // para Análise de Texto
  ethics: IEthicsDisclaimer;
  status: string;
}

export interface IConsultaInput {
  pergunta: string;
  area: "geral" | "previdenciario" | "trabalhista";
  firm_name: string;
  lawyer_name: string;
  signature_text: string;
  ai_persona: string;
}