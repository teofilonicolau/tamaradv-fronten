// src/config/CalculatorMap.ts
import { CalculatorService } from '../services/CalculatorService';
import type {
  ICorrecaoMonetariaInput,
  IJurosMoraInput,
  ITempoEspecialInput,
  IRevisaoVidaTodaInput,
  IHorasExtrasInput,
} from '../types/ICalculator';
import type { AxiosResponse } from 'axios';
import type { ICalculatorResponse } from '../types/ICalculator';
import type { GenericCalcResult } from '../types/CalculatorResults';

// Tipo genérico para qualquer resposta do CalculatorService
type CalculatorHandler = (
  data: Record<string, string>
) => Promise<AxiosResponse<ICalculatorResponse<GenericCalcResult>>>;

export const CalculatorMap: Record<string, CalculatorHandler> = {
  'correcao-monetaria': (data) =>
    CalculatorService.correcaoMonetaria(data as unknown as ICorrecaoMonetariaInput),
  'juros-mora': (data) =>
    CalculatorService.jurosMora(data as unknown as IJurosMoraInput),
  'tempo-especial': (data) =>
    CalculatorService.tempoEspecial(data as unknown as ITempoEspecialInput),
  'revisao-vida-toda': (data) =>
    CalculatorService.revisaoVidaToda(data as unknown as IRevisaoVidaTodaInput),
  'horas-extras': (data) =>
    CalculatorService.horasExtras(data as unknown as IHorasExtrasInput),
  // ADICIONE NOVAS CALCULADORAS AQUI — SÓ 1 LINHA CADA!
};