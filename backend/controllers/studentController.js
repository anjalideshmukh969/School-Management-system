import Student from "../models/Student.js";
import User from "../models/User.js";

// Creates the User (login) + Student (profile) together in one call
export const createStudent = async (req, res, next) => {
  try {
    const {
      name, email, password, phone,
      admissionNumber, rollNumber, classRoom, dateOfBirth, gender,
      guardianName, guardianPhone, address, category, bloodGroup, aparId,
    } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: "A user with this email already exists" });

    const user = await User.create({ name, email, password, phone, role: "student" });

    const student = await Student.create({
      user: user._id, admissionNumber, rollNumber, classRoom, dateOfBirth, gender,
      guardianName, guardianPhone, address, category, bloodGroup, aparId,
    });

    res.status(201).json({ student: await student.populate(["user", "classRoom"]) });
  } catch (err) {
    next(err);
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.classRoom) filter.classRoom = req.query.classRoom;

    const students = await Student.find(filter)
      .populate("user", "name email phone")
      .populate("classRoom", "name section")
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (err) {
    next(err);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("classRoom", "name section");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    // soft delete — keeps academic history intact instead of destroying records
    const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deactivated" });
  } catch (err) {
    next(err);
  }
};

// For a logged-in student to see their own profile
export const getMyStudentProfile = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id })
      .populate("user", "name email phone")
      .populate("classRoom", "name section");
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    res.json(student);
  } catch (err) {
    next(err);
  }
};
