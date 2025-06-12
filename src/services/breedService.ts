import axiosInstance from "@/common/utils/axios";
import { API_BREED_GROUP } from "./APIs";
import { CreateBreedDto, UpdateBreedDto, ApiBreedResponse } from "@/types/Breed";

/**
 * Crea una nueva raza.
 */
export const createBreed = async (payload: CreateBreedDto): Promise<ApiBreedResponse> => {
  const response = await axiosInstance.post(API_BREED_GROUP.create, payload);
  return response.data;
};

/**
 * Obtiene todas las razas paginadas.
 */
export const findAllBreeds = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(`${API_BREED_GROUP.findAll}?page=${page}&limit=${limit}`);
  return response.data.data;
};

/**
 * Actualiza una raza.
 */
export const updateBreed = async (id: string, payload: UpdateBreedDto) => {
  const response = await axiosInstance.patch(API_BREED_GROUP.update(id), payload);
  return response.data;
};

/**
 * Elimina (soft delete) una raza.
 */
export const removeBreed = async (id: string) => {
  const response = await axiosInstance.patch(API_BREED_GROUP.remove(id));
  return response.data;
};

/**
 * Restaura una raza eliminada.
 */
export const restoreBreed = async (id: string) => {
  const response = await axiosInstance.patch(API_BREED_GROUP.restore(id));
  return response.data;
};

/**
 * Busca razas por nombre.
 */
export const searchBreedByName = async (name: string) => {
  try {
    const response = await axiosInstance.get(`${API_BREED_GROUP.searchByName}?name=${name}`);
    if (response.data?.type === "success") {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("[searchBreedByName] Error:", error);
    return [];
  }
};


export const getBreed = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const res = await axiosInstance.get(`${API_BREED_GROUP.findAll}?page=1&limit=1000`);
    return res.data.data?.data || [];

  } catch (error) {
    console.error("[getDiseases] Error:", error);
    return [];
  }
};

export const searchBreedBySpecies = async (speciesId: string) => {
  try {
    const response = await axiosInstance.get(`${API_BREED_GROUP.searchBySpecies}?speciesId=${speciesId}`);
    if (response.data?.type === "success") {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("[searchBreedBySpecies] Error:", error);
    return [];
  }
};
