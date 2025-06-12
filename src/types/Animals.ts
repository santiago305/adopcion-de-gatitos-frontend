import { z } from "zod";
import { createAnimalSchema, updateAnimalSchema } from "@/schemas/animalsSchema";

export type CreateAnimalDto = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalDto = z.infer<typeof updateAnimalSchema>;
export type AnimalFormValues = CreateAnimalDto & { id?: string };

export interface Animal {
  id: string;
  name: string;
  breed: string;
  disease: string;
  healthStatus: boolean;
  adopted: boolean;
  photos?: string;
  characteristics: string;
  information: string;
  status: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiAnimalsResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}