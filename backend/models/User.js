const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ["user"] },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: null }, 
  coverPhoto: { type: String, default: null }, 
  cvFile: { type: String, default: null },
});

module.exports = mongoose.model("user_logins", userSchema);
