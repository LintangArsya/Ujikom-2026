import express from "express";
import { register, login, updateUserRole, getAllUsers, getUserById, deleteUser } from "../controllers/authController.js";
import { allowRoles, verifyToken } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login);
router.put("/users/:userId/role", verifyToken, allowRoles("admin"), updateUserRole)
router.get("/",  verifyToken, allowRoles("admin", "direksi"), getAllUsers)
router.get("/:id",  verifyToken, allowRoles("admin", "direksi"), getUserById)
router.delete("/:id",  verifyToken, allowRoles("admin"),  deleteUser);


export default router