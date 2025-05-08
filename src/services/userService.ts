import axiosInstance from "@/common/utils/axios"
import { API_USERS_GROUP } from "./APIs"
import { CreateUserDto, UpdateUserDto } from "@/types/user"

export const createUser = async (payload: CreateUserDto) => {
  const response = await axiosInstance.post(API_USERS_GROUP.createUser, payload)
  return response.data
}
export const findAll = async (params: {
  page?: number;
  role?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}) => {
  const response = await axiosInstance.get(API_USERS_GROUP.findAll,{ params })
  return response.data
  
}
export const findActives = async (params: {
  page?: number;
  role?: string;
  sortBy?: string;
  order?: 'ASC' | 'DESC';
}) => {
  const response = await axiosInstance.get(API_USERS_GROUP.findActives,{ params })
  return response.data
}
export const findById = async (id: string) => {
  const response = await axiosInstance.get(API_USERS_GROUP.findById(id))
  return response.data
}
export const findOwnUser = async () => {
  const response = await axiosInstance.get(API_USERS_GROUP.findOwnUser)
  return response.data
}
export const findByEmail = async (email: string)  => {
  const response = await axiosInstance.get(API_USERS_GROUP.findByEmail(email))
  return response.data
}
export const updateUser = async (id: string, payload: UpdateUserDto) => {
  const response = await axiosInstance.patch(API_USERS_GROUP.updateUser(id), payload)
  return response.data
}
export const deleteUser = async (id: string) => {
  const response = await axiosInstance.patch(API_USERS_GROUP.deleteUser(id))
  return response.data
}
export const restoreUser = async (id: string) => {
  const response = await axiosInstance.patch(API_USERS_GROUP.restoreUser(id))
  return response.data
}
