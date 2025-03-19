const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], required: true },
  salary: { type: String, required: true }, // Single salary value
  skillsRequired: { type: [String], required: true }, // List of skills
  experienceRequired: { type: String, required: true }, // Example: "0-2 years"
  qualifications: { type: String, required: true }, // Example: "B.Tech, MCA"
  applicationDeadline: { type: Date, required: true },
  workMode: { type: String, enum: ["Remote", "Onsite", "Hybrid"], required: true },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" },
  createdAt: { type: Date, default: Date.now } // Timestamp when job was posted
});

module.exports = mongoose.model("Job", JobSchema);


