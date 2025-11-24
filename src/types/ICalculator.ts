// arquivo: src/types/ICalculator.ts
// Exemplo para um cálculo
export interface ITempoEspecialInput {
  tempo_rural: number;
  tempo_urbano: number;
  tempo_especial: number;
  data_inicio_especial: string;
}

export interface ITempoEspecialResult {
  calculo: {
    tempo_especial_convertido_homem: number;
    total_formatado_homem: string;
    // ... outros campos de resultado
  };
  status: string;
}

// Exemplo para Correção Monetária
export type IndiceCorrecao = "INPC" | "IPCA" | "IGP-M";

export interface ICorrecaoMonetariaInput {
    valor: number;
    data_inicial: string;
    indice: IndiceCorrecao;
}