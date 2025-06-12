import axiosInstance from "@/common/utils/axios";

// GET paginado
export const getAnimalsPaginated = async (page = 1, limit = 15) => {
  const response = await axiosInstance.get(`/animals?page=${page}&limit=${limit}`);
  return response.data.data; // donde data = { data: [], pagination: { ... } }
};
// DELETE
export const deleteAnimal = async (id: string) => {
  const res = await axiosInstance.get(`/animals/delete/${id}`, {
    method: "DELETE",
  });
  return res.data;
};

// SEARCH
export const searchAnimalByName = async (name: string) => {
  const res = await axiosInstance.get(`/animals/findByName/${name}`);
  return res.data;
};
