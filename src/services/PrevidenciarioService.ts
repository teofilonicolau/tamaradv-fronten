// arquivo: src/services/PrevidenciarioService.ts
import api from './api';
import type { ILLMResponse } from '../types/ILLM';
// Exemplo de Input DTO (a ser definido para cada tipo)
type IPrevidenciarioInput = unknown;


export const PrevidenciarioService = {
  // 1. Petição Aposentadoria Especial
  generateAposentadoriaEspecial: (data: IPrevidenciarioInput): Promise<ILLMResponse> => 
    api.post('/previdenciario/peticao-aposentadoria-especial', data),

  // 2. Petição Revisão da Vida Toda
  generateRevisaoVidaToda: (data: IPrevidenciarioInput): Promise<ILLMResponse> => 
    api.post('/previdenciario/peticao-revisao-vida-toda', data),
    
  // 3. Petição Auxílio Doença
  generateAuxilioDoenca: (data: IPrevidenciarioInput): Promise<ILLMResponse> => 
    api.post('/previdenciario/peticao-auxilio-doenca', data),
  
  // ... (Todos os 11 endpoints previdenciários seriam mapeados aqui)
};