import Teacher from "../models/Teacher.js";
import User from "../models/User.js";
export const createTeacher = async (req, res, next) => {
  try {
    const { name, email, password, phone, employeeId, subjects, qualification } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "A user with this email already exists" });
    const user = await User.create({ name, email, password, phone, role: "teacher" });
    const teacher = await Teacher.create({ user: user._id, employeeId, subjects, qualification });
    res.status(201).json({ teacher: await teacher.populate("user", "name email phone") });
  } catch (err) { next(err); }
};
export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({ isActive: true }).populate("user", "name email phone").populate("classesAssigned", "name section").sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) { next(err); }
};
export const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate("user", "name email phone").populate("classesAssigned", "name section");
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) { next(err); }
};
export const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) { next(err); }
};
export const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher deactivated" });
  } catch (err) { next(err); }
};
export const getMyTeacherProfile = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate("user", "name email phone").populate("classesAssigned", "name section");
    if (!teacher) return res.status(404).json({ message: "Teacher profile not found" });
    res.json(teacher);
  } catch (err) { next(err); }
};
