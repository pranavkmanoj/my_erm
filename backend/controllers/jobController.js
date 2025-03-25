const jwt = require("jsonwebtoken"); 
const Job = require("../models/Job_listing");
const mongoose = require("mongoose");


// ✅ Create a new job
const createJob = async (req, res) => {
  try {
    console.log("Incoming Job Post Request");

    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    // Extract the recruiter's ID from the decoded token
    const recruiterId = decoded.id;
    if (!recruiterId) {
      return res.status(403).json({ error: "Unauthorized: Invalid recruiter ID" });
    }

    console.log("Recruiter ID:", recruiterId);

    // Extract job data from the request body
    const jobData = req.body;
    console.log("Request Body:", jobData); // Debugging

    // Create a new job instance with the recruiterId and job data
    const newJob = new Job({
      recruiterId, // Add the recruiter's ID to the job data
      ...jobData, // Spread the rest of the job data from the request body
    });

    console.log("Saving Job:", newJob); // Debugging

    // Save the job to the database
    await newJob.save();

    // Respond with success message and the saved job data
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    console.error("❌ Error posting job:", error);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Handle other errors
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// ✅ Fetch all jobs (User side)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching jobs", details: error.message });
  }
};


// Fetch jobs posted by a specific recruiter
const getJobsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const jobs = await Job.find({ recruiterId });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this recruiter." });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Update job status (Recruiter Side)
const updateJobStatus = async (req, res) => {
console.log("Job ID received from request:", req.params.id);

    try {
        const { jobId } = req.params;
        const { status } = req.body;

        if (!["Active", "Closed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const job = await Job.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json({ message: "Job status updated successfully", job });
    } catch (error) {
        console.error("Error updating job status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update a job by ID (Recruiter side)
const updateJob = async (req, res) => {
    const { id } = req.params;
    const jobData = req.body;

    try {
        const updatedJob = await Job.findByIdAndUpdate(id, jobData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Failed to update job." });
    }
};

// ✅ Delete a job by ID
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting job", details: error.message });
  }
};


// Export all functions
module.exports = {createJob,getAllJobs,getJobsByRecruiter,updateJobStatus,updateJob,deleteJob};