const MaintenanceTable = ({
  data,
  role,
  technicians,
  onAssign,
  onComplete,
  onDelete
}) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">Tidak ada data maintenance</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <div className="mb-2">
            <div className="font-semibold text-lg">
              {item.asset_code} - {item.asset_name}
            </div>
            <div className="text-sm text-gray-500">
              Request oleh: {item.requested_by}
            </div>
          </div>

          <div className="text-sm space-y-1 mb-3">
            <div>Qty: {item.quantity}</div>
            <div>Status: {item.status}</div>
            <div>Issue: {item.issue_description}</div>
            {item.assigned_to && (
              <div>Teknisi: {item.assigned_to}</div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-2">
            {/* ADMIN */}
            {role === "admin" && item.status === "pending" && (
              <select
                className="border p-2 rounded"
                onChange={(e) =>
                  onAssign(item.id, e.target.value)
                }
                defaultValue=""
              >
                <option value="">Assign teknisi</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
            )}

            {/* TEKNISI */}
            {role === "teknisi" &&
              item.status === "in_progress" && (
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() =>
                      onComplete(item.id, "baik")
                    }
                  >
                    Selesai (Baik)
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() =>
                      onComplete(item.id, "rusak")
                    }
                  >
                    Rusak
                  </button>
                </div>
              )}

            {/* ADMIN DELETE */}
            {role === "admin" && (
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded"
                onClick={() => onDelete(item.id)}
              >
                Hapus
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceTable;
