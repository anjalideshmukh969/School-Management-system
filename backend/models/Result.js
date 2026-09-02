import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    marksObtained: { type: Number, required: true },
    grade: { type: String },
    remarks: { type: String },
    enteredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true }
);

resultSchema.index({ exam: 1, student: 1 }, { unique: true });

export default mongoose.model("Result", resultSchema);
