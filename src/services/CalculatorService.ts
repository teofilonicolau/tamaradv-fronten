// src/services/CalculatorService.ts
import api from '../config/api';
import type {
  ICalculatorResponse,
  ITempoEspecialInput,
  IRevisaoVidaTodaInput,
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
} from '../types/ICalculator';

import type {
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
} from '../types/CalculatorResults';

const BASE = '/calculadoras'; // ← padrão limpo e DRY

export const CalculatorService = {
  tempoEspecial: (data: ITempoEspecialInput) =>
    api.post<ICalculatorResponse<TempoEspecialResult>>(`${BASE}/tempo-especial`, data),

  revisaoVidaToda: (data: IRevisaoVidaTodaInput) =>
    api.post<ICalculatorResponse<RevisaoVidaTodaResult>>(`${BASE}/revisao-vida-toda`, data),

  horasExtras: (data: IHorasExtrasInput) =>
    api.post<ICalculatorResponse<HorasExtrasResult>>(`${BASE}/horas-extras`, data),

  correcaoMonetaria: (data: ICorrecaoMonetariaInput) =>
    api.post<ICalculatorResponse<CorrecaoMonetariaResult>>(`${BASE}/correcao-monetaria`, data),

  verbasRescisorias: (data: IVerbasRescisoriasInput) =>
    api.post<ICalculatorResponse<VerbasRescisoriasResult>>(`${BASE}/verbas-rescisorias`, data),

  adicionalNoturno: (data: IAdicionalNoturnoInput) =>
    api.post<ICalculatorResponse<AdicionalNoturnoResult>>(`${BASE}/adicional-noturno`, data),

  pensaoAlimenticia: (data: IPensaoAlimenticiaInput) =>
    api.post<ICalculatorResponse<PensaoAlimenticiaResult>>(`${BASE}/pensao-alimenticia`, data),

  liquidacaoSentenca: (data: ILiquidacaoSentencaInput) =>
    api.post<ICalculatorResponse<LiquidacaoSentencaResult>>(`${BASE}/liquidacao-sentenca`, data),

  jurosMora: (data: IJurosMoraInput) =>
    api.post<ICalculatorResponse<JurosMoraResult>>(`${BASE}/juros-mora`, data),

  valorCausa: (data: IValorCausaInput) =>
    api.post<ICalculatorResponse<ValorCausaResult>>(`${BASE}/valor-causa`, data),

  periodoGraca: (data: IPeriodoGracaInput) =>
    api.post<ICalculatorResponse<PeriodoGracaResult>>(`${BASE}/periodo-graca`, data),

  regraTransicaoEC103: (data: IRegraTransicaoInput) =>
    api.post<ICalculatorResponse<RegraTransicaoEC103Result>>(`${BASE}/regra-transicao-ec103`, data),

  getInfo: () => api.get<ICalculatorResponse<GenericCalcResult>>('/calculadoras/info'),
};