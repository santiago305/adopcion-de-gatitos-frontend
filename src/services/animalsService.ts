import axiosInstance from "@/common/utils/axios";
import { API_ANIMALS_GROUP } from "./APIs";

// 🔍 Obtener animales paginados
export const getAnimalsPaginated = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(`${API_ANIMALS_GROUP.findAll}?page=${page}&limit=${limit}`);
  return response.data.data;
};

// 🔍 Buscar animales por nombre
export const searchAnimalsByName = async (name: string) => {
  const response = await axiosInstance.get(API_ANIMALS_GROUP.searchByName(name));
  return response.data.data || []; // Devuelve solo el array directamente
};

// 🔍 Obtener un animal por ID
export const getAnimalById = async (id: string) => {
  const response = await axiosInstance.get(API_ANIMALS_GROUP.findById(id));
  return response.data;
};

// 🐶 Crear nuevo animal
export const createAnimal = async (data: any) => {
  const response = await axiosInstance.post(API_ANIMALS_GROUP.create, data);
  return response.data;
};

// ✏️ Actualizar animal
export const updateAnimal = async (id: string, data: any) => {
  const response = await axiosInstance.patch(API_ANIMALS_GROUP.update(id), data);
  return response.data;
};

// 🗑 Eliminar (soft delete) animal
export const deleteAnimal = async (id: string) => {
  const response = await axiosInstance.patch(API_ANIMALS_GROUP.remove(id));
  return response.data;
};

// 🔁 Restaurar animal eliminado
export const restoreAnimal = async (id: string) => {
  const response = await axiosInstance.patch(API_ANIMALS_GROUP.restore(id));
  return response.data;
};

// 📸 Subir imagen
export const uploadAnimalImage = async (file: File) => {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await axiosInstance.post(API_ANIMALS_GROUP.uploadImage, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
