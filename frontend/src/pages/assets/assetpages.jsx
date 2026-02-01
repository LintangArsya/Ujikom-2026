import { useEffect, useState } from "react";
import { getAllAssets, getAssetById } from "../../service/assetservice";
import AssetCard from "../../components/assets/assetcard";
import AssetDetailModal from "../../components/assets/assetsdetailmodal";

const AssetPage = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllAssets().then(res => setAssets(res.data));
  }, []);

  const openDetail = async (id) => {
    const res = await getAssetById(id);
    setSelectedAsset(res.data);
    setOpen(true);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Assets</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {assets.map(asset => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onClick={openDetail}
          />
        ))}
      </div>

      <AssetDetailModal
        open={open}
        asset={selectedAsset}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default AssetPage;
