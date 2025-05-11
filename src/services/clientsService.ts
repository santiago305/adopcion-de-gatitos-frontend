import axiosInstance from "@/common/utils/axios";
import { CreateClientsDto } from "@/types/clients";
import { API_CLIENTS_GROUP } from "./APIs";

export const createClients = async (payload: CreateClientsDto) => {
  const response = await axiosInstance.post(API_CLIENTS_GROUP.createClients, payload);
  return response.data;
}
export const checkExistingClient = async () => {
  const response = await axiosInstance.post(API_CLIENTS_GROUP.checkExistingClient);
  return response.data;
}