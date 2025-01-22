import axiosInstance from "../axiosInstance";
import { GetAllUsersResponse, UserResponse } from "./types";

async function getAll() {
  return await axiosInstance.get<GetAllUsersResponse>("/users");
}

async function edit({ id, data }: { id: string; data: any }) {
  const formData = new FormData();

  if (data.name) {
    formData.append("name", data.name);
  }

  if (data.surname) {
    formData.append("surname", data.surname);
  }

  if (data.email) {
    formData.append("email", data.email);
  }
  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  if (data.password) {
    formData.append("password", data.password);
  }

  return await axiosInstance.put<UserResponse>(`/users/${id}`, formData);
}

async function remove() {
  return await axiosInstance.delete(`/users/`);
}

async function changeRole({ id }: { id: string }) {
  return await axiosInstance.patch(`/users/${id}`);
}

const userService = {
  changeRole,
  getAll,
  edit,
  remove,
};

export default userService;
