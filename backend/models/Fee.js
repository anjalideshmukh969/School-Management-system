import mongoose from "mongoose";
const feeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    academicYear: { type: String, required: true },
    feeType: { type: String, required: true },
    amountDue: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "partial", "paid"], default: "pending" },
    dueDate: { type: Date },
    paidDate: { type: Date },
  },
  { timestamps: true }
);
feeSchema.pre("save", function (next) {
  if (this.amountPaid >= this.amountDue) this.status = "paid";
  else if (this.amountPaid > 0) this.status = "partial";
  else this.status = "pending";
  next();
});
export default mongoose.model("Fee", feeSchema);
