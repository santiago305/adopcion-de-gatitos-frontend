import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginCredentials, RegisterCredentials } from "@/validations/validationstype";
import { checkTokenValidity, loginUser, registerUser } from "@/services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (payload: LoginCredentials) => Promise<void>;
  register: (payload: RegisterCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Verificar token en el inicio
  const checkAuth = async () => {
    const valid = await checkTokenValidity();
    if (valid) {
      const response = await fetch("/auth/me", { credentials: "include" });
      const data = await response.json();
      setUserRole(data.role);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); 
  }, []);

  const login = async (payload: LoginCredentials) => {
    const data = await loginUser(payload);
    if (data?.access_token) {
      setIsAuthenticated(true);
      // También puedes guardar el rol aquí si lo deseas
    }
  };

  const register = async (payload: RegisterCredentials) => {
    const data = await registerUser(payload);
    if (data?.access_token) {
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        register,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
