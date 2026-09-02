import express from "express";
import { upsertTimetable, getClassTimetable } from "../controllers/timetableController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/class/:classId", protect, getClassTimetable);
router.post("/", protect, authorize("admin"), upsertTimetable);

export default router;
