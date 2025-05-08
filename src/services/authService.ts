import axiosInstance from "@/utils/axios";
import { API_AUTH_GROUP } from "./APIs"
import { 
  LoginCredentials, 
  RegisterCredentials 
} from "@/validations/validationstype";

export const loginUser = async (payload: LoginCredentials) => {
  const response = await axiosInstance.post(API_AUTH_GROUP.authentication, payload,{withCredentials: true,});
  return response.data;
};

export const registerUser = async (payload: RegisterCredentials) => {
  const response = await axiosInstance.post(API_AUTH_GROUP.register, payload,{withCredentials: true,})
  return response.data;
}

export const checkTokenValidity = async () => {
  try {
    const response = await axiosInstance.get(API_AUTH_GROUP.validateToken);
    return response.data.message === 'Token es válido';
  } catch (error) {
    console.error("Token no válido o expirado", error);
    return false;
  }
};
