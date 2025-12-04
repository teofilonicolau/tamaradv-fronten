// src/services/ProcessualCivilService.ts
import axios from 'axios';
import type { ProcessualCivilInput, IProcessualCivilResponse } from '@/types/IProcessualCivil';

const API_BASE = 'https://tamarai-backend-production.up.railway.app/api/v1';

export const ProcessualCivilService = {
  execucaoTitulo: async (data: ProcessualCivilInput) => {
    return axios.post<IProcessualCivilResponse>(`${API_BASE}/processual-civil/peticao-execucao`, data);
  },

  monitoria: async (data: ProcessualCivilInput) => {
    return axios.post<IProcessualCivilResponse>(`${API_BASE}/processual-civil/peticao-monitoria`, data);
  },

  embargosTerceiro: async (data: ProcessualCivilInput) => {
    return axios.post<IProcessualCivilResponse>(`${API_BASE}/processual-civil/peticao-embargos-terceiro`, data);
  },

  impugnacaoCumprimento: async (data: ProcessualCivilInput) => {
    return axios.post<IProcessualCivilResponse>(`${API_BASE}/processual-civil/peticao-impugnacao-cumprimento`, data);
  },
};