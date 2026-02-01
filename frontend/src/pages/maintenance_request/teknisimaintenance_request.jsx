import { useEffect, useState } from "react";
import api from "../../api/axios";
import MaintenanceCard from "../../components/card/maintenancecard";

function TeknisiMaintenance() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/maintenance").then((res) => setTasks(res.data));
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await api.put(`/maintenance/${id}/status`, { status });
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status } : t
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Tasks</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {tasks.map((t) => (
          <MaintenanceCard
            key={t.id}
            data={t}
            canUpdateStatus
            onUpdateStatus={(status) =>
              handleUpdateStatus(t.id, status)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default TeknisiMaintenance;