import { useState, useEffect } from "react";
import { checkTokenValidity, loginUser, registerUser } from "@/services/authService";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";
import { PropsUrl } from "@/guards/typeGuards";
import { AuthContext } from "./AuthContext";
import axiosInstance from "@/common/utils/axios";
import { API_USERS_GROUP } from "@/services/APIs";

export const AuthProvider = ({ children }: PropsUrl) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  const checkAuth = async () => {
    const valid = await checkTokenValidity();
    if (valid) {
      try {
        const response = await axiosInstance.get(API_USERS_GROUP.findOwnUser);
        const data = response.data.data;
        const role = data.rol
        setUserRole(role);
        setIsAuthenticated(true); 

      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        setIsAuthenticated(false); 
      }
    } else {
      setIsAuthenticated(false); 
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth(); 
  }, []);

  const login = async (payload: LoginCredentials) => {
    const data = await loginUser(payload);
    if (data?.access_token) {
      setIsAuthenticated(true);
      setUserRole(data.role);
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
        loading, 
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
