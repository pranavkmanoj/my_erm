const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Ensure this is correct
const multer = require("multer");
const User = require("../models/User");

// Configure multer (if not already done)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/cvs"); // Make sure this folder exists or use cloud storage
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

/**
 * ✅ Upload CV (PDF, DOCX) and Update Database
 */
router.put("/upload-cv", authenticateUser, upload.single("cvFile"), async (req, res) => {
  try {
    console.log("Uploaded file:", req.file);
    console.log("Authenticated user ID:", req.user.id); // Access user ID from token

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { cvUrl: req.file.path },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ CV Uploaded:", updatedUser.cvUrl);
    return res.json(updatedUser);
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({ error: "CV upload failed" });
  }
});

module.exports = router;
