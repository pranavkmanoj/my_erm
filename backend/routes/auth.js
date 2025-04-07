const express = require("express");
const { register, loginUser,adminLogin, getAllRecruiters, getAllUsers } = require("../controllers/authController");

const router = express.Router();

// Register Route
router.post("/register", register);

// User Login Route
router.post("/user-login", (req, res) => loginUser(req, res, "user"));

// Recruiter Login Route
router.post("/recruiter-login", (req, res) => loginUser(req, res, "recruiter"));

// Route to get all recruiters
router.get("/recruiters", getAllRecruiters);

// Route to fetch all registered users
router.get("/users", getAllUsers);

//Admin Login
router.post("/admin/login", adminLogin);

module.exports = router;
