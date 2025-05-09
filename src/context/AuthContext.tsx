import { createContext } from "react";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (payload: LoginCredentials) => Promise<void>;
  register: (payload: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
