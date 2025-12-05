// src/config/CalculatorMap.ts
import { CalculatorService } from '@/services/CalculatorService';

export const CalculatorMap = {
  'tempo-especial': CalculatorService.tempoEspecial,
  'revisao-vida-toda': CalculatorService.revisaoVidaToda,
  'periodo-graca': CalculatorService.periodoGraca,
  'regra-transicao-ec103': CalculatorService.regraTransicaoEC103,
  'horas-extras': CalculatorService.horasExtras,
  'verbas-rescisorias': CalculatorService.verbasRescisorias,
  'adicional-noturno': CalculatorService.adicionalNoturno,
  'pensao-alimenticia': CalculatorService.pensaoAlimenticia,
  'valor-causa': CalculatorService.valorCausa,
  'liquidacao-sentenca': CalculatorService.liquidacaoSentenca,
  'juros-mora': CalculatorService.jurosMora,
  'correcao-monetaria': CalculatorService.correcaoMonetaria,
} as const;