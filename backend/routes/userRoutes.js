import express from "express";
import { createUser, getUsers, toggleUserActive } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router();
router.use(protect, authorize("admin"));
router.post("/", createUser);
router.get("/", getUsers);
router.patch("/:id/toggle-active", toggleUserActive);
export default router;
