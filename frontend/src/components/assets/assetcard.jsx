const AssetCard = ({ asset, onClick, role, onEdit, onDelete }) => {
  if (!asset) return null;

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <div onClick={() => onClick(asset.id)} className="cursor-pointer">
        <h3 className="font-semibold text-lg">
          {asset.asset_name || "-"}
        </h3>

        <p className="text-sm text-gray-600">
          Asset Code: {asset.asset_code || "-"}
        </p>

        <p className="text-sm">
          Kategori: {asset.category || "-"}
        </p>

        <p className="text-sm">
          Jumlah: {asset.quantity ?? 0}
        </p>

        <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
          {asset.asset_status || "-"}
        </span>
      </div>

      {/* admin only */}
      {role === "admin" && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onEdit(asset)}
            className="text-xs bg-yellow-400 px-2 py-1 rounded"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(asset.id)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
};

export default AssetCard;