const AssetCard = ({ asset, onClick }) => {
  return (
    <div
      onClick={() => onClick(asset.id)}
      className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md transition"
    >
      <h3 className="font-semibold">{asset.asset_name}</h3>

      <p className="text-sm text-gray-600">
        Code: {asset.asset_code}
      </p>

      <p className="text-sm">Kategori: {asset.category}</p>
      <p className="text-sm">Jumlah: {asset.quantity}</p>

      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
        {asset.asset_status}
      </span>
    </div>
  );
};

export default AssetCard;
