import api from "../api/axios";

export const getAllMaintenance = () => {
  return api.get("/maintenance");
};

export const getTechnicians = () => {
  return api.get("/maintenance/technicians");
};

export const createMaintenance = (data) => {
  return api.post("/maintenance", data);
};

export const assignTechnician = (id, technician_id) => {
  return api.put(`/maintenance/${id}/assign`, {
    technician_id
  });
};

export const completeMaintenance = (id, result_condition) => {
  return api.put(`/maintenance/${id}/complete`, {
    result_condition
  });
};

export const deleteMaintenance = (id) => {
  return api.delete(`/maintenance/${id}`);
};