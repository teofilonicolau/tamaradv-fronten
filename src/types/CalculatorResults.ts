// src/types/CalculatorResults.ts
// Tipos CORRETOS baseados no seu backend real (Swagger + testes)

export type HorasExtrasResult = {
  horas_extras_diarias: number;
  valor_total: number;
  observacao: string;
};

export type TempoEspecialResult = {
  tempo_total_dias: number;
  tempo_total_anos_meses_dias: string;
  tempo_convertido_homens?: number;
  tempo_convertido_mulheres?: number;
  tem_direito_aposentadoria_especial: boolean;
  observacao?: string;
};

export type RevisaoVidaTodaResult = {
  valor_beneficio_atual: number;
  valor_com_vida_toda: number;
  diferenca_mensal: number;
  atrasados_brutos: number;
  atrasados_liquidos?: number;
  economia_futuro_10_anos?: number;
  tema_1_102_stf?: boolean;
  mensagem?: string;
};

// Os outros você pode manter por enquanto (se ainda não usou)
// Ou ir corrigindo conforme for implementando

export type CorrecaoMonetariaResult = {
  valor_original: number;
  valor_corrigido: number;
  indice_aplicado: string;
  fator_acumulado: number;
  data_base: string;
  data_final: string;
};

export type VerbasRescisoriasResult = {
  saldo_salario: number;
  aviso_previo: number;
  decimo_terceiro: number;
  ferias_vencidas?: number;
  ferias_proporcionais: number;
  um_terco_ferias: number;
  fgts_multa_40?: number;
  fgts_total_depositado?: number;
  total_liquido: number;
  tipo_rescisao: string;
};

export type AdicionalNoturnoResult = {
  valor_hora_normal: number;
  valor_hora_noturna: number;
  adicional_devido_mensal: number;
  total_com_reflexos?: number;
};

export type PensaoAlimenticiaResult = {
  percentual_sugerido: number;
  valor_sugerido: number;
  valor_minimo_recomendado: number;
  valor_maximo_aceitavel: number;
  base_legal: string;
};

export type LiquidacaoSentencaResult = {
  valor_principal_corrigido: number;
  honorarios_sucumbenciais?: number;
  custas?: number;
  total_liquido: number;
  juros_aplicados?: number;
};

export type JurosMoraResult = {
  valor_principal: number;
  juros_acumulados: number;
  total_com_juros: number;
  taxa_aplicada: string;
  periodo_dias: number;
};

export type ValorCausaResult = {
  parcelas_vencidas: number;
  vincendas_12_meses: number;
  total_valor_causa: number;
  vincendas_ate_60_salarios?: boolean;
};

export type PeriodoGracaResult = {
  dentro_do_periodo_graca: boolean;
  meses_restantes?: number;
  data_limite_contribuicao: string;
  qualidade_segurado: 'mantida' | 'perdida';
};

export type RegraTransicaoEC103Result = {
  pedagio_50: number;
  pedagio_100: number;
  pontos_necessarios_2025: number;
  tempo_faltante_anos?: number;
  aposentadoria_prevista?: string;
  melhor_regra?: '50%' | '100%' | 'nenhuma';
};

export type GenericCalcResult = Record<string, string | number | boolean | null | undefined>;