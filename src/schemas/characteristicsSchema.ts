import { z } from "zod";

export const createCharacteristicsSchema = z.object({
  color: z
    .string({ required_error: "El Color es obligatorio." })
    .min(1, "El Color es obligatorio."),
  size: z
    .string({ required_error: "El Tamaño es obligatorio." })
    .min(1, "El Tamaño es obligatorio."),
  weight: z
    .string({ required_error: "El Peso es obligatorio." })
    .min(1, "El Peso es obligatorio."),
  fur: z
    .string({ required_error: "El Pelaje es obligatorio." })
    .min(1, "El Pelaje es obligatorio."),
  sex: z
    .string({ required_error: "El Sexo es obligatorio." })
    .min(1, "El Sexo es obligatorio."),
  age: z
    .string({ required_error: "La Edad es obligatoria." })
    .min(1, "La Edad es obligatoria."),
  sterilized: z.boolean({ required_error: "La esterilización es obligatoria." }),
  personalityId: z
    .string({ required_error: "La personalidad es obligatoria." })
    .min(1, "La personalidad es obligatoria."),
});

export const updateCharacteristicsSchema = z.object({
  color: z.string().optional(),
  size: z.string().optional(),
  weight: z.string().optional(),
  fur: z.string().optional(),
  sex: z.string().optional(),
  age: z.string().optional(),
  sterilized: z.boolean().optional(),
  personalityId: z.string().optional(),
});
