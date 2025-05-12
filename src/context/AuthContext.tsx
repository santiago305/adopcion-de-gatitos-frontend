import { createContext } from "react";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  hasClient: boolean | null;
  login: (payload: LoginCredentials) => Promise<void>;
  clientUserRegister: (payload: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
