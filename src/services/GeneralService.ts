// src/services/GeneralService.ts
import api from '../config/api';   // ← sempre assim daqui pra frente
import type { ILLMResponse } from '../types/ILLM';
import type { IConsultaInput } from '../types/ILLM';

export const GeneralService = {
  previdenciario: {
    aposentadoriaEspecial: (data: Record<string, unknown>) =>
      api.post<ILLMResponse>('/api/v1/previdenciario/peticao-aposentadoria-especial', data),
    aposentadoriaInvalidez: (data: Record<string, unknown>) =>
      api.post<ILLMResponse>('/api/v1/previdenciario/peticao-aposentadoria-invalidez', data),
    comCalculo: (tipoPeticao: string, data: Record<string, unknown>) =>
      api.post<ILLMResponse>(`/api/v1/previdenciario/peticao-com-calculo/${tipoPeticao}`, data),
  },
  ia: {
    consulta: (data: IConsultaInput) =>
      api.post<ILLMResponse>('/api/v1/consulta', data),
    analise: (data: Record<string, unknown>) =>
      api.post<ILLMResponse>('/api/v1/analise', data),
    parecerJuridico: (data: Record<string, unknown>) =>
      api.post<ILLMResponse>('/api/v1/parecer-juridico', data),
  },
};