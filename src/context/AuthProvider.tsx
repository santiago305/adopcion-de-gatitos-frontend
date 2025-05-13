import { useState, useEffect } from "react";
import { checkTokenValidity, loginUser, registerUser } from "@/services/authService";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { PropsUrl } from "@/guards/typeGuards";
import { AuthContext } from "./AuthContext";
import axiosInstance from "@/common/utils/axios";
import { API_USERS_GROUP } from "@/services/APIs";
import { checkExistingClient } from "@/services/clientsService";

/**
 * Proveedor de autenticación.
 * 
 * Maneja la lógica de autenticación, almacenamiento de tokens, 
 * verificación de roles y control de estados relacionados a 
 * la sesión del usuario. 
 * 
 * @param {PropsUrl} props Contiene los elementos hijos a renderizar.
 * @returns {JSX.Element} Contexto de autenticación aplicado a los componentes hijos.
 */
export const AuthProvider = ({ children }: PropsUrl) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hasClient, setHasClient] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Verifica la validez del token y actualiza los estados de autenticación.
   * También determina si el usuario tiene un cliente asociado (para el rol 'user').
   */
  const checkAuth = async () => {
    const valid = await checkTokenValidity();

    if (valid) {
      try {
        const response = await axiosInstance.get(API_USERS_GROUP.findOwnUser);
        const data = response.data.data;
        const role = data.rol;

        setUserRole(role);
        setIsAuthenticated(true);

        if (role === 'user') {
          const exists = await checkExistingClient();
          setHasClient(exists);
        } else {
          setHasClient(null);
        }
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        setIsAuthenticated(false);
        setHasClient(null);
      }
    } else {
      setIsAuthenticated(false);
      setHasClient(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Inicia sesión del usuario.
   * 
   * @param {LoginCredentials} payload Credenciales del usuario.
   */
  const login = async (payload: LoginCredentials) => {
    const data = await loginUser(payload);
    if (data?.access_token) {
      await checkAuth();
    }
  };

  /**
   * Registra a un cliente como usuario.
   * 
   * @param {RegisterCredentials} payload Datos de registro.
   * @returns {Promise<boolean>} `true` si el registro fue exitoso.
   */
  const clientUserRegister = async (payload: RegisterCredentials) => {
    try {
      const data = await registerUser(payload);
      if (data?.access_token) {
        await checkAuth();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en el registro de usuario:", error);
      return false;
    }
  };

  /**
   * Cierra la sesión actual del usuario.
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setHasClient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
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
