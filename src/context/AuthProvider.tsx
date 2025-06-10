import { useState, useEffect } from "react";
import { checkTokenValidity, loginUser, logoutUser, registerUser } from "@/services/authService";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { AuthContext } from "./AuthContext";
import { checkExistingClient } from "@/services/clientsService";
import { findOwnUser } from "@/services/userService";
import { AuthResponse } from "@/types/AuthResponse";
import { PropsUrl } from "@/router/guards/typeGuards";
import { User } from "@/types/User";

export const AuthProvider = ({ children }: PropsUrl) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null); 
  const [hasClient, setHasClient] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Verifica si el token es válido y actualiza los estados.
   */
  const checkAuth = async (): Promise<AuthResponse> => {
    try {
      const valid = await checkTokenValidity();
      if (!valid) {
        setIsAuthenticated(false);
        setUser(null);
        setHasClient(null);
        setLoading(false);
        return { success: false, message: "Token inválido o expirado" };
      }

      const userData = await findOwnUser();
      console.log(userData)
      setUser(userData);
      setIsAuthenticated(true);

      if (userData.rol === "user") {
        const exists = await checkExistingClient();
        setHasClient(exists);
      } else {
        setHasClient(null);
      }

      setLoading(false);
      return { success: true, message: "Autenticación validada" };
    } catch (error: any) {
      console.error("Error en checkAuth:", error);
      setIsAuthenticated(false);
      setUser(null);
      setHasClient(null);
      setLoading(false);
      const message = error.response?.data?.message || "Error inesperado en autenticación";
      return { success: false, message };
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Inicia sesión del usuario.
   */
  const login = async (payload: LoginCredentials): Promise<AuthResponse> => {
    try {
      const data = await loginUser(payload);
      if (data?.access_token) {
        await checkAuth();
        return { success: true, message: "Inicio de sesión exitoso" };
      } else {
        return { success: false, message: "No se pudo iniciar sesión" };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error en la autenticación";
      return { success: false, message };
    }
  };

  /**
   * Registra un usuario tipo cliente.
   */
  const clientUserRegister = async (payload: RegisterCredentials): Promise<AuthResponse> => {
    try {
      const data = await registerUser(payload);
      if (data?.access_token) {
        await checkAuth();
        return { success: true, message: "Registro exitoso" };
      } else {
        return { success: false, message: "Error al registrar usuario" };
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error en el registro";
      return { success: false, message };
    }
  };

  /**
   * Cierra la sesión.
   */
  const logout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    setHasClient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        hasClient,
        login,
        clientUserRegister,
        logout,
        loading,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
