// src/types/IProcessualCivil.ts
// Arquivo criado agora — resolve erro "Cannot find module"

export interface IProcessualBase {
  numero_processo?: string;
  comarca?: string;
  vara?: string;
  documentos_anexos?: string[];
}

export interface IExecucaoTituloInput extends IProcessualBase {
  tipo_peticao: 'execucao-titulo-extrajudicial';
  parte_contraria: string;
  cpf_cnpj_parte_contraria: string;
  valor_divida: number;
  data_vencimento: string;
  titulo_executivo: string;
  fundamentacao_urgencia?: string;
}

export interface IMonitoriaInput extends IProcessualBase {
  tipo_peticao: 'monitoria';
  parte_contraria: string;
  cpf_cnpj_parte_contraria: string;
  valor_causa: number;
  comprovante_divida: string;
  endereco_citacao?: string;
}

export interface IImpugnacaoCumprimentoInput extends IProcessualBase {
  tipo_peticao: 'impugnacao-cumprimento-sentenca';
  excesso_execucao?: number;
  prescricao_intercorrente?: boolean;
  penhora_indevida?: string[];
  argumentos_defesa: string;
}

export interface ICivilCobrancaInput {
  tipo_peticao: 'cobranca' | 'indenizacao';
  devedor: string;
  cpf_cnpj_devedor: string;
  valor_divida: number;
  data_vencimento: string;
  contrato_ou_titulo?: string;
  danos_morais?: number;
  comprovantes?: string[];
}

export interface IConsumidorInput {
  tipo_peticao: 'cobranca-indevida' | 'vicio-produto' | 'servico-mal-prestado';
  empresa_reclamada: string;
  cnpj_empresa: string;
  produto_ou_servico: string;
  valor_pago?: number;
  data_compra: string;
  numero_nota_fiscal?: string;
  descricao_problema: string;
  pedido_liminar?: boolean;
}

export interface IVinculoEmpregaticioInput {
  empregador: string;
  cnpj_empregador: string;
  periodo_trabalhado_inicio: string;
  periodo_trabalhado_fim?: string;
  funcao_exercida: string;
  salario_recebido: number;
  jornada_semanal: string;
  documentos_comprovantes: string[];
}