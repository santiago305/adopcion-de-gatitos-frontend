import { z } from "zod";

export const createAnimalSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  breedId: z.string().min(1, "La raza es obligatoria"),
  diseaseId: z.string().min(1, "La enfermedad es obligatoria"),
  healthStatus: z.boolean(),
  adopted: z.boolean(),
  photos: z.string().optional(),
  characteristicsId: z.string().min(1, "Las características son obligatorias"),
  information: z.string().min(1, "La información es obligatoria"),
  status: z.boolean().optional(),
});

export const updateAnimalSchema = createAnimalSchema.partial();