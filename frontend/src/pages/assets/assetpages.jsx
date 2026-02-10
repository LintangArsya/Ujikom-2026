import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../auth/useAuth.js";
import {
  getAllAssets,
  getAssetById,
  deleteAsset
} from "../../service/assetservice";

import AssetCard from "../../components/assets/assetcard";
import AssetDetailModal from "../../components/assets/assetsdetailmodal";
import AssetFormModal from "../../components/assets/assetformmodal";

const AssetPage = () => {
  const { user, loading } = useAuth();
  const role = user?.role;

  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);

  const [openForm, setOpenForm] = useState(false);
  const [editAsset, setEditAsset] = useState(null);

  const [loadingData, setLoadingData] = useState(true);

  // sama seperti fetchUsers
  const fetchAssets = useCallback(async () => {
    try {
      const res = await getAllAssets();
      setAssets(res.data);
    } catch (err) {
      console.error("Gagal ambil asset", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) fetchAssets();
  }, [loading, fetchAssets]);

  const handleOpenDetail = async (id) => {
    try {
      const res = await getAssetById(id);
      setSelectedAsset(res.data);
      setOpenDetail(true);
    } catch (error) {
      console.error(error);
      alert("Gagal ambil detail asset");
    }
  };

  const handleCreate = () => {
    setEditAsset(null);
    setOpenForm(true);
  };

  const handleEdit = (asset) => {
    setEditAsset(asset);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (role !== "admin") return;

    if (!confirm("Yakin hapus asset ini?")) return;

    try {
      await deleteAsset(id);
      fetchAssets();
    } catch (error) {
      console.error(error);
      alert("Gagal hapus asset");
    }
  };

  if (loading || loadingData) {
    return <div className="p-6">Loading assets...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assets</h1>

        {role === "admin" && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Tambah Asset
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            role={role}
            onClick={handleOpenDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Detail modal */}
      <AssetDetailModal
        open={openDetail}
        asset={selectedAsset}
        onClose={() => setOpenDetail(false)}
      />

      {/* Form modal */}
      <AssetFormModal
        open={openForm}
        asset={editAsset}
        isEdit={Boolean(editAsset)}
        onClose={() => setOpenForm(false)}
        onSuccess={fetchAssets}
      />
    </>
  );
};

export default AssetPage;
