import mongoose from "mongoose";

/**
 * Singleton document holding the public-facing school profile —
 * shown on the About page before login. Editable only by admin.
 */
const schoolInfoSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Government Model School" },
    tagline: { type: String, default: "Empowering Every Child, Enriching Our Nation" },
    establishedYear: { type: Number, default: 1998 },
    udiseCode: { type: String, default: "" },
    affiliation: { type: String, default: "State Board" },
    principalName: { type: String, default: "" },
    principalMessage: { type: String, default: "" },
    about: {
      type: String,
      default: "Our school is committed to providing quality education to every child in our community, fostering academic excellence alongside strong values and life skills.",
    },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    facilities: [{ type: String }],
    achievements: [{ type: String }],
    studentStrength: { type: Number, default: 0 },
    teacherStrength: { type: Number, default: 0 },
    heroImageUrl: { type: String, default: "" },     // main banner photo of the school building
    galleryImages: [{ type: String }],                 // additional photos (campus, events, facilities)
  },
  { timestamps: true }
);

export default mongoose.model("SchoolInfo", schoolInfoSchema);
