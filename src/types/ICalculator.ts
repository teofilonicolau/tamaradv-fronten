// src/types/ICalculator.ts

// Interface Genérica de Resposta de Cálculo
export interface ICalculatorResponse<T> {
  calculo: T;
  area?: string;
  status: string;
  uso?: string;
  ec103?: boolean;
}

// 1. Tempo Especial
export interface ITempoEspecialInput {
  tempo_rural: number;
  tempo_urbano: number;
  tempo_especial: number;
  data_inicio_especial: string;
}

// 2. Revisão Vida Toda
export interface IRevisaoVidaTodaInput {
  salarios_antes_1994: number[];
  salarios_depois_1994: number[];
  data_dib: string;
}

// 3. Horas Extras
export interface IHorasExtrasInput {
  jornada_contratual: number;
  jornada_real: number;
  dias_trabalhados: number;
  valor_hora: number;
}

// 4. Correção Monetária
export type IndiceCorrecao = "INPC" | "IPCA" | "IGP-M";
export interface ICorrecaoMonetariaInput {
    valor: number;
    data_inicial: string;
    indice: IndiceCorrecao;
}

// 5. Verbas Rescisórias
export interface IVerbasRescisoriasInput {
  salario: number;
  data_admissao: string;
  data_rescisao: string;
  tipo_rescisao: "sem_justa_causa" | "justa_causa" | "pedido_demissao" | "acordo";
}

// 6. Adicional Noturno
export interface IAdicionalNoturnoInput {
  salario_base: number;
  horas_noturnas: number;
  dias_trabalhados: number;
}

// 7. Pensão Alimentícia
export interface IPensaoAlimenticiaInput {
  renda_alimentante: number;
  numero_filhos: number;
  percentual_sugerido: number;
}

// 8. Liquidação de Sentença
export interface ILiquidacaoSentencaInput {
  valor_principal: number;
  data_sentenca: string;
  incluir_honorarios: boolean;
}

// 9. Juros de Mora
export interface IJurosMoraInput {
  valor_principal: number;
  data_vencimento: string;
  taxa_mensal: number;
}

// 10. Valor da Causa
export interface IValorCausaInput {
  parcelas_vencidas: number;
  valor_mensal: number;
}

// 11. Período de Graça
export interface IPeriodoGracaInput {
  tipo_segurado: string;
  ultima_contribuicao: string;
}

// 12. Regra de Transição EC103
export interface IRegraTransicaoInput {
  sexo: string;
  idade_atual: number;
  tempo_contribuicao_atual: number;
  tempo_contribuicao_em_13_11_2019: number;
}