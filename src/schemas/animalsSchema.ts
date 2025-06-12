import { z } from "zod";

// 🐾 Schema para crear un animal
export const createAnimalSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").trim(),
  breedId: z.string().min(1, "La raza es obligatoria").trim(),
  diseaseId: z.string().min(1, "La enfermedad es obligatoria").trim(),
  healthStatus: z.boolean({ required_error: "El estado de salud es obligatorio" }),
  adopted: z.boolean({ required_error: "El estado de adopción es obligatorio" }),
  photos: z.string().url("Debe ser una URL válida").optional(), // si es solo URL, usamos url()
  characteristicsId: z.string().min(1, "Las características son obligatorias").trim(),
  information: z.string().min(1, "La información es obligatoria").trim(),
  status: z.boolean().optional(),
});

// 🛠 Schema para actualizar un animal (todos los campos opcionales)
export const updateAnimalSchema = z.object({
  name: z.string().trim().optional(),
  breedId: z.string().trim().optional(),
  diseaseId: z.string().trim().optional(),
  healthStatus: z.boolean().optional(),
  adopted: z.boolean().optional(),
  photos: z.string().url().optional(),
  characteristicsId: z.string().trim().optional(),
  information: z.string().trim().optional(),
  status: z.boolean().optional(),
});
