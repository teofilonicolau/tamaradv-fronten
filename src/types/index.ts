// src/types/index.ts
// BARREL CENTRAL — reexporta tudo de forma segura
// Resolve conflitos de nomes e arquivos inexistentes

// 1. Previdenciário (reexportação segura, sem conflito)
export type {
  IPeriodoEspecial,
  IPrevidenciarioBaseInput,
  IAposentadoriaEspecialInput,
  IAposentadoriaInvalidezInput,
  IAposentadoriaRuralInput,
  IAposentadoriaTempoContribuicaoInput,
  IAuxilioDoencaInput,
  IBpcLoasInput,
  IPensaoMorteInput,
  ISalarioMaternidadeInput,
  IRevisaoVidaTodaInput,
  IRevisaoBeneficioInput,
  IPeticaoComCalculoInput,
  IPrevidenciarioResponse,
} from './IPrevidenciario';

// 2. Calculadoras
export type {
  ICalculatorResponse,
  ITempoEspecialInput,
  IRevisaoVidaTodaInput as IRevisaoVidaTodaCalcInput, // evita conflito com previdenciário
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

// 3. Processual Civil, Civil, Consumidor, Trabalhista
export type {
  IProcessualBase,
  IExecucaoTituloInput,
  IMonitoriaInput,
  IImpugnacaoCumprimentoInput,
  ICivilCobrancaInput,
  IConsumidorInput,
  IVinculoEmpregaticioInput,
} from './IProcessualCivil';

// 4. Respostas LLM e Consulta
export type {
  IEthicsDisclaimer,
  StructuredData,
  ILLMResponse,
  AreaJuridica,
  IConsultaInput,
  IConsultaJuridicaInput,
  IPeticaoPayload,
} from './ILLM';