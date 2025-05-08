import { z } from 'zod';

// Base schema para crear usuario
export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema para editar usuario (hereda del anterior, pero password es opcional)
export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(3, 'Tu nombre debe tener al menos 3 caracteres')
});
