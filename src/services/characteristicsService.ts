import axiosInstance from "@/common/utils/axios";
import { API_CHARACTERISTICS_GROUP } from "./APIs";
import {
  CreateCharacteristicsDto,
  UpdateCharacteristicsDto,
  ApiCharacteristicsResponse,
} from "@/types/Characteristics";

/**
 * Crea una nueva característica.
 */
export const createCharacteristic = async (
  payload: CreateCharacteristicsDto
): Promise<ApiCharacteristicsResponse> => {
  const response = await axiosInstance.post(
    API_CHARACTERISTICS_GROUP.create,
    payload
  );
  return response.data;
};

/**
 * Obtiene todas las características paginadas.
 */
export const findAllCharacteristics = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(
    `${API_CHARACTERISTICS_GROUP.findAll}?page=${page}&limit=${limit}`
  );
  return response.data.data;
};

/**
 * Actualiza una característica.
 */
export const updateCharacteristic = async (
  id: string,
  payload: UpdateCharacteristicsDto
) => {
  const response = await axiosInstance.patch(
    API_CHARACTERISTICS_GROUP.update(id),
    payload
  );
  return response.data;
};

/**
 * Elimina (soft delete) una característica.
 */
export const removeCharacteristic = async (id: string) => {
  const response = await axiosInstance.patch(
    API_CHARACTERISTICS_GROUP.remove(id)
  );
  return response.data;
};

/**
 * Restaura una característica eliminada.
 */
export const restoreCharacteristic = async (id: string) => {
  const response = await axiosInstance.patch(
    API_CHARACTERISTICS_GROUP.restore(id)
  );
  return response.data;
};

/**
 * Busca características por cualquier palabra clave (color, tamaño, personalidad, etc).
 */
export const searchCharacteristicsByKeyword = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(`/characteristics/searchByKeyword?keyword=${keyword}`);
    
    if (response.data?.type === "success") {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("[searchCharacteristicsByKeyword] Error:", error);
    return [];
  }
};

/**
 * Obtiene todas las características sin paginación, útil para selects.
 */
export const getAllCharacteristics = async () => {
  try {
    const res = await axiosInstance.get(`${API_CHARACTERISTICS_GROUP.findAll}?page=1&limit=1000`);
    return res.data.data?.data || [];

  } catch (error) {
    console.error("[getPersonalities] Error:", error);
    return [];
  }
};
