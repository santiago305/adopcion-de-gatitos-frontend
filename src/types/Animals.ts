import { z } from "zod";
import { createAnimalSchema, updateAnimalSchema } from "@/schemas/animalsSchema";

/**
 * Tipos derivados de Zod para el formulario
 */
export type CreateAnimalDto = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalDto = z.infer<typeof updateAnimalSchema>;

// Valores del formulario que incluyen ID opcional para edición
export type AnimalFormValues = CreateAnimalDto & { id?: string };

/**
 * Tipo plano para listar animales (usado en getAll)
 * Este tipo corresponde al resultado de getRawMany() del backend
 */
export interface FlatAnimal {
  id: string;
  name: string;
  breed: string;
  disease: string;
  healthStatus: boolean;
  adopted: boolean;
  photos?: string;
  information: string;
  color: string;
  size: string;
  weight: string;
  fur: string;
  sex: string;
  age: string;
  sterilized: boolean;
  status: boolean;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Tipo detallado para un animal individual (usado en getOne)
 * Coincide con la respuesta que mencionaste en el ejemplo
 */
export interface AnimalDetails {
  id: string;
  name: string;
  species: string;
  breed: string;
  disease: string;
  severity: string;
  healthstatus: boolean;
  entrydate: string; // ISO date
  adopted: boolean;
  status: boolean;
  information: string;
  color: string;
  size: string;
  weight: string;
  fur: string;
  sex: string;
  age: string;
  sterilized: boolean;
  personalityname: string;
}

/**
 * Respuesta genérica para API
 */
export interface ApiAnimalsResponse {
  type: "success" | "error";
  message: string;
  data?: any;
}

/**
 * Respuesta específica de búsqueda por ID
 */
export interface ApiAnimalByIdResponse {
  type: "success" | "error";
  message: string;
  data?: AnimalDetails;
}
