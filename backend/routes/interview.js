const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getShortlistedCandidates, scheduleInterview,getInterviewsByUserId } = require("../controllers/interviewController");

// Fetch shortlisted candidates (Requires Auth)
router.get("/shortlisted", authMiddleware, getShortlistedCandidates);

// Schedule an interview (Requires Auth)
router.post("/schedule", authMiddleware, scheduleInterview);
router.get('/user/:userId', getInterviewsByUserId);

module.exports = router;
