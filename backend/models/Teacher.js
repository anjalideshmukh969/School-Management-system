import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    employeeId: { type: String, required: true, unique: true },
    subjects: [{ type: String }],
    qualification: { type: String },
    classesAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom" }],
    dateOfJoining: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Teacher", teacherSchema);
