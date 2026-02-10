import { useState } from "react";
import { createAsset, updateAsset } from "../../service/assetservice";

const AssetFormModal = ({ open, asset, isEdit, onClose, onSuccess }) => {
  const [assetCode, setAssetCode] = useState(asset?.asset_code || "");
  const [assetName, setAssetName] = useState(asset?.asset_name || "");
  const [category, setCategory] = useState(asset?.category || "");
  const [quantity, setQuantity] = useState(asset?.quantity || "");
  const [maintenanceQty, setMaintenanceQty] = useState(
    asset?.maintenance_quantity || ""
  );
  const [availableQty, setAvailableQty] = useState(
    asset?.available_quantity || ""
  );
  const [assetStatus, setAssetStatus] = useState(
    asset?.asset_status || "asset"
  );
  const [conditionStatus, setConditionStatus] = useState(
    asset?.condition_status || "baik"
  );

  const [acquisitionPrice, setAcquisitionPrice] = useState(
    asset?.acquisition_price || ""
  );
  const [currentValue, setCurrentValue] = useState(
    asset?.current_value || ""
  );

  const [installmentValue, setInstallmentValue] = useState(
    asset?.installment_value || ""
  );
  const [installmentTenor, setInstallmentTenor] = useState(
    asset?.installment_tenor || ""
  );
  const [installmentRemaining, setInstallmentRemaining] = useState(
    asset?.installment_remaining || ""
  );

  const [purchaseDate, setPurchaseDate] = useState(
    asset?.purchase_date || ""
  );

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        const data = {};

        if (assetCode)
            data.asset_code = assetCode;

        if (assetName)
            data.asset_name = assetName;

        if (category)
            data.category = category;

        if (quantity)
            data.quantity = Number(quantity);

        if (maintenanceQty)
            data.maintenance_quantity = Number(maintenanceQty);

        if (availableQty)
            data.available_quantity = Number(availableQty);

        if (assetStatus)
            data.asset_status = assetStatus;

        if (conditionStatus)
            data.condition_status = conditionStatus;

        if (currentValue)
            data.current_value = Number(currentValue);

        if (installmentValue)
            data.installment_value = Number(installmentValue);

        if (installmentRemaining)
            data.installment_remaining = Number(installmentRemaining);

        await updateAsset(asset.id, data);
        } else {
        const data = {
          asset_code: assetCode,
          asset_name: assetName,
          category,
          quantity,
          maintenance_quantity: maintenanceQty,
          available_quantity: availableQty,
          asset_status: assetStatus,
          condition_status: conditionStatus,
          acquisition_price: acquisitionPrice,
          current_value: currentValue,
          purchase_date: purchaseDate,
        };

        // hanya kirim field cicilan jika liabilitas
        if (assetStatus === "liability") {
          data.installment_value = installmentValue;
          data.installment_tenor = installmentTenor;
          data.installment_remaining = installmentRemaining;
        }

        await createAsset(data);
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.msg || "Gagal menyimpan asset");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Asset" : "Tambah Asset"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-3 text-sm"
        >
          {/* ================= EDIT MODE ================= */}
          {isEdit ? (
            <>
                <input
                placeholder="Kode Asset"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                placeholder="Nama Asset"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                placeholder="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Jumlah asset"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Jumlah maintenance"
                value={maintenanceQty}
                onChange={(e) => setMaintenanceQty(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Jumlah tersedia"
                value={availableQty}
                onChange={(e) => setAvailableQty(e.target.value)}
                className="border p-2 rounded"
                />

                <select
                value={assetStatus}
                onChange={(e) => setAssetStatus(e.target.value)}
                className="border p-2 rounded"
                >
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
                </select>

                <input
                placeholder="Kondisi"
                value={conditionStatus}
                onChange={(e) => setConditionStatus(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Nilai Saat Ini"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Nilai Cicilan"
                value={installmentValue}
                onChange={(e) => setInstallmentValue(e.target.value)}
                className="border p-2 rounded"
                />

                <input
                type="number"
                placeholder="Sisa Cicilan"
                value={installmentRemaining}
                onChange={(e) => setInstallmentRemaining(e.target.value)}
                className="border p-2 rounded"
                />
            </>
          ) : (
            /* ================= CREATE MODE ================= */
            <>
              <input
                placeholder="Kode Asset"
                value={assetCode}
                onChange={(e) => setAssetCode(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                placeholder="Nama Asset"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                placeholder="Kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Jumlah asset"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Jumlah maintenance"
                value={maintenanceQty}
                onChange={(e) => setMaintenanceQty(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Jumlah tersedia"
                value={availableQty}
                onChange={(e) => setAvailableQty(e.target.value)}
                className="border p-2 rounded"
                required
              />

              {/* dropdown asset status */}
              <select
                value={assetStatus}
                onChange={(e) => setAssetStatus(e.target.value)}
                className="border p-2 rounded"
                required
              >
                <option value="asset">Asset</option>
                <option value="liability">Liability</option>
              </select>

              <input
                placeholder="Kondisi"
                value={conditionStatus}
                onChange={(e) => setConditionStatus(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Harga Perolehan"
                value={acquisitionPrice}
                onChange={(e) => setAcquisitionPrice(e.target.value)}
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Nilai Saat Ini"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="border p-2 rounded"
                required
              />

              {/* field cicilan hanya jika liabilitas */}
              {assetStatus === "liability" && (
                <>
                  <input
                    type="number"
                    placeholder="Nilai Cicilan"
                    value={installmentValue}
                    onChange={(e) =>
                      setInstallmentValue(e.target.value)
                    }
                    className="border p-2 rounded"
                    required
                  />

                  <input
                    type="number"
                    placeholder="Tenor (bulan)"
                    value={installmentTenor}
                    onChange={(e) =>
                      setInstallmentTenor(e.target.value)
                    }
                    className="border p-2 rounded"
                    required
                  />

                  <input
                    type="number"
                    placeholder="Sisa Cicilan"
                    value={installmentRemaining}
                    onChange={(e) =>
                      setInstallmentRemaining(e.target.value)
                    }
                    className="border p-2 rounded col-span-2"
                    required
                  />
                </>
              )}

              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="border p-2 rounded col-span-2"
                required
              />
            </>
          )}

          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetFormModal;
