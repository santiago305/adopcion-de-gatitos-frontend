import { createUserSchema, updateUserSchema } from "@/schemas/userSchemas";
import { z } from "zod";


export interface User {
  id: string;
  name: string;
  email: string;
  rol: "admin" | "moderator" | "user" | string; // agrega más roles si tienes
}

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

