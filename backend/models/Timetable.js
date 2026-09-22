import mongoose from "mongoose";
const periodSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);
const timetableSchema = new mongoose.Schema(
  {
    classRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom", required: true },
    day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], required: true },
    periods: [periodSchema],
  },
  { timestamps: true }
);
timetableSchema.index({ classRoom: 1, day: 1 }, { unique: true });
export default mongoose.model("Timetable", timetableSchema);
