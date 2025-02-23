const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ["recruiter"] },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
});

module.exports = mongoose.model("recruiter_logins", recruiterSchema);
