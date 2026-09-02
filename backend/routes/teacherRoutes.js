import express from "express";
import {
  createTeacher, getTeachers, getTeacherById,
  updateTeacher, deleteTeacher, getMyTeacherProfile,
} from "../controllers/teacherController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, authorize("teacher"), getMyTeacherProfile);

router.post("/", protect, authorize("admin"), createTeacher);
router.get("/", protect, authorize("admin"), getTeachers);
router.get("/:id", protect, authorize("admin"), getTeacherById);
router.put("/:id", protect, authorize("admin"), updateTeacher);
router.delete("/:id", protect, authorize("admin"), deleteTeacher);

export default router;
