import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/useAuth";

import {
  getAllMaintenance,
  getTechnicians,
  assignTechnician,
  completeMaintenance,
  deleteMaintenance
} from "../../service/maintenanceservice";

import { getAllAssets } from "../../service/assetservice";

import MaintenanceTable from "../../components/maintenance/maintenacetable.jsx";
import CreateMaintenanceModal from "../../components/maintenance/createmaintenacemodal.jsx";

const MaintenancePage = () => {
  const { user, loading } = useAuth();

  const [data, setData] = useState([]);
  const [assets, setAssets] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllMaintenance();
      setData(res.data);

      if (user.role === "admin") {
        const tech = await getTechnicians();
        setTechnicians(tech.data);
      }

      if (user.role === "karyawan") {
        const assetRes = await getAllAssets();
        setAssets(assetRes.data);
      }
    } catch (err) {
      console.error(err);
      alert("Gagal ambil data maintenance");
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && user) {
      fetchData();
    }
  }, [loading, user, fetchData]);

  const handleAssign = async (id, techId) => {
    await assignTechnician(id, techId);
    fetchData();
  };

  const handleComplete = async (id, result) => {
    await completeMaintenance(id, result);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus request ini?")) return;
    await deleteMaintenance(id);
    fetchData();
  };

  if (loading || loadingData) {
    return <div className="p-6">Loading maintenance...</div>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Maintenance Requests
        </h1>

        {user.role === "karyawan" && (
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Request Maintenance
          </button>
        )}
      </div>

      <MaintenanceTable
        data={data}
        role={user.role}
        technicians={technicians}
        onAssign={handleAssign}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />

      <CreateMaintenanceModal
        open={openModal}
        assets={assets}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default MaintenancePage;
