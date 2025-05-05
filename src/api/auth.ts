import axios from "axios";
import { API_AUTH_GROUP } from "./APIs"
import { 
  LoginCredentials, 
  RegisterCredentials 
} from "@/validations/validationstype";

export const loginUser = async (payload: LoginCredentials) => {
  const response = await axios.post(API_AUTH_GROUP.authentication, payload);
  return response.data;
};

export const registerUser = async (payload: RegisterCredentials) => {
  const response = await axios.post(API_AUTH_GROUP.register, payload)
  return response.data;
}