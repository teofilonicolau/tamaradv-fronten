// arquivo: src/types/IProcessual.ts
export interface IProcessualCivilDTO {
  tipo_peticao: string;
  numero_processo: string;
  parte_contraria: string;
  cpf_cnpj_parte_contraria: string;
  endereco_parte_contraria: string;
  descricao_pedido: string;
  valor_execucao: number;
  titulo_executivo: string;
  data_vencimento: string;
  imovel_endereco?: string;
  valor_aluguel?: number;
  meses_atraso?: number;
  documentos_anexos: string[];
  urgencia_fundamentacao: string;
}
// Petições Civil e Consumidor terão interfaces similares ou uma base genérica.