import { useState } from "react";
import { loginUser } from "@/api/auth";
import { parseApiError } from "@/utils/handleApiError";
import { flashMessage } from "@/utils/flashEvent";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      flashMessage("success", "Inicio de sesión exitoso");
      return data;
    } catch (error) {
      const msg = parseApiError(error, "Error al iniciar sesión.");
      flashMessage("error", msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
