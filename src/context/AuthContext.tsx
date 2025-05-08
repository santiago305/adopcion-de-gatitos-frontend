import { createContext, useEffect, useState } from 'react';
import { isTokenStructurallyValid, isTokenValidWithServer } from '@/utils/authJsCookie';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface User {
  id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const structurallyValid = isTokenStructurallyValid();
      if (!structurallyValid) return;

      const validWithServer = await isTokenValidWithServer();
      if (!validWithServer) return;

      // Obtener ID del token
      const token = Cookies.get('access_token');
      if (token) {
        const decoded: any = jwtDecode(token);
        setUser({ id: decoded.sub });
        setIsAuthenticated(true);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
