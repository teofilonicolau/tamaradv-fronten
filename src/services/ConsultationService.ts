// src/services/ConsultationService.ts
import api from '../config/api';
import type { ILLMResponse } from '../types/ILLM';

export const ConsultationService = {
  consulta: (data: {
    pergunta: string;
    area?: string;
    firm_name?: string;
    lawyer_name?: string;
    signature_text?: string;
    ai_persona?: string;
  }) => api.post<ILLMResponse>('/api/v1/consulta', data),

  analise: (data: {
    texto: string;
    tipo_analise?: string;
    firm_name?: string;
    lawyer_name?: string;
    signature_text?: string;
    ai_persona?: string;
  }) => api.post<ILLMResponse>('/api/v1/analise', data),

  parecerJuridico: (data: {
    titulo: string;
    conteudo: string;
    area?: string;
    incluir_jurisprudencia?: boolean;
    firm_name?: string;
    lawyer_name?: string;
    signature_text?: string;
    ai_persona?: string;
  }) => api.post<ILLMResponse>('/api/v1/parecer-juridico', data),
};