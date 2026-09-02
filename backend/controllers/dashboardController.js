import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import ClassRoom from "../models/ClassRoom.js";
import Attendance from "../models/Attendance.js";
import Notice from "../models/Notice.js";

// Aggregate stats for the admin's landing dashboard
export const getAdminStats = async (req, res, next) => {
  try {
    const [totalStudents, totalTeachers, totalClasses, todayAttendanceCount] = await Promise.all([
      Student.countDocuments({ isActive: true }),
      Teacher.countDocuments({ isActive: true }),
      ClassRoom.countDocuments(),
      (() => {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        return Attendance.countDocuments({ date: { $gte: start, $lt: end }, status: "present" });
      })(),
    ]);

    const recentNotices = await Notice.find().sort({ createdAt: -1 }).limit(5).populate("postedBy", "name");

    res.json({
      totalStudents,
      totalTeachers,
      totalClasses,
      presentToday: todayAttendanceCount,
      recentNotices,
    });
  } catch (err) {
    next(err);
  }
};
