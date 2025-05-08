import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

export const isTokenStructurallyValid = (): boolean => {
  const token = Cookies.get('access_token');
  if (!token) return false;

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
};

export const isTokenValidWithServer = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/validate-token`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
};
