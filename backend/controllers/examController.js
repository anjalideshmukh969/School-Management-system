import Exam from "../models/Exam.js";
import Result from "../models/Result.js";
import Student from "../models/Student.js";
export const createExam = async (req, res, next) => {
  try { const exam = await Exam.create(req.body); res.status(201).json(exam); } catch (err) { next(err); }
};
export const getExams = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.classRoom) filter.classRoom = req.query.classRoom;
    const exams = await Exam.find(filter).populate("classRoom", "name section").sort({ examDate: -1 });
    res.json(exams);
  } catch (err) { next(err); }
};
export const enterResults = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const { results } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });
    const gradeFor = (marks) => {
      const pct = (marks / exam.maxMarks) * 100;
      if (pct >= 90) return "A+";
      if (pct >= 75) return "A";
      if (pct >= 60) return "B";
      if (pct >= 45) return "C";
      if (pct >= exam.passingMarks) return "D";
      return "F";
    };
    const ops = results.map((r) => ({
      updateOne: {
        filter: { exam: examId, student: r.student },
        update: { $set: { marksObtained: r.marksObtained, grade: gradeFor(r.marksObtained), remarks: r.remarks || "" } },
        upsert: true,
      },
    }));
    await Result.bulkWrite(ops);
    res.json({ message: `Results entered for ${results.length} students` });
  } catch (err) { next(err); }
};
export const getExamResults = async (req, res, next) => {
  try {
    const results = await Result.find({ exam: req.params.examId }).populate({ path: "student", populate: { path: "user", select: "name" } }).populate("exam", "title maxMarks passingMarks subject");
    res.json(results);
  } catch (err) { next(err); }
};
export const getMyResults = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    const results = await Result.find({ student: student._id }).populate("exam", "title subject maxMarks passingMarks examDate").sort({ createdAt: -1 });
    res.json(results);
  } catch (err) { next(err); }
};
