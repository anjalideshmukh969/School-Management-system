import express from "express";
import { login, getMe, changePassword, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

export default router;
