import { createContext } from "react";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

/**
 * Tipo de contexto de autenticación.
 * 
 * Define la estructura de los valores que estarán disponibles 
 * a través del AuthContext.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  hasClient: boolean | null;
  login: (payload: LoginCredentials) => Promise<void>;
  clientUserRegister: (payload: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean;
}

/**
 * Contexto de autenticación de la aplicación.
 * 
 * Se utiliza para compartir el estado de autenticación, roles 
 * de usuario, y métodos de login, logout y verificación de sesión 
 * entre los componentes.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
