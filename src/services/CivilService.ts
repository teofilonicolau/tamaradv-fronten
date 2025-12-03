// src/services/CivilService.ts
import axios from 'axios';
import type { CivilInput, ICivilResponse } from '@/types/ICivil';

const API_BASE = 'https://tamarai-backend-production.up.railway.app/api/v1';

export const CivilService = {
  peticaoCobranca: async (data: CivilInput) => {
    return axios.post<ICivilResponse>(`${API_BASE}/civil/peticao-cobranca`, data);
  },

  peticaoIndenizacao: async (data: CivilInput) => {
    return axios.post<ICivilResponse>(`${API_BASE}/civil/peticao-indenizacao`, data);
  },
};