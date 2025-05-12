import axiosInstance from "@/common/utils/axios";
import { API_AUTH_GROUP } from "./APIs"
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

// Vamos a tipar los servicios ed autenticacion
interface AuthService {
  access_token: string;
  refresh_token?: string;
  role: string;
  [key: string]: any;
}

export const loginUser = async (payload: LoginCredentials):Promise<AuthService> => {
  try {
    const response = await axiosInstance.post(API_AUTH_GROUP.authentication, payload);
    return response.data;
  } catch (error) {
    console.error("error en loginUser",error);
    throw error;
  }
};

export const registerUser = async (payload: RegisterCredentials):Promise<AuthService> => {
  try {
    const response = await axiosInstance.post(API_AUTH_GROUP.register, payload)
    return response.data;
  } catch (error) {
    console.error("error en registerUser",error);
    throw error;
  }
}

export const checkTokenValidity = async () => {
  try {
    const response = await axiosInstance.get(API_AUTH_GROUP.validateToken);
    return response.data.message === 'Token es válido';
  } catch (error) {
    console.error("Token no válido o expirado", error);
    return false;
  }
}