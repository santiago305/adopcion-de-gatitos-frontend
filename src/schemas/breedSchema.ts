import { z } from "zod";

export const createBreedSchema = z.object({
  name: z.string().min(1, "El nombre de la raza es obligatorio"),
  speciesId: z.string().min(1, "Debe seleccionar una especie"),
});

export const updateBreedSchema = createBreedSchema.partial();
