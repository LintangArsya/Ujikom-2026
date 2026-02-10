import express from "express"
import { createVendors, getAllVendor, getVendorsByID, updateVendors, deleteVendors } from "../controllers/vendorController.js"
import { verifyToken, allowRoles } from "../middlewares/auth_middleware.js"

const router = express.Router();

router.get("/", getAllVendor)
router.get("/:id", getVendorsByID)
router.post("/", verifyToken, allowRoles("admin") ,createVendors )
router.put("/:id", verifyToken, allowRoles("admin"), updateVendors)
router.delete("/:id", verifyToken, allowRoles("admin"), deleteVendors)

export default router