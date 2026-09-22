import mongoose from "mongoose";
const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    classRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom", required: true },
    subject: { type: String, required: true },
    maxMarks: { type: Number, required: true, default: 100 },
    passingMarks: { type: Number, required: true, default: 33 },
    examDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  },
  { timestamps: true }
);
export default mongoose.model("Exam", examSchema);
