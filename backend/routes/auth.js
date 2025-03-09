const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
require("dotenv").config();

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    console.log("Received Registration Data:", req.body);
    
    const { role, name, companyName, email, password, bio } = req.body;
    if (!role || !email || !password) {
      return res.status(400).json({ message: "Role, email, and password are required!" });
    }

    const Model = role === "user" ? User : role === "recruiter" ? Recruiter : null;
    if (!Model) {
      return res.status(400).json({ message: "Invalid role specified!" });
    }

    // Check if email already exists in either collection
    const existingUser = await User.findOne({ email });
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingUser || existingRecruiter) {
      return res.status(400).json({ message: "Email already registered!" });
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
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Reusable Login Function
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

    const token = jwt.sign(
      { id: user._id, role: userType },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`[${userType.toUpperCase()}] Login successful:`, user.email);
    res.status(200).json({ token, role: userType });
  } catch (err) {
    console.error(`[${userType.toUpperCase()}] Login Error:`, err);
    res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};

// User Login Route
router.post("/user-login", (req, res) => loginUser(req, res, "user"));

// Recruiter Login Route
router.post("/recruiter-login", (req, res) => loginUser(req, res, "recruiter"));

module.exports = router;
