const mongoose = require("mongoose");


const JobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobLocation: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: String, required: true },
});

module.exports = mongoose.model("Job", JobSchema);

