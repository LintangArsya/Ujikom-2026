import api from "../api/axios";

export const getAllAssets = () => api.get("/assets");
export const getAssetById = (id) => api.get(`/assets/${id}`);