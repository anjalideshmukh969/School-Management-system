import Fee from "../models/Fee.js";
import Student from "../models/Student.js";

export const createFeeRecord = async (req, res, next) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (err) {
    next(err);
  }
};

export const getStudentFees = async (req, res, next) => {
  try {
    const fees = await Fee.find({ student: req.params.studentId }).sort({ dueDate: 1 });
    res.json(fees);
  } catch (err) {
    next(err);
  }
};

export const recordPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: "Fee record not found" });

    fee.amountPaid += Number(amount);
    fee.paidDate = new Date();
    await fee.save();

    res.json(fee);
  } catch (err) {
    next(err);
  }
};

export const getMyFees = async (req, res, next) => {
  try {
    const student = await Student.findOne({ user: req.user._id });
    if (!student) return res.status(404).json({ message: "Student profile not found" });
    const fees = await Fee.find({ student: student._id }).sort({ dueDate: 1 });
    res.json(fees);
  } catch (err) {
    next(err);
  }
};
