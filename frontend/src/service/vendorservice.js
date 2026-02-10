import api from "../api/axios";

export const getAllVendors = () => api.get("/vendors")
export const getVendorsById = (id) => api.get(`/vendors/${id}`)
export const createVendor = (data) => api.post("/vendors", data)
export const updateVendor = (id, data) => api.put(`/vendors/${id}`, data)
export const deleteVendor = (id) => api.delete(`/vendors/${id}`)