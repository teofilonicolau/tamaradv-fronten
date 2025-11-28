// src/services/PrevidenciarioService.ts
import api from '../config/api';
import type {
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
} from '../types/IPrevidenciario';

const BASE = '/previdenciario';

export const PrevidenciarioService = {
  // 1. Aposentadoria Especial
  aposEspecial: (data: IAposentadoriaEspecialInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-especial`, data),

  // 2. Aposentadoria por Invalidez
  aposInvalidez: (data: IAposentadoriaInvalidezInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-invalidez`, data),

  // 3. Aposentadoria Rural / Híbrida
  aposRural: (data: IAposentadoriaRuralInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-rural`, data),

  // 4. Aposentadoria por Tempo de Contribuição
  aposTempoContribuicao: (data: IAposentadoriaTempoContribuicaoInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-tempo-contribuicao`, data),

  // 5. Auxílio-Doença
  auxilioDoenca: (data: IAuxilioDoencaInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-auxilio-doenca`, data),

  // 6. Salário-Maternidade
  salarioMaternidade: (data: ISalarioMaternidadeInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-salario-maternidade`, data),

  // 7. Pensão por Morte
  pensaoMorte: (data: IPensaoMorteInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-pensao-morte`, data),

  // 8. BPC/LOAS
  bpcLoas: (data: IBpcLoasInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-bpc-loas`, data),

  // 9. Revisão da Vida Toda
  revisaoVidaToda: (data: IRevisaoVidaTodaInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-revisao-vida-toda`, data),

  // 10. Revisão Genérica do Benefício
  revisaoBeneficio: (data: IRevisaoBeneficioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-revisao-beneficio`, data),

  // 11. Endpoint híbrido: Petição + cálculo automático
 posledicaoComCalculo: (data: IPeticaoComCalculoInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-com-calculo/${data.tipo_peticao}`, data),
};