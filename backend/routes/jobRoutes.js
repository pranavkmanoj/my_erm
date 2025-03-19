const express = require("express");
const router = express.Router();
const Job = require("../models/Job_listing");

// Create a new job posting
router.post("/", async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      skillsRequired,
      experienceRequired,
      qualifications,
      applicationDeadline,
      workMode,
      status,
    } = req.body;

    // Validate required fields
    if (
      !companyName ||
      !jobTitle ||
      !jobDescription ||
      !jobLocation ||
      !jobType ||
      !salary ||
      !skillsRequired ||
      !experienceRequired ||
      !qualifications ||
      !applicationDeadline ||
      !workMode
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const job = new Job({
      companyName,
      jobTitle,
      jobDescription,
      jobLocation,
      jobType,
      salary,
      skillsRequired,
      experienceRequired,
      qualifications,
      applicationDeadline,
      workMode,
      status: status || "Active", // Default to Active if not provided
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error: error.message });
  }
});

// Fetch all job postings
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
});

// Fetch a single job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update job status
router.put("/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job status updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Error updating job status", error: error.message });
  }
});

// Update a job by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
});

// Delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
});

module.exports = router;
