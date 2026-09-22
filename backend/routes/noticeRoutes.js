import express from "express";
import { createNotice, getNotices, deleteNotice } from "../controllers/noticeController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router();
router.get("/", protect, getNotices);
router.post("/", protect, authorize("admin", "teacher"), createNotice);
router.delete("/:id", protect, authorize("admin"), deleteNotice);
export default router;
