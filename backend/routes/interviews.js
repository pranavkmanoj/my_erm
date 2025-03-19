const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const JobApplication = require("../models/JobApplication");
const nodemailer = require("nodemailer");

// 📌 Schedule an Interview
router.post("/schedule", async (req, res) => {
  try {
    const { candidateId, date, time } = req.body;

    if (!candidateId || !date || !time) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if candidate exists
    const candidate = await JobApplication.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Save interview details in MongoDB
    const interview = new Interview({ candidateId, date, time });
    await interview.save();

    // 📩 Send Email Notification to Candidate
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pranavkmanoj@gmail.com",
        pass: "yeoh fvvx qoes rpfm",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: candidate.email,
      subject: "Interview Scheduled",
      text: `Hello ${candidate.firstName},\n\nYou have been shortlisted for the next level. Your interview is scheduled on ${date} at ${time}.\n\nBest Regards,\nRecruitment Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
      }
    });

    res.status(201).json({ message: "Interview scheduled successfully!" });

  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
