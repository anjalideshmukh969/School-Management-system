import express from "express";
import {
  createFeeRecord, getStudentFees, recordPayment, getMyFees,
} from "../controllers/feeController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, authorize("student"), getMyFees);
router.post("/", protect, authorize("admin"), createFeeRecord);
router.get("/student/:studentId", protect, authorize("admin", "parent"), getStudentFees);
router.patch("/:id/pay", protect, authorize("admin"), recordPayment);

export default router;
