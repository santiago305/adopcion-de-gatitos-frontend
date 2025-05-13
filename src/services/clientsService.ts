import axiosInstance from "@/common/utils/axios";
import { CreateClientsDto } from "@/types/clients";
import { API_CLIENTS_GROUP } from "./APIs";

/**
 * Crea un nuevo cliente.
 * @param {CreateClientsDto} payload - Datos del cliente.
 * @returns {Promise<any>} Respuesta del servidor.
 */
export const createClients = async (payload: CreateClientsDto) => {
  const response = await axiosInstance.post(API_CLIENTS_GROUP.createClients, payload);
  return response.data;
}

/**
 * Verifica si existe un cliente asociado al usuario actual.
 * @returns {Promise<any>} Respuesta booleana del servidor.
 */
export const checkExistingClient = async () => {
  const response = await axiosInstance.get(API_CLIENTS_GROUP.checkExistingClient);
  return response.data;
}