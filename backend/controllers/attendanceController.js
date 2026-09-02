import Attendance from "../models/Attendance.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

// Teacher marks attendance for a whole class at once.
// Body: { classRoom, date, records: [{ student, status, remarks }] }
export const markAttendance = async (req, res, next) => {
  try {
    const { classRoom, date, records } = req.body;
    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) return res.status(403).json({ message: "Only teachers can mark attendance" });

    const day = new Date(date);
    day.setHours(0, 0, 0, 0);

    const ops = records.map((r) => ({
      updateOne: {
        filter: { student: r.student, date: day },
        update: {
          $set: {
            classRoom,
            status: r.status,
            remarks: r.remarks || "",
            markedBy: teacher._id,
          },
        },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(ops);
    res.json({ message: `Attendance marked for ${records.length} students` });
  } catch (err) {
    next(err);
  }
};

// GET /api/attendance/class/:classId?date=YYYY-MM-DD
export const getClassAttendance = async (req, res, next) => {
  try {
    const { classId } = req.params;
    const day = new Date(req.query.date || Date.now());
    day.setHours(0, 0, 0, 0);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const records = await Attendance.find({
      classRoom: classId,
      date: { $gte: day, $lt: nextDay },
    }).populate({ path: "student", populate: { path: "user", select: "name" } });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

// A student/parent's own attendance history + summary stats
export const getStudentAttendance = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const records = await Attendance.find({ student: student._id }).sort({ date: -1 });

    const total = records.length;
    const present = records.filter((r) => r.status === "present" || r.status === "late").length;
    const percentage = total ? Math.round((present / total) * 1000) / 10 : 0;

    res.json({ records, summary: { total, present, absent: total - present, percentage } });
  } catch (err) {
    next(err);
  }
};

export const getMyAttendance = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });

    const records = await Attendance.find({ student: student._id }).sort({ date: -1 });
    const total = records.length;
    const present = records.filter((r) => r.status === "present" || r.status === "late").length;
    const percentage = total ? Math.round((present / total) * 1000) / 10 : 0;

    res.json({ records, summary: { total, present, absent: total - present, percentage } });
  } catch (err) {
    next(err);
  }
};
