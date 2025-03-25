const UserLogin = require("../models/User");  // Your user login schema
const Recruiter = require("../models/Recruiter"); // Your recruiter schema
const Job = require("../models/Job_listing"); // Your job schema
const Application = require("../models/JobApplication"); // Your application schema

// Get Admin Dashboard Data
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await UserLogin.countDocuments();
        const totalRecruiters = await Recruiter.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        res.status(200).json({ 
            users: totalUsers, 
            recruiters: totalRecruiters, 
            jobs: totalJobs, 
            applications: totalApplications 
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDashboardStats };
