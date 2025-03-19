const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "job_listing", required: true }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    resume: { type: String, required: true }, // 🔹 URL to Cloudinary/AWS
    coverLetter: { type: String }, // 🔹 Optional, can be a text input
    experience: { type: Number, required: true }, // 🔹 Years of experience
    skills: [{ type: String, required: true }], // 🔹 Array of skills
    availability: { type: String, enum: ["Immediate", "1 Month", "2 Months", "More"], required: true }, // 🔹 Dropdown options
    status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" }, // 🔹 Tracks application status
  },
  { timestamps: true }
);

// 🔹 Index to allow multiple applications from the same user for different jobs
jobApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: false });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
