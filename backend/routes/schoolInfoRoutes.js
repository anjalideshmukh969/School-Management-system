import express from "express";
import { getSchoolInfo, updateSchoolInfo } from "../controllers/schoolInfoController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSchoolInfo); // public
router.put("/", protect, authorize("admin"), updateSchoolInfo);

export default router;
