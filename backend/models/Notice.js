import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    // Who should see it. "all" = every role.
    audience: {
      type: String,
      enum: ["all", "teacher", "student", "parent"],
      default: "all",
    },
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);
