import { z } from "zod";
import { createBreedSchema, updateBreedSchema } from "@/schemas/breedSchema";

export type CreateBreedDto = z.infer<typeof createBreedSchema>;
export type UpdateBreedDto = z.infer<typeof updateBreedSchema>;

export type BreedFormValues = CreateBreedDto & { id?: string };

export interface Breed {
  id: string;
  name: string;
  speciesId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiBreedResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}
