// src/services/ConsumidorService.ts
import axios from 'axios';
import type { ConsumidorInput, IConsumidorResponse } from '@/types/IConsumidor';

const API_BASE = 'https://tamarai-backend-production.up.railway.app/api/v1';

export const ConsumidorService = {
  peticaoVicioProduto: async (data: ConsumidorInput) => {
    return axios.post<IConsumidorResponse>(`${API_BASE}/consumidor/peticao-vicio-produto`, data);
  },

  peticaoCobrancaIndevida: async (data: ConsumidorInput) => {
    return axios.post<IConsumidorResponse>(`${API_BASE}/consumidor/peticao-cobranca-indevida`, data);
  },
};