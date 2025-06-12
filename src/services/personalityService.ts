import axiosInstance from "@/common/utils/axios";
import { API_PERSONALITY_GROUP } from "./APIs";
import { CreatePersonalityDto, UpdatePersonalityDto, ApiPersonalityResponse } from "@/types/Personality";

/**
 * Crea una nueva personalidad.
 */
export const createPersonality = async (payload: CreatePersonalityDto): Promise<ApiPersonalityResponse> => {
  const response = await axiosInstance.post(API_PERSONALITY_GROUP.create, payload);
  return response.data;
};

/**
 * Obtiene todas las personalidades paginadas.
 */
export const findAllPersonalities = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(`${API_PERSONALITY_GROUP.findAll}?page=${page}&limit=${limit}`);
  return response.data.data;
};

/**
 * Actualiza una personalidad.
 */
export const updatePersonality = async (id: string, payload: UpdatePersonalityDto) => {
  const response = await axiosInstance.patch(API_PERSONALITY_GROUP.update(id), payload);
  return response.data;
};

/**
 * Elimina (soft delete) una personalidad.
 */
export const removePersonality = async (id: string) => {
  const response = await axiosInstance.patch(API_PERSONALITY_GROUP.remove(id));
  return response.data;
};

/**
 * Restaura una personalidad eliminada.
 */
export const restorePersonality = async (id: string) => {
  const response = await axiosInstance.patch(API_PERSONALITY_GROUP.restore(id));
  return response.data;
};

/**
 * Busca personalidades por nombre.
 */
export const searchPersonalityByName = async (name: string) => {
  try {
    const response = await axiosInstance.get(`${API_PERSONALITY_GROUP.searchByName}?name=${name}`);
    if (response.data?.type === "success") {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("[searchPersonalityByName] Error:", error);
    return [];
  }
};

export const getPersonalities = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const res = await axiosInstance.get(`${API_PERSONALITY_GROUP.findAll}?page=1&limit=1000`);
    return res.data.data?.data || [];

  } catch (error) {
    console.error("[getPersonalities] Error:", error);
    return [];
  }
};
