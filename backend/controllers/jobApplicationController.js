const cloudinary = require("../config/cloudinary");
const JobApplication = require("../models/JobApplication");
const JobListing = require("../models/Job_listing");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();




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

        const { firstName, lastName, phone, email, city, jobId, skills, availability, coverLetter, experience } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized. Please log in to apply for jobs." });
        }

        if (!firstName || !lastName || !phone || !email || !city || !availability || !coverLetter || !experience || !jobId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!req.file) {
            return res.status(400).json({ message: "CV upload failed. Please upload a valid PDF." });
        }

        // Verify job existence
        const job = await JobListing.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "The job does not exist." });
        }

        const recruiterId = job.recruiterId;

        // Parse skills
        const parsedSkills = Array.isArray(skills)
            ? skills
            : skills.split(",").map(skill => skill.trim());

        const formattedAvailability = availability.charAt(0).toUpperCase() + availability.slice(1);

        // Check for duplicate application
        const existingApplication = await JobApplication.findOne({ userId, jobId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Upload resume to Cloudinary
       const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "resumes",  
            resource_type: "auto",
            format: "pdf"
            });

        const cvUrl = result.secure_url;

        // Create and save the job application
        const jobApplication = new JobApplication({
            userId,
            recruiterId,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            city: city.trim(),
            jobId,
            resume: cvUrl,  // Store Cloudinary URL
            skills: parsedSkills,
            availability: formattedAvailability,
            coverLetter: coverLetter.trim(),
            experience: experience.trim(),
        });

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
            appliedDate: app.createdAt, 
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

        // First find all jobs posted by this recruiter
        const jobs = await JobListing.find({ recruiterId });
        if (!jobs.length) {
            return res.status(404).json({ message: "No jobs found for this recruiter" });
        }

        // Get the job IDs to find applications for
        const jobIds = jobs.map(job => job._id);

        // Find applications for these jobs and populate job and user details
        const jobApplications = await JobApplication.find({ jobId: { $in: jobIds } })
            .populate({
                path: 'jobId',
                select: 'jobTitle companyName'
            })
            .populate({
                path: 'userId',
                select: 'profilePic name',
                model: 'user_logins' // Specify the model name
            })
            .lean();

        if (!jobApplications.length) {
            return res.status(404).json({ message: "No job applications found for this recruiter" });
        }

        // Format the response
        const formattedApplications = jobApplications.map(application => ({
            ...application,
            jobTitle: application.jobId?.jobTitle || 'Not Available',
            companyName: application.jobId?.companyName || 'Not Available',
            profilePic: application.userId?.profilePic || null,
            userName: application.userId?.name || 'Unknown'
        }));

        res.status(200).json(formattedApplications);
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
    applyJob,
    getUserApplications,
    getJobApplicationsByRecruiter,
    deleteApplication,
    updateApplicationStatus,
    getApprovedApplications,
    sendShortlistEmail,
    getUserCV
};
