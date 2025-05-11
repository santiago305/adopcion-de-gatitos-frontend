import { z } from 'zod';

// Base schema para crear usuario
export const createClientsSchema = z.object({
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 9 dígitos, incluyendo el prefijo +51.')
    .regex(/^\+51\d{9}$/, 'El teléfono debe comenzar con +51 seguido de 9 dígitos'), // Validación para +51 seguido de 9 dígitos
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'El género es obligatorio y debe ser uno de los valores disponibles.' }),
  }),
  birth_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'La fecha de nacimiento debe ser válida.',
  }),
});

// Schema para editar usuario (hereda del anterior, pero password es opcional)
export const updateClientsSchema = createClientsSchema.extend({

});
