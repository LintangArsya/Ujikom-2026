import { useEffect, useState } from "react";
import api from "../../api/axios";
import MaintenanceCard from "../../components/card/maintenancecard";

function AdminMaintenance() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/maintenance").then((res) => setRequests(res.data));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/maintenance/${id}`);
    setRequests(requests.filter((r) => r.id !== id));
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Request</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {requests.map((r) => (
          <MaintenanceCard
            key={r.id}
            data={r}
            canEdit
            onDelete={() => handleDelete(r.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminMaintenance;