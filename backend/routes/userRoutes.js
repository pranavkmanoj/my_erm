const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const fs = require("fs");
const path = require("path");

// ✅ Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "user_uploads"; // Default folder
    let resourceType = "auto"; // Default type (auto-detect)

    if (file.fieldname === "cvFile") {
      folderName = "cv_uploads"; // Folder for CVs
      resourceType = "raw"; // Use "raw" for non-image files like PDFs, DOCX
    }

    return {
      folder: folderName,
      resource_type: resourceType,
      public_id: `${Date.now()}_${file.originalname}`, // Unique file name
    };
  },
});

const upload = multer({ storage });
/**
 * ✅ Upload Profile Picture
 */
router.put("/upload-profile", authMiddleware, upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("✅ File Upload Request Received:", req.file);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: req.file.path },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Profile Picture Updated:", updatedUser.profilePic);
    return res.json(updatedUser);
  } catch (error) {
    console.error("❌ Profile Upload Error:", error);
    return res.status(500).json({ error: error.message || "Image upload failed" });
  }
});



/**
 * ✅ Upload Cover Photo
 */
router.put("/upload-cover", authMiddleware, upload.single("coverPhoto"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { coverPhoto: req.file.path },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Cover Photo Updated:", updatedUser.coverPhoto);
    return res.json(updatedUser);
  } catch (error) {
    console.error("❌ Cover Upload Error:", error);
    return res.status(500).json({ error: "Image upload failed" });
  }
});

/**
 * ✅ Upload CV (PDF, DOCX) and Update Database
 */
router.put("/upload-cv/:id", upload.single("cvFile"), async (req, res) => { // ✅ Use router.put()
    const { id } = req.params;
    if (!req.file || !req.file.path) return res.status(400).json({ message: "No file uploaded" });

    try {
        const user = await User.findByIdAndUpdate(id, { cvFile: req.file.path }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ message: "CV uploaded successfully", cvUrl: user.cvFile });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
// Route to get the user's CV URL

router.get("/get-cv/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the user is authenticated and matches the requested ID
        if (req.user.id !== id) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }

        const user = await User.findById(id);
        if (!user || !user.cvFile) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json({ cvFile: user.cvFile });
    } catch (error) {
        console.error("Error fetching CV:", error);
        res.status(500).json({ message: "Server error" });
    }
});



/**
 * ✅ Update Profile Details (Name & Email)
 */
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("✅ Profile Updated:", updatedUser);
    return res.json(updatedUser);
  } catch (error) {
    console.error("❌ Profile Update Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * ✅ Fetch User Profile
 */
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch (error) {
    console.error("❌ Profile Fetch Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

/**
 * ✅ Fetch Resume File (Serve File)
 */

router.get("/get-resume/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find user by ID in MongoDB
    const user = await User.findById(userId);
    if (!user || !user.cvFile) {
      return res.status(404).json({ error: "Resume not found" });
    }

    // Return the URL stored in `cvFile`
    res.json({ resumeUrl: user.cvFile });
  } catch (error) {
    console.error("❌ Error fetching resume:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * ✅ Fetch Current User (for Authentication)
 */
router.get("/api/user/current-user", (req, res) => {
  // Logic to fetch current user data from session or token
  if (req.user) {
    res.json(req.user); // Return the user data
  } else {
    res.status(404).json({ message: "No user found" });
  }
});

module.exports = router;
