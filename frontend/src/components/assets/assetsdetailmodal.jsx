const AssetDetailModal = ({ open, onClose, asset }) => {
  if (!open || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">
          Detail Asset
        </h2>

        <div className="space-y-2 text-sm">
          <p><b>Kode:</b> {asset.asset_code}</p>
          <p><b>Nama:</b> {asset.asset_name}</p>
          <p><b>Kategori:</b> {asset.category}</p>
          <p><b>Jumlah:</b> {asset.quantity}</p>
          <p><b>Maintenance:</b> {asset.maintenance_quantity}</p>
          <p><b>Tersedia:</b> {asset.available_quantity}</p>
          <p><b>Status:</b> {asset.asset_status}</p>
          <p><b>Kondisi:</b> {asset.condition_status}</p>

          {asset.acquisition_price !== undefined && (
            <>
              <p><b>Harga Beli:</b> {asset.acquisition_price}</p>
              <p><b>Nilai Saat Ini:</b> {asset.current_value}</p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 btn-secondary"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default AssetDetailModal;