import { z } from "zod";

export const createPersonalitySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
});

export const updatePersonalitySchema = createPersonalitySchema.partial();
