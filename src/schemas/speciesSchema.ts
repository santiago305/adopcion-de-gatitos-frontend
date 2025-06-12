import { z } from "zod";

export const createSpeciesSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export const updateSpeciesSchema = createSpeciesSchema.partial();
