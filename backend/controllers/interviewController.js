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
  try {
    const { jobApplicationId, interviewDate } = req.body;

    if (!jobApplicationId || !interviewDate) {
      return res.status(400).json({ error: "Job Application ID and Interview Date are required" });
    }

    // Fetch the job application details
    const jobApplication = await JobApplication.findById(jobApplicationId)
      .populate('jobId', 'jobTitle')
      .populate('recruiterId', 'email')
      .populate({
        path: 'userId',
        model: 'user_logins',  // Use the correct model name
        select: 'name email'
      });

    if (!jobApplication) {
      return res.status(404).json({ error: "Job Application not found" });
    }

    // Create or update the interview
    let interview = await Interview.findOne({ jobApplicationId });

    if (interview) {
      // Update the existing interview
      interview = await Interview.findByIdAndUpdate(
        interview._id,
        {
          interviewDate,
          firstName: jobApplication.userId.name.split(" ")[0] || "",    // Extract first name
          lastName: jobApplication.userId.name.split(" ")[1] || "",     // Extract last name
          phoneNumber: jobApplication.userId.phoneNumber || "N/A",
          email: jobApplication.userId.email,
          action: "Interview",
        },
        { new: true }
      );
    } else {
      // Create a new interview with all fields
      interview = new Interview({
        jobApplicationId,
        recruiterId: jobApplication.recruiterId,
        userId: jobApplication.userId,
        jobId: jobApplication.jobId,
        interviewDate,
        firstName: jobApplication.userId.name.split(" ")[0] || "",
        lastName: jobApplication.userId.name.split(" ")[1] || "",
        phoneNumber: jobApplication.userId.phoneNumber || "N/A",
        email: jobApplication.userId.email,
        action: "Interview",
      });

      await interview.save();
    }

    // Update job application action to "Interview"
    jobApplication.action = "Interview";
    await jobApplication.save();

    // Send interview confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: jobApplication.userId.email,  // Send to the candidate's email
      subject: `Interview Scheduled for ${jobApplication.jobId.jobTitle}`,
      text: `
        Dear ${jobApplication.userId.name},

        Your interview for the position of ${jobApplication.jobId.jobTitle} has been scheduled.

        Interview Date: ${new Date(interviewDate).toLocaleString()}
        Phone Number: ${jobApplication.userId.phoneNumber || "N/A"}

        Best regards,
        Recruitment Team
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Interview scheduled successfully and email sent",
      interview,
    });

  } catch (error) {
    console.error("Error scheduling interview:", error);
    res.status(500).json({ error: "Error scheduling interview" });
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
