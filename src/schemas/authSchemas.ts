import { z } from 'zod';

// Base schema para crear usuario
export const LoginSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  password: z.string().min(1, 'La Contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema para editar usuario (hereda del anterior, pero password es opcional)
export const RegisterSchema = LoginSchema.extend({
  name: z.string().min(1, 'El nombre es obligatorio'),
});
