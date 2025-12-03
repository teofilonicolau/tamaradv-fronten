// src/types/index.ts — VERSÃO FINAL 2025 (com Direito Civil adicionado)
export type {
  IPrevidenciarioResponse,
  PrevidenciarioInput,
} from './IPrevidenciario';

export type {
  TrabalhistaInput,
  ITrabalhistaResponse,
} from './ITrabalhista';

// Calculadoras (mantidas por enquanto)
export type {
  ICalculatorResponse,
  ITempoEspecialInput,
  IRevisaoVidaTodaInput as IRevisaoVidaTodaCalcInput,
  IHorasExtrasInput,
  ICorrecaoMonetariaInput,
  IVerbasRescisoriasInput,
  IAdicionalNoturnoInput,
  IPensaoAlimenticiaInput,
  ILiquidacaoSentencaInput,
  IJurosMoraInput,
  IValorCausaInput,
  IPeriodoGracaInput,
  IRegraTransicaoInput,
} from './ICalculator';

export type {
  TempoEspecialResult,
  RevisaoVidaTodaResult,
  HorasExtrasResult,
  CorrecaoMonetariaResult,
  VerbasRescisoriasResult,
  AdicionalNoturnoResult,
  PensaoAlimenticiaResult,
  LiquidacaoSentencaResult,
  JurosMoraResult,
  ValorCausaResult,
  PeriodoGracaResult,
  RegraTransicaoEC103Result,
  GenericCalcResult,
} from './CalculatorResults';

// Consultas IA — SÓ O QUE É USADO DE VERDADE
export type {
  AreaJuridica,
  IConsultaInput,
  IAnaliseInput,
  IParecerInput,
} from './ILLM';

// CONSUMIDOR
export type {
  ConsumidorInput,
  IConsumidorResponse,
} from './IConsumidor';

// CIVIL — ADICIONADO AQUI
export type {
  CivilInput,
  ICivilResponse,
} from './ICivil';

// Tipo genérico universal pra qualquer resposta com ethics (usado no LLMResponseArea)
export interface IGenericResponse {
  texto_peticao?: string;
  quesitos?: string[];
  peticao_completa?: string;
  resposta?: string;
  resultado?: string;
  relatorio?: string;
  parecer?: string;
  ethics: {
    disclaimer: string;
    generated_at?: string;
    requires_lawyer_review?: boolean;
  };
  [key: string]: unknown;
}