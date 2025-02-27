const express = require("express");
const router = express.Router();
const Job = require("../models/Job_listing");


router.post("/", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Failed to post job" });
  }
});


router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    // Find and update the job
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job status:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
