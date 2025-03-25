const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, jobController.createJob);  //Posting a job (Recruiter Side)
router.get("/", jobController.getAllJobs); //get all job (User Side)
router.get("/recruiter/:recruiterId", jobController.getJobsByRecruiter); //get all job using recruiter id (Recruiter Side)
router.put("/update-status/:id", authMiddleware, jobController.updateJobStatus); //Status update while [active or close](Recruiter Side)
router.put('/:id', authMiddleware, jobController.updateJob); //For Updation (Recruiter Side)
router.delete("/:id", authMiddleware, jobController.deleteJob); //For Deletion (Recruiter Side)

module.exports = router;
