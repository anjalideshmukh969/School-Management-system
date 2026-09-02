import mongoose from "mongoose";

// e.g. "Class 8 - Section A"
const classRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },        // "Class 8"
    section: { type: String, required: true },      // "A"
    classTeacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    subjects: [{ type: String }],
    academicYear: { type: String, required: true, default: () => `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` },
  },
  { timestamps: true }
);

classRoomSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

export default mongoose.model("ClassRoom", classRoomSchema);
