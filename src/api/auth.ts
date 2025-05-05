import axios from "axios";
import { API_AUTH_GROUP } from "./APIs"

export interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await axios.post(API_AUTH_GROUP.authentication, payload);
  return response.data;
};
