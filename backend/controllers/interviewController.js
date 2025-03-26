const JobApplication = require("../models/JobApplication");
const JobListing = require("../models/Job_listing")
const Interview = require("../models/Interview");
const Recruiter = require("../models/Recruiter"); 
const nodemailer = require('nodemailer');


// Fetch shortlisted candidates
const getShortlistedCandidates = async (req, res) => {
  try {
    const { recruiterId } = req.query;

    if (!recruiterId) {
      return res.status(400).json({ message: "Recruiter ID is required" });
    }

    // Find shortlisted applications associated with the recruiter
    const shortlistedApplications = await JobApplication.find({
  recruiterId,
  action: "Shortlist" 
}).populate("recruiterId");


    res.status(200).json(shortlistedApplications);
  } catch (error) {
    console.error("Error fetching shortlisted candidates:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Schedule interview
const scheduleInterview = async (req, res) => {
  console.log("Incoming Request Body:", req.body);  // 🛠️ Log the request payload for debugging

  try {
    const { jobApplicationId, interviewDate } = req.body;

    // Validate request data
    if (!jobApplicationId || !interviewDate) {
      return res.status(400).json({ error: "Job Application ID and Interview Date are required." });
    }

    const parsedDate = new Date(interviewDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid interview date format." });
    }

    // Fetch job application with populated fields
    const jobApplication = await JobApplication.findById(jobApplicationId)
      .populate('jobId', 'jobTitle')
      .populate('recruiterId', 'email')
      .populate({
        path: 'userId',
        model: 'user_logins',
        select: 'name email phoneNumber'
      });

    if (!jobApplication) {
      return res.status(404).json({ error: "Job Application not found." });
    }

    const user = jobApplication.userId;
    const recruiter = jobApplication.recruiterId;
    const job = jobApplication.jobId;

    // Ensure all necessary data is available
    if (!user || !recruiter || !job) {
      return res.status(400).json({ error: "Incomplete job application details." });
    }

    // Upsert (Create or Update) interview
    const interview = await Interview.findOneAndUpdate(
      { jobApplicationId },
      {
        jobApplicationId,
        recruiterId: recruiter._id,
        userId: user._id,
        jobId: job._id,
        interviewDate: parsedDate,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        phoneNumber: user.phoneNumber || "N/A",
        email: user.email,
        action: "Interview",
      },
      { new: true, upsert: true }
    );

    // Update job application action
    jobApplication.action = "Interview";
    await jobApplication.save();

    // Send confirmation email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Interview Scheduled: ${job.jobTitle}`,
        html: `
          <p>Dear ${user.name},</p>
          <p>Your interview for the position of <strong>${job.jobTitle}</strong> has been scheduled.</p>
          <ul>
            <li>📅 <strong>Date:</strong> ${parsedDate.toLocaleString()}</li>
          </ul>
          <p>Best regards,<br>Recruitment Team</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${user.email}`);

    } catch (emailError) {
      console.error("❌ Failed to send confirmation email:", emailError);
    }

    res.status(200).json({
      message: "Interview scheduled successfully.",
      interview,
    });

  } catch (error) {
    console.error("🚨 Error scheduling interview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch interviews based on user action 'interview'
const getInterviewsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const interviews = await Interview.find({ userId })
      .populate("jobId", "jobTitle")
      .sort({ interviewDate: -1 });

    if (!interviews || interviews.length === 0) {
      return res.status(404).json({ message: "No interviews found" });
    }

    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { getShortlistedCandidates, scheduleInterview, getInterviewsByUserId };
