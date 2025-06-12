import axiosInstance from "@/common/utils/axios";
import { API_SPECIES_GROUP } from "./APIs";
import { ApiSpeciesResponse, CreateSpeciesDto, UpdateSpeciesDto } from "@/types/Species";


/**
 * Crea una nueva especie.
 */
export const createSpecies = async (payload: CreateSpeciesDto): Promise<ApiSpeciesResponse> => {
  const response = await axiosInstance.post(API_SPECIES_GROUP.create, payload);
  return response.data;
};

/**
 * Obtiene todas las especies.
 */
export const findAllSpecies = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(`${API_SPECIES_GROUP.findAll}?page=${page}&limit=${limit}`);
  return response.data.data;
};

export const getAllSpeciesForSelect = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const response = await axiosInstance.get(`${API_SPECIES_GROUP.findAll}?page=1&limit=1000`);
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("[getAllSpeciesForSelect] Error:", error);
    return [];
  }
};
/**
 * Actualiza una especie.
 */
export const updateSpecies = async (id: string, payload: UpdateSpeciesDto) => {
  const response = await axiosInstance.patch(API_SPECIES_GROUP.update(id), payload);
  return response.data;
};

/**
 * Elimina (soft delete) una especie.
 */
export const removeSpecies = async (id: string) => {
  const response = await axiosInstance.patch(API_SPECIES_GROUP.remove(id));
  return response.data;
};

/**
 * Restaura una especie eliminada.
 */
export const restoreSpecies = async (id: string) => {
  const response = await axiosInstance.patch(API_SPECIES_GROUP.restore(id));
  return response.data;
};

/**
 * Busca especies por nombre (búsqueda parcial).
 */
export const searchSpeciesByName = async (name: string) => {
  try {
    const response = await axiosInstance.get(`${API_SPECIES_GROUP.searchByName}?name=${name}`);
    if (response.data?.type === "success") {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error("[searchSpeciesByName] Error:", error);
    return [];
  }
};

export const getSpecies = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const res = await axiosInstance.get(`${API_SPECIES_GROUP.findAll}?page=1&limit=1000`);
    return res.data.data?.data || [];

  } catch (error) {
    console.error("[getSpecies] Error:", error);
    return [];
  }
};