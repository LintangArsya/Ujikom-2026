import express from "express";
import {
  getAllMaintenance,
  getTechnicians,
  createMaintenance,
  assignTechnician,
  completeMaintenance,
  deleteMaintenance
} from "../controllers/maintenanceController.js";

import { verifyToken, allowRoles } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllMaintenance);

router.get(
  "/technicians",  verifyToken,  allowRoles("admin"), getTechnicians
);

router.post("/", verifyToken, allowRoles("karyawan"), createMaintenance);

router.put("/:id/assign", verifyToken, allowRoles("admin"), assignTechnician);

router.put("/:id/complete", verifyToken, allowRoles("teknisi"), completeMaintenance);

router.delete("/:id",  verifyToken,  allowRoles("admin"),  deleteMaintenance);

export default router;
