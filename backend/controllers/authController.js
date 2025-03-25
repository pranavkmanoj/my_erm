const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
require("dotenv").config();

// Register User or Recruiter
const register = async (req, res) => {
  try {
    console.log("Received Registration Data:", req.body);

    const { role, name, companyName, email, password, bio } = req.body;
    if (!role || !email || !password) {
      return res.status(400).json({ success: false, message: "Role, email, and password are required!" });
    }

    const Model = role === "user" ? User : role === "recruiter" ? Recruiter : null;
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid role specified!" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingUser || existingRecruiter) {
      return res.status(400).json({ success: false, message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      role,
      name: role === "user" ? name : undefined,
      companyName: role === "recruiter" ? companyName : undefined,
      email, 
      password: hashedPassword,
      bio: role === "recruiter" ? bio : undefined,
    });

    await newUser.save();

    return res.status(201).json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login User or Recruiter
const loginUser = async (req, res, userType) => {
  try {
    console.log(`[${userType.toUpperCase()}] Login request received:`, req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required!" });
    }

    const Model = userType === "user" ? User : userType === "recruiter" ? Recruiter : null;
    if (!Model) {
      return res.status(400).json({ error: "Invalid role specified!" });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: `${userType} not found! Please create a profile.` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password! Please try again." });
    }

    const payload = { id: user._id, role: userType };
    if (userType === "recruiter") {
      payload.recruiterId = user._id; // Ensure recruiterId is included
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log(`[${userType.toUpperCase()}] Login successful:`, user.email);
    res.status(200).json({
      token,
      role: userType,
      ...(userType === "recruiter" && { recruiterId: user._id }) // Include recruiterId only for recruiters
    });

  } catch (err) {
    console.error(`[${userType.toUpperCase()}] Login Error:`, err);
    res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};

// Fetch all recruiters
const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}, "-password"); // Exclude passwords for security
    res.json(recruiters);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    res.status(500).json({ error: "Failed to fetch recruiters" });
  }
};

// Fetch all registered users
const getAllUsers = async (req, res) => {
  try {
    // Fetch users (excluding passwords)
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};


module.exports = { register, loginUser, getAllRecruiters, getAllUsers};
