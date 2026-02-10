import { useState } from "react";
import { createMaintenance } from "../../service/maintenanceservice";

const CreateMaintenanceModal = ({
  open,
  assets,
  onClose,
  onSuccess
}) => {
  const [assetCode, setAssetCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [issue, setIssue] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await createMaintenance({
        asset_code: assetCode,
        quantity,
        issue_description: issue
        });

        onSuccess();
        onClose();
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.msg || "Gagal kirim request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Buat Maintenance Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            value={assetCode}
            onChange={(e) => setAssetCode(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Pilih Asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.asset_code}>
                {a.asset_code} - {a.asset_name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            placeholder="Deskripsi kerusakan"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceModal;
