import express from "express";
import {
  markAttendance, getClassAttendance, getStudentAttendance, getMyAttendance,
} from "../controllers/attendanceController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, authorize("student"), getMyAttendance);
router.post("/", protect, authorize("teacher"), markAttendance);
router.get("/class/:classId", protect, authorize("admin", "teacher"), getClassAttendance);
router.get("/student/:studentId", protect, authorize("admin", "teacher", "parent"), getStudentAttendance);

export default router;
