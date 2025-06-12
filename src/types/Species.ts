import { z } from "zod";
import { createSpeciesSchema, updateSpeciesSchema } from "@/schemas/speciesSchema";

export type CreateSpeciesDto = z.infer<typeof createSpeciesSchema>;
export type UpdateSpeciesDto = z.infer<typeof updateSpeciesSchema>;
export type SpeciesFormValues = CreateSpeciesDto & { id?: string };

export interface Species {
  id: string;
  name: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiSpeciesResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}
