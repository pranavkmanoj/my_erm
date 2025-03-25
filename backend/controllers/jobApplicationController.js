const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const JobApplication = require("../models/JobApplication");
const JobListing = require("../models/Job_listing");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
require("dotenv").config();


// ✅ Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure CloudinaryStorage for PDFs
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "job_applications_cv",
        format: async (req, file) => file.mimetype.split("/")[1], // Preserve format (jpg, png)
        public_id: (req, file) => `${Date.now()}-${file.originalname.replace(/\s+/g, "_").replace(/\.[^.]+$/, "")}`,
        resource_type: "image",
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images (JPG, PNG) are allowed"), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// 📌 Apply for a Job
const applyJob = async (req, res) => {
    try {
        console.log("🔍 Incoming Job Application:", req.body);
        console.log("📂 Uploaded File:", req.file);
        console.log("👤 Authenticated User:", req.user);

        // Extract form data from request body
        const { firstName, lastName, phone, email, city, jobId, skills, availability, coverLetter, experience } = req.body;
        const userId = req.user?.id; // Extract user ID from authentication middleware

        // Ensure user is authenticated
        if (!userId) {
            console.error("🚨 Missing User ID");
            return res.status(401).json({ message: "Unauthorized. Please log in to apply for jobs." });
        }

        // Validate required fields
        if (!firstName || !lastName || !phone || !email || !city || !availability || !coverLetter || !experience || !jobId) {
            console.error("🚨 Missing Required Fields");
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure a resume (CV) is uploaded
        if (!req.file) {
            console.error("🚨 Resume Upload Failed");
            return res.status(400).json({ message: "CV upload failed. Please upload a valid PDF." });
        }

        // Check if the job exists and fetch recruiterId
        const job = await JobListing.findById(jobId);
        if (!job) {
            console.error("🚨 Job Not Found");
            return res.status(404).json({ message: "The job you are trying to apply for does not exist." });
        }
        const recruiterId = job.recruiterId; // ✅ Fetch recruiterId from the job listing

        // Parse skills into an array (handles both string and array formats)
        const parsedSkills = Array.isArray(skills)
            ? skills
            : skills.split(",").map(skill => skill.trim());

        // Format availability with the first letter capitalized
        const formattedAvailability = availability.charAt(0).toUpperCase() + availability.slice(1);

        // Check if the user has already applied for this job
        const existingApplication = await JobApplication.findOne({ userId, jobId });
        if (existingApplication) {
            console.error("🚨 Duplicate Application");
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Save CV file path (assuming Cloudinary or a local file storage system)
        const cvUrl = req.file.path;

        // Create a new Job Application document
        const jobApplication = new JobApplication({
            userId,
            recruiterId, // ✅ Store recruiterId in job application
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            city: city.trim(),
            jobId,
            resume: cvUrl,
            skills: parsedSkills,
            availability: formattedAvailability,
            coverLetter: coverLetter.trim(),
            experience: experience.trim(),
        });

        // Save application to database
        await jobApplication.save();

        console.log("✅ Application Successfully Submitted:", jobApplication);
        res.status(201).json({ message: "Application submitted successfully!", jobApplication });

    } catch (error) {
        console.error("❌ Error in Job Application:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// 📌 Fetch All Job Applications (User Side)
const getUserApplications = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await JobApplication.find({ userId })
            .populate({
                path: "jobId",
                select: "jobTitle companyName"
            })
            .select("firstName lastName phone email city experience skills availability status createdAt resume"); 

        if (!applications.length) {
            return res.status(404).json({ message: "No applications found." });
        }

        // Format the response to include full name and applied date
        const formattedApplications = applications.map(app => ({
            name: `${app.firstName} ${app.lastName}`,
            phone: app.phone,
            email: app.email,
            city: app.city,
            experience: app.experience,
            skills: app.skills,
            availability: app.availability,
            status: app.status,
            appliedDate: app.createdAt, // Mongoose timestamps automatically generate this field
            resume: app.resume,
            jobTitle: app.jobId?.jobTitle || "N/A",
            companyName: app.jobId?.companyName || "N/A"
        }));

        res.status(200).json(formattedApplications);
    } catch (error) {
        console.error("❌ Error fetching applications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// 📌 Fetch All Applications (Recruiter Side)
const getJobApplicationsByRecruiter = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        if (!recruiterId) {
            return res.status(400).json({ message: "Recruiter ID is required" });
        }

        const jobApplications = await JobApplication.find({ recruiterId });

        if (!jobApplications.length) {
            return res.status(404).json({ message: "No job applications found for this recruiter" });
        }

        res.status(200).json(jobApplications);
    } catch (error) {
        console.error("Error fetching job applications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// 📌 Delete Job Application
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await JobApplication.findByIdAndDelete(id);

        if (!application) return res.status(404).json({ message: "Application not found" });

        res.json({ message: "Application deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting application:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// Update the status field
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Ensure status is valid
    if (!["Pending", "Reviewed", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};


// 📌 Fetch All Approved Applications
const getApprovedApplications = async (req, res) => {
    try {
        const { recruiterId } = req.params;

        if (!recruiterId) {
            return res.status(400).json({ message: "Recruiter ID is required" });
        }

        // 🔹 Find all job listings posted by this recruiter
        const recruiterJobs = await JobListing.find({ recruiterId })
            .select("_id jobTitle companyName");

        if (recruiterJobs.length === 0) {
            return res.status(404).json({ message: "No jobs found for this recruiter" });
        }

        // 🔹 Create a map of jobId to job details
        const jobDetailsMap = recruiterJobs.reduce((acc, job) => {
            acc[job._id.toString()] = { 
                jobTitle: job.jobTitle, 
                companyName: job.companyName 
            };
            return acc;
        }, {});

        // 🔹 Fetch approved applications (status: "Accepted") for jobs posted by this recruiter
        const approvedApplications = await JobApplication.find({
            status: "Accepted",
            jobId: { $in: Object.keys(jobDetailsMap) }, // Filter by job IDs
        }).select("firstName lastName email phone city resume jobId experience skills availability createdAt action");

        if (approvedApplications.length === 0) {
            return res.status(404).json({ message: "No approved candidates found" });
        }

        // 🔹 Format the response data
        const formattedCandidates = approvedApplications.map((app) => ({
            _id: app._id,
            fullName: `${app.firstName} ${app.lastName}`.trim(),
            jobTitle: jobDetailsMap[app.jobId?.toString()]?.jobTitle || "N/A",
            company: jobDetailsMap[app.jobId?.toString()]?.companyName || "N/A",
            resume: app.resume || "",
            action: app.action || "Pending",  
            details: {
                phone: app.phone || "N/A",
                email: app.email || "N/A",
                city: app.city || "N/A",
                experience: app.experience || "N/A",
                skills: app.skills || [],
                availability: app.availability || "N/A",
                appliedAt: app.createdAt,
            },
        }));

        res.status(200).json(formattedCandidates);
    } catch (error) {
        console.error("❌ Error fetching approved candidates:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// Controller function to send shortlist email
const sendShortlistEmail = async (req, res) => {
    try {
        const { recruiterId, candidateId, candidateEmail, candidateName, jobTitle } = req.body;

        if (!recruiterId || !candidateId || !candidateEmail || !candidateName || !jobTitle) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Update Candidate Action to "Shortlist"
        const updatedCandidate = await JobApplication.findOneAndUpdate(
            { _id: candidateId, recruiterId }, // Use _id instead of email
            { action: "Shortlist" }, 
            { new: true }
        );

        if (!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Nodemailer transporter setup
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: candidateEmail,
            subject: `Shortlisted for ${jobTitle}`,
            text: `Dear ${candidateName},\n\nCongratulations! You have been shortlisted for the role of ${jobTitle}.\n\nOur team will contact you soon for the next steps.\n\nBest regards,\nRecruitment Team`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            message: "Shortlist email sent successfully!", 
            updatedCandidate 
        });

    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
};


// 📌 Fetch User CV
const getUserCV = async (req, res) => {
    try {
        const { userId } = req.params;
        const application = await JobApplication.findOne({ userId });

        if (!application || !application.cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json({ cvUrl: application.cv });
    } catch (error) {
        console.error("❌ Error fetching CV:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    upload,
    applyJob,
    getUserApplications,
    getJobApplicationsByRecruiter,
    deleteApplication,
    updateApplicationStatus,
    getApprovedApplications,
    sendShortlistEmail,
    getUserCV
};
