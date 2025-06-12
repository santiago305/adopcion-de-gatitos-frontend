import { z } from 'zod';
import { createDiseaseSchema, updateDiseaseSchema } from '@/schemas/diseasesSchema';


export type CreateDiseaseDto = z.infer<typeof createDiseaseSchema>;
export type DiseaseFormValues = CreateDiseaseDto & { id?: string };
export type UpdateDiseaseDto = z.infer<typeof updateDiseaseSchema>;

export interface Disease {
  id: string;
  name: string;
  severity: 'ninguna' | 'leve' | 'media' | 'grave';
  deleted: boolean;
}

export interface ApiDiseasesResponse {
  type: 'success' | 'error';
  message: string;
  data?: any;
}