import mongoose from "mongoose";
const schoolInfoSchema = new mongoose.Schema(
  {
    name: { type: String, default: "PM SHRI SCHOOL PARADSINGA" },
    tagline: { type: String, default: "Empowering Every Child, Enriching Our Nation" },
    establishedYear: { type: Number, default: 1996 },
    udiseCode: { type: String, default: "" },
    affiliation: { type: String, default: "State Board" },
    principalName: { type: String, default: "Sapna Puri" },
    principalPhotoUrl: { type: String, default: "" },
    principalMessage: { type: String, default: "" },
    about: { type: String, default: "Our school is committed to providing quality education to every child in our community, fostering academic excellence alongside strong values and life skills." },
    address: { type: String, default: "PM SHRI School Paradsinga, Tehsil Multai, District Betul, Madhya Pradesh" },
    phone: { type: String, default: "7389644236" },
    email: { type: String, default: "bhikondetarun20@gmail.com" },
    facilities: [{ type: String }],
    achievements: [{ type: String }],
    studentStrength: { type: Number, default: 0 },
    teacherStrength: { type: Number, default: 0 },
    heroImageUrl: { type: String, default: "" },
    galleryImages: [{ type: String }],
  },
  { timestamps: true }
);
export default mongoose.model("SchoolInfo", schoolInfoSchema);
