// src/services/calculadoras/HorasExtrasService.ts
import api from '../../config/api';

/**
 * Entrada da calculadora de Horas Extras
 */
export interface HorasExtrasInput {
  horas: number;
  salario: number;
  adicionalNoturno?: boolean;
  feriado?: boolean;
  percentualAdicional?: number; // ex: 50, 100, 60 etc
}

/**
 * Saída da calculadora de Horas Extras
 */
export interface HorasExtrasOutput {
  total: number;
  valorHoraNormal: number;
  valorHoraExtra: number;
  detalhes?: string;
}

/**
 * Calcula horas extras via backend
 * Endpoint correto conforme Swagger: POST /api/v1/calculadoras/horas-extras
 */
export const calculateHorasExtras = async (
  data: HorasExtrasInput
): Promise<HorasExtrasOutput> => {
  const response = await api.post<HorasExtrasOutput>(
    '/api/v1/calculadoras/horas-extras',
    data
  );
  return response.data;
};