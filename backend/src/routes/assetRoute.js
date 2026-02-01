import express from "express"
import {getAllAsset, getAssetById, createAsset, updateAsset, deleteAsset, getAssetByCode } from "../controllers/assetController.js"
import { verifyToken, allowRoles } from "../middlewares/auth_middleware.js"

const router = express.Router();

router.get("/", verifyToken, allowRoles("admin", "direksi", "karyawan", "teknisi"), getAllAsset);
router.get("/:id", verifyToken, allowRoles("admin", "direksi", "karyawan", "teknisi"), getAssetById);
router.get("/code/:asset_code", allowRoles("admin", "direksi", "karyawan", "teknisi"), verifyToken, getAssetByCode);
router.post("/", verifyToken, allowRoles("admin"), createAsset);
router.put("/:id", verifyToken, allowRoles("admin"), updateAsset);
router.delete("/:id", verifyToken, allowRoles("admin"), deleteAsset)

export default router