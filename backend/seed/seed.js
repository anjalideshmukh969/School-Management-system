import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
dotenv.config();
const run = async () => {
  await connectDB();
  const existing = await User.findOne({ email: "admin@school.gov.in" });
  if (existing) { console.log("Admin already exists:", existing.email); process.exit(0); }
  const admin = await User.create({ name: "School Administrator", email: "admin@school.gov.in", password: "Admin@123", role: "admin" });
  console.log("Admin account created:");
  console.log("  email:", admin.email);
  console.log("  password: Admin@123");
  process.exit(0);
};
run().catch((err) => { console.error(err); process.exit(1); });
