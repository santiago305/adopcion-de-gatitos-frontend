import axiosInstance from "@/common/utils/axios";
import { CreateDiseaseDto, UpdateDiseaseDto } from "@/types/Diseases";
import { API_DISEASES_GROUP } from "./APIs";


export const diseasesService = {
  create: (data: CreateDiseaseDto) => axiosInstance.post(API_DISEASES_GROUP.create, data),
  findAll: () => axiosInstance.get(API_DISEASES_GROUP.findAll),
  findById: (id: string) => axiosInstance.get(API_DISEASES_GROUP.findById(id)),
  update: (id: string, data: UpdateDiseaseDto) => axiosInstance.patch(API_DISEASES_GROUP.update(id), data),
  remove: (id: string) => axiosInstance.patch(API_DISEASES_GROUP.remove(id)),
  restore: (id: string) => axiosInstance.patch(API_DISEASES_GROUP.restore(id)),
};