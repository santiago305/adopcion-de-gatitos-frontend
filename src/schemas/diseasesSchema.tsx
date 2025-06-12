import { z } from 'zod';

export const createDiseaseSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  severity: z.enum(['ninguna', 'leve', 'media', 'grave'], {
    errorMap: () => ({ message: 'Gravedad inválida' }),
  }),
});

export const updateDiseaseSchema = createDiseaseSchema.partial();