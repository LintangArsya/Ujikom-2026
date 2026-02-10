const AssetDetailModal = ({ open, onClose, asset }) => {
  if (!open || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Detail Asset
        </h2>

        <div className="space-y-2 text-sm">
          <p><b>Kode:</b> {asset.asset_code || "-"}</p>
          <p><b>Nama:</b> {asset.asset_name || "-"}</p>
          <p><b>Kategori:</b> {asset.category || "-"}</p>
          <p><b>Jumlah:</b> {asset.quantity ?? 0}</p>
          <p><b>Maintenance:</b> {asset.maintenance_quantity ?? 0}</p>
          <p><b>Tersedia:</b> {asset.available_quantity ?? 0}</p>
          <p><b>Status:</b> {asset.asset_status || "-"}</p>
          <p><b>Kondisi:</b> {asset.condition_status || "-"}</p>
          <p><b>Tanggal Beli:</b> {asset.purchase_date || "-"}</p>

          {/* Bagian finansial (hanya muncul untuk admin & direksi) */}
          {asset.acquisition_price !== undefined && (
            <p><b>Harga Perolehan:</b> {asset.acquisition_price}</p>
          )}

          {asset.current_value !== undefined && (
            <p><b>Nilai Saat Ini:</b> {asset.current_value || "-"}</p>
          )}

          {asset.installment_value !== undefined && (
            <p><b>Nilai Cicilan:</b> {asset.installment_value || "-"}</p>
          )}

          {asset.installment_tenor !== undefined && (
            <p><b>Tenor Cicilan:</b> {asset.installment_tenor || "-"} bulan</p>
          )}

          {asset.installment_remaining !== undefined && (
            <p><b>Sisa Cicilan:</b> {asset.installment_remaining || "-"}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-200 px-4 py-2 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AssetDetailModal;
