const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "recruiter_logins", required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], required: true },
  salary: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  experienceRequired: { type: String, required: true },
  qualifications: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  workMode: { type: String, enum: ["Remote", "Onsite", "Hybrid"], required: true },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);
