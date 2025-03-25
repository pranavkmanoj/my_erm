const express = require("express");
const { getDashboardStats } = require("../controllers/adminDashController");

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);

module.exports = router;
