const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, enum: ["full-time", "part-time", "remote"], required: true },
  salary: { type: String, required: true },
status: { type: String, enum: ["Active", "Closed"], default: "Active" },
});

module.exports = mongoose.model("Job_listing", jobSchema);
