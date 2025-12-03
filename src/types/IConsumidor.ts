// src/types/IConsumidor.ts
export interface IConsumidorResponse {
  tipo: string;
  area: "consumidor";
  texto_peticao: string;
  dados_utilizados: ConsumidorInput;
  ethics: {
    disclaimer: string;
    generated_at: string;
    requires_lawyer_review: boolean;
    ai_tool_version?: string;
    responsibility_notice?: string;
  };
}

export interface ConsumidorInput {
  tipo_problema: string;
  empresa_ré: string;
  cnpj_empresa: string;
  endereco_empresa?: string;
  descricao_problema: string;
  valor_prejuizo: number;
  data_ocorrencia: string; // YYYY-MM-DD
  tentativa_solucao_amigavel: boolean;
  provas_disponiveis?: string[];
  valor_produto_servico: number;
  nota_fiscal: boolean;
  garantia_vigente: boolean;

  // Campos extras que o advogado quiser adicionar
  [key: string]: string | number | boolean | string[] | undefined;
}