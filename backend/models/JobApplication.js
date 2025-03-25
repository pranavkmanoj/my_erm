const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true }, 
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter_logins", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    resume: { type: String, required: true }, 
    coverLetter: { type: String }, 
    experience: { type: Number, required: true }, 
    skills: [{ type: String, required: true }],
    availability: { type: String, enum: ["Immediate", "1 Month", "2 Months", "More"], required: true }, 
    status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" }, 
    action: { type: String, enum: ["Pending", "Shortlist", "Interview"], default: "Pending" } 
  },
  { timestamps: true }
);

// 🔹 Index to allow multiple applications from the same user for different jobs
jobApplicationSchema.index({ userId: 1, jobId: 1 }, { unique: false });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
