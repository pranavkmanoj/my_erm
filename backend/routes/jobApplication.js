const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const jobApplicationController = require("../controllers/jobApplicationController");

router.post("/apply", authMiddleware, jobApplicationController.upload.single("cv"), jobApplicationController.applyJob);
router.get("/", authMiddleware, jobApplicationController.getUserApplications);
router.get("/recruiter/:recruiterId", jobApplicationController.getJobApplicationsByRecruiter);
router.delete("/delete-application/:id", jobApplicationController.deleteApplication);
router.put("/update-status/:id", jobApplicationController.updateApplicationStatus);
router.get("/approved/:recruiterId", jobApplicationController.getApprovedApplications);
router.get("/get-cv/:userId", authMiddleware, jobApplicationController.getUserCV);
router.post("/send-shortlist-email", jobApplicationController.sendShortlistEmail); 

module.exports = router;
