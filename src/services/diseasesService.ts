import axiosInstance from "@/common/utils/axios";
import { API_DISEASES_GROUP } from "./APIs";
import { ApiDiseasesResponse, CreateDiseaseDto, UpdateDiseaseDto } from "@/types/Diseases";

/**
 * Crea una nueva enfermedad.
 * @param {CreateDiseaseDto} payload - Datos de la enfermedad.
 * @returns {Promise<any>} Respuesta del servidor.
 */
export const createDisease = async (payload: CreateDiseaseDto): Promise<ApiDiseasesResponse> => {
  const response = await axiosInstance.post(API_DISEASES_GROUP.create, payload);
  return response.data;
};

/**
 * Obtiene todas las enfermedades.
 * @returns {Promise<any[]>} Lista de enfermedades.
 */
export const findAllDiseases  = async () => {
  const response = await axiosInstance.get(API_DISEASES_GROUP.findAll);
  return response.data?.data || [];
};

/**
 * Busca una enfermedad por ID.
 * @param {string} id - ID de la enfermedad.
 * @returns {Promise<any>} Datos de la enfermedad.
 */
export const findDiseaseById = async (id: string) => {
  const response = await axiosInstance.get(API_DISEASES_GROUP.findById(id));
  return response.data;
};

/**
 * Actualiza una enfermedad.
 * @param {string} id - ID de la enfermedad.
 * @param {UpdateDiseaseDto} payload - Datos actualizados.
 * @returns {Promise<any>} Respuesta del servidor.
 */
export const updateDisease = async (id: string, payload: UpdateDiseaseDto) => {
  const response = await axiosInstance.patch(API_DISEASES_GROUP.update(id), payload);
  return response.data;
};

/**
 * Elimina (soft delete) una enfermedad.
 * @param {string} id - ID de la enfermedad.
 * @returns {Promise<any>} Respuesta del servidor.
 */
export const removeDiseases = async (id: string) => {
  const response = await axiosInstance.patch(API_DISEASES_GROUP.remove(id));
  return response.data;
};

/**
 * Restaura una enfermedad eliminada.
 * @param {string} id - ID de la enfermedad.
 * @returns {Promise<any>} Respuesta del servidor.
 */
export const restoreDisease = async (id: string) => {
  const response = await axiosInstance.patch(API_DISEASES_GROUP.restore(id));
  return response.data;
};
