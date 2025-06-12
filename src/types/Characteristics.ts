import { z } from "zod";
import { createCharacteristicsSchema, updateCharacteristicsSchema } from "@/schemas/characteristicsSchema";

export type CreateCharacteristicsDto = z.infer<typeof createCharacteristicsSchema>;
export type UpdateCharacteristicsDto = z.infer<typeof updateCharacteristicsSchema>;

export type CharacteristicsFormValues = CreateCharacteristicsDto & { id?: string };

export interface Characteristics {
  id: string;
  color: string;
  size: string;
  weight: string;
  fur: string;
  sex: string;
  age: string;
  sterilized: boolean;
  personalityId: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiCharacteristicsResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}
