const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const JobApplication = require("../models/JobApplication");
const JobListing = require("../models/Job_listing");
const User = require("../models/User"); 
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


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
        format: async (req, file) => file.mimetype.split("/")[1], // Preserve image format (jpg, png)
        public_id: (req, file) => {
            let cleanName = file.originalname.replace(/\s+/g, "_").replace(/\.[^.]+$/, ""); 
            return `${Date.now()}-${cleanName}`;
        },
        resource_type: "image",  // ✅ Ensures it's uploaded as an image
    },
});


// ✅ Pass resource_type separately in Multer middleware
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images (JPG, PNG) are allowed"), false);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});


// ✅ Apply authMiddleware (User must be logged in)
router.post("/apply", authMiddleware, upload.single("cv"), async (req, res) => {
    try {
        console.log("🔍 Full Request Body:", req.body);
        console.log("🔍 Uploaded file:", req.file);
        console.log("🔍 User from authMiddleware:", req.user);

        const { firstName, lastName, phone, email, city, jobId, skills, availability, coverLetter, experience } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing. Make sure you're logged in." });
        }

        // ✅ Validate required fields
        if (!firstName || !lastName || !phone || !email || !city || !availability || !coverLetter || !experience) {
            return res.status(400).json({
                message: "All fields are required: firstName, lastName, phone, email, city, availability, coverLetter, experience."
            });
        }

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required." });
        }

        // ✅ Ensure `cv` file is received
        if (!req.file) {
            return res.status(400).json({ message: "CV upload failed. Please upload a valid PDF." });
        }

        // ✅ Parse skills correctly
        const parsedSkills = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());

        // ✅ Ensure availability is formatted correctly
        const formattedAvailability = availability.charAt(0).toUpperCase() + availability.slice(1);

        // ✅ Check if the user has already applied for this job
        const existingApplication = await JobApplication.findOne({ userId, jobId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // ✅ Upload file to Cloudinary
        const cvUrl = req.file.path;

        // ✅ Save application (Make sure field names match schema)
        const jobApplication = new JobApplication({
            userId,
            firstName,
            lastName,
            phone,
            email,
            city,
            jobId,
            resume: cvUrl,  // ✅ Changed from `cv` to `resume`
            skills: parsedSkills,
            availability: formattedAvailability,
            coverLetter,
            experience
        });

        await jobApplication.save();
        res.status(201).json({ message: "Application submitted successfully!", jobApplication });

    } catch (error) {
        console.error("❌ Error in job application:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// fetch all the data to show (user side) 
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch job applications of the user
        const applications = await JobApplication.find({ userId })
            .select("firstName lastName phone email city resume coverLetter experience skills availability status createdAt jobId");

        if (!applications.length) {
            return res.status(404).json({ message: "No applications found for this user" });
        }

        // Fetch job details for each application
        const jobDetailsMap = {};
        for (let app of applications) {
            if (app.jobId) {
                const job = await JobListing.findById(app.jobId).select("jobTitle companyName");
                if (job) {
                    jobDetailsMap[app.jobId] = job;
                }
            }
        }

        // Format applications with job details
        const formattedApplications = applications.map((app) => ({
            jobTitle: jobDetailsMap[app.jobId]?.jobTitle || "N/A",
            company: jobDetailsMap[app.jobId]?.companyName || "N/A",
            fullName: `${app.firstName} ${app.lastName}`.trim(),
            phone: app.phone || "N/A",
            email: app.email || "N/A",
            city: app.city || "N/A",
            experience: app.experience || "N/A",
            skills: app.skills || [],
            availability: app.availability || "N/A",
            status: app.status || "Pending",
            resumeLink: app.resume || "",
            appliedAt: app.createdAt,
            _id: app._id,
        }));

        res.status(200).json(formattedApplications);
    } catch (error) {
        console.error("❌ Error fetching applications:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


// ✅ Fetch all applied users (Recruiter Access)
router.get("/all-applications", async (req, res) => {
  try {
    const applications = await JobApplication.find(); // Fetch all job applications without populating user or job data

    res.json(applications);
  } catch (error) {
    console.error("❌ Error fetching all applications:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


//Delete the applaiction by id (Recruiter side)
router.delete("/delete-application/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await JobApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting application:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

//Update the status (Recruiter side)
router.put('/update-status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
});


// Get all approved job applications
router.get("/approved", async (req, res) => {
    try {
        // Fetch all approved applications
        const approvedApplications = await JobApplication.find({ status: "Accepted" })
            .select("firstName lastName email phone city resume jobId experience skills availability createdAt");

        if (!approvedApplications.length) {
            return res.status(404).json({ message: "No approved candidates found" });
        }

        // Fetch job details for each application
        const jobDetailsMap = {};
        for (let app of approvedApplications) {
            if (app.jobId && !jobDetailsMap[app.jobId]) {
                const job = await JobListing.findById(app.jobId).select("jobTitle companyName");
                if (job) {
                    jobDetailsMap[app.jobId] = job;
                }
            }
        }

        // Format applications with job details
        const formattedCandidates = approvedApplications.map((app) => ({
            _id: app._id,
            fullName: `${app.firstName} ${app.lastName}`.trim(),
            jobTitle: jobDetailsMap[app.jobId]?.jobTitle || "N/A",
            company: jobDetailsMap[app.jobId]?.companyName || "N/A",
            resume: app.resume || "",
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
});






//Get cv

router.get("/get-cv/:userId", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("🔍 Fetching CV for userId:", userId); // ✅ Debug Log

        const application = await JobApplication.findOne({ userId });

        if (!application || !application.cv) {
            return res.status(404).json({ message: "CV not found for this user" });
        }

        res.json({ cvUrl: application.cv });
    } catch (error) {
        console.error("❌ Error fetching CV:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


module.exports = router;
