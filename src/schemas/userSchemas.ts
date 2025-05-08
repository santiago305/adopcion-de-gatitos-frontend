import { z } from 'zod';

// Base schema para crear usuario
export const createUserSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  roleId: z.string().optional(),
});

// Schema para editar usuario (hereda del anterior, pero password es opcional)
export const updateUserSchema = createUserSchema.partial({
  password: true, // Solo se vuelve opcional el campo que quieras
});
