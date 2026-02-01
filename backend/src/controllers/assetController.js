import {getAllAssetService, getAssetByIdService , createAssetService, updateAssetService, deleteAssetService, getAssetByCodeService } from "../services/assetService.js";

export const getAllAsset = async (req, res) => {
    try {
        const assets = await getAllAssetService(req.user.role);
        res.json(assets);
    }catch (err){
        res.status(500).json({
            msg : "Gagal mengambil data assset"
        })
    }
}

export const getAssetById = async (req, res) => {
    try{
        const asset = await getAssetByIdService(req.params.id, req.user.role);

        if(!asset) {
            return res.status(404).json({
                msg : "Asset tidak ditemukan"
            });
        }

        res.json(asset)
    }catch (err) {
        res.status(500).json({
            msg : "Gagal mengambil detail asset"
        })
    }
}

export const getAssetByCode = async (req, res) => {
  try {
    const { asset_code } = req.params;

    const asset = await getAssetByCodeService(asset_code, req.user.role);

    if (!asset) {
      return res.status(404).json({
        msg: "Asset tidak ditemukan"
      });
    }

    res.json(asset);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
};

export const createAsset = async (req, res) => {
    try {
        const id = await createAssetService(req.body);
        res.status(201).json({
            msg : "Asset berhasil ditambahkan",
            id
        });
    }catch (err) {
        res.status(400).json({
            msg : err.message
        })
    }
}


export const updateAsset = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // validasi body kosong
        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                msg: "Data update tidak boleh kosong"
            });
        }

        const affectedRows = await updateAssetService(id, data);

        // jika id tidak ditemukan
        if (affectedRows === 0) {
            return res.status(404).json({
                msg: "Asset tidak ditemukan"
            });
        }

        res.json({
            msg: "Asset berhasil diupdate"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Terjadi kesalahan server"
        });
    }
};

export const deleteAsset = async (req, res) => {
    try {
        const deleted = await deleteAssetService(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                message: "Asset tidak ditemukan"
            });
        }

        res.json({
            message: "Asset berhasil dihapus"
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus asset"
        });
    }
}