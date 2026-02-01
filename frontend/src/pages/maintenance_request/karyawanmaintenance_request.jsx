import { useEffect, useState } from "react";
import api from "../../api/axios";
import MaintenanceCard from "../../components/card/maintenancecard";

function KaryawanMaintenance() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    api.get("/maintenance/my").then((res) => setRequests(res.data));
  }, []);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Maintenance Saya</h1>

      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        + Buat Request
      </button>

      <div className="grid gap-4 md:grid-cols-3">
        {requests.map((r) => (
          <MaintenanceCard key={r.id} data={r} />
        ))}
      </div>
    </div>
  );
}

export default KaryawanMaintenance;
