import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    admissionNumber: { type: String, required: true, unique: true },
    rollNumber: { type: String },
    classRoom: { type: mongoose.Schema.Types.ObjectId, ref: "ClassRoom", required: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    guardianName: { type: String },
    guardianPhone: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // linked parent login, optional
    address: { type: String },
    // Common in govt school records (PM Shree / UDISE alignment)
    aparId: { type: String }, // Automated Permanent Academic Registry ID
    category: { type: String, enum: ["General", "OBC", "SC", "ST", "EWS"] },
    bloodGroup: { type: String },
    admissionDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
