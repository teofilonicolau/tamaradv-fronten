// src/services/PrevidenciarioService.ts
import api from '../config/api';
import type { IPrevidenciarioResponse, PrevidenciarioInput } from '../types/IPrevidenciario';

const BASE = '/previdenciario';

export const PrevidenciarioService = {
  // Mapeamento 100% fiel ao seu backend real
  aposEspecial: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-especial`, data),

  aposInvalidez: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-invalidez`, data),

  aposRural: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-rural`, data),

  aposTempoContribuicao: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-aposentadoria-tempo-contribuicao`, data),

  auxilioDoenca: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-auxilio-doenca`, data),

  salarioMaternidade: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-salario-maternidade`, data),

  pensaoMorte: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-pensao-morte`, data),

  bpcLoas: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-bpc-loas`, data),

  revisaoVidaToda: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-revisao-vida-toda`, data),

  revisaoBeneficio: (data: PrevidenciarioInput) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-revisao-beneficio`, data),

  // Endpoint híbrido (opcional)
  comCalculo: (data: PrevidenciarioInput & { tipo_peticao: string }) =>
    api.post<IPrevidenciarioResponse>(`${BASE}/peticao-com-calculo/${data.tipo_peticao}`, data),
};