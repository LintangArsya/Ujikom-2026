function MaintenanceCard({
  data,
  canEdit = false,
  canUpdateStatus = false,
  onDelete,
  onUpdateStatus,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
      <div>
        <h2 className="font-semibold text-lg">
          {data.assetName}
        </h2>
        <p className="text-sm text-gray-500">
          Request oleh: {data.requesterName}
        </p>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>Keluhan: {data.description}</p>
        <p>Status: <span className="font-medium">{data.status}</span></p>
        <p>Tanggal: {new Date(data.createdAt).toLocaleDateString()}</p>
      </div>

      {(canEdit || canUpdateStatus) && (
        <div className="flex gap-2 mt-auto">
          {canUpdateStatus && (
            <button
              onClick={() => onUpdateStatus("done")}
              className="flex-1 bg-green-600 text-white py-1 rounded"
            >
              Selesai
            </button>
          )}

          {canEdit && (
            <button
              onClick={onDelete}
              className="flex-1 bg-red-500 text-white py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MaintenanceCard;
