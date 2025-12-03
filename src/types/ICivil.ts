// src/types/ICivil.ts
export interface ICivilResponse {
  tipo: string;
  area: "civil";
  texto_peticao: string;
  dados_utilizados: CivilInput;
  ethics: {
    disclaimer: string;
    generated_at: string;
    requires_lawyer_review: boolean;
  };
}

export interface CivilInput {
  tipo_acao: string;
  parte_contraria: string;
  cpf_cnpj_parte_contraria: string;
  endereco_parte_contraria?: string;
  descricao_caso: string;
  valor_causa: number;
  data_fato_gerador: string; // YYYY-MM-DD
  documentos_comprobatorios?: string[];
  tentativa_acordo_extrajudicial: boolean;
  urgencia_caso: boolean;
  valor_divida?: number;
  valor_danos_materiais?: number;
  valor_danos_morais?: number;
  regime_casamento?: string;
  filhos_menores?: boolean;
  bens_inventario?: string[];

  // Campos extras que o advogado quiser
  [key: string]: string | number | boolean | string[] | undefined;
}