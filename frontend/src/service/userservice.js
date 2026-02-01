import api from "../api/axios";

export const getAllUsers = () => api.get("/auth");

export const updateUserRole = (id, role) =>
  api.put(`/auth/users/${id}/role`, { role });

export const deleteUser = (id) =>
  api.delete(`/auth/${id}`);

export const createUser = (data) =>
  api.post("/auth/register", data);