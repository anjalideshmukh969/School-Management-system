import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    classRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom", required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["present", "absent", "leave", "late"], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
    remarks: { type: String },
  },
  { timestamps: true }
);

// one attendance record per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
