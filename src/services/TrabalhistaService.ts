// src/services/TrabalhistaService.ts
import api from '../config/api';
import type { ITrabalhistaResponse, TrabalhistaInput } from '@/types/ITrabalhista';

const BASE = '/trabalhista';

export const TrabalhistaService = {
  peticaoVinculo: (data: TrabalhistaInput) =>
    api.post<ITrabalhistaResponse>(`${BASE}/peticao-vinculo`, data),

  quesitosInsalubridade: (data: TrabalhistaInput) =>
    api.post<ITrabalhistaResponse>(`${BASE}/quesitos-insalubridade`, data),
};