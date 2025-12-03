// src/types/ITrabalhista.ts
export interface ITrabalhistaResponse {
  tipo: string;
  area: string;
  texto_peticao?: string;
  quesitos?: string[];
  total_quesitos?: number;
  ethics: {
    disclaimer: string;
    generated_at: string;
    requires_lawyer_review: boolean;
    ai_tool_version?: string;
    responsibility_notice?: string;
  };
}

export interface TrabalhistaInput {
  tipo_acao: string;
  empresa_re: string;
  cnpj_empresa: string;
  periodo_trabalho_inicio: string;
  periodo_trabalho_fim: string;
  cargo_funcao: string;
  salario_registrado: number;
  salario_real: number;
  jornada_contratual: string;
  jornada_real: string;
  horas_extras_habituais: boolean;
  adicional_insalubridade: boolean;
  adicional_periculosidade: boolean;
  equipamentos_seguranca: boolean;
  testemunhas: string[];
  documentos_comprobatorios: string[];

  // Campos extras que o advogado quiser adicionar (nome_cliente, comarca, etc)
  [key: string]: string | number | boolean | string[] | undefined;
}