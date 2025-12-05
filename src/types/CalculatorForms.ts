// src/types/CalculatorForms.ts
import { CalculatorService } from '@/services/CalculatorService';

export interface CalculatorField {
  label: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'checkbox';
  placeholder?: string;
}

export type CalculatorFormData = Record<string, string | number | boolean | string[] | number[]>;

export interface CalculatorConfig {
  fields: CalculatorField[];
  serviceName: keyof typeof CalculatorService;
}