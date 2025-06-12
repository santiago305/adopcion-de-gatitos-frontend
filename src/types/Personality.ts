import { z } from "zod";
import { createPersonalitySchema, updatePersonalitySchema } from "@/schemas/personalitySchema";

export type CreatePersonalityDto = z.infer<typeof createPersonalitySchema>;
export type UpdatePersonalityDto = z.infer<typeof updatePersonalitySchema>;
export type PersonalityFormValues = CreatePersonalityDto & { id?: string };

export interface Personality {
  id: string;
  name: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPersonalityResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}
