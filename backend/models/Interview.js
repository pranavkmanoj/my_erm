const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    jobApplicationId: { type: mongoose.Schema.Types.ObjectId, ref: "JobApplication", required: true },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiter", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    interviewDate: { type: Date, required: true },
    
    // Added fields from JobApplication
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    action: { type: String, default: "Interview" }  // Default action when scheduled
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
