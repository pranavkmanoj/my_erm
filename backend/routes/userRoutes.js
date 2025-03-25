const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

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

// ✅ Routes
router.put("/upload-profile", authMiddleware, upload.single("profilePic"), userController.uploadProfilePic);
router.put("/upload-cover", authMiddleware, upload.single("coverPhoto"), userController.uploadCoverPhoto);
router.put("/upload-cv/:id", authMiddleware, upload.single("cvFile"), userController.uploadCV);
router.get("/get-cv/:id", authMiddleware, userController.getUserCV);
router.put("/update-profile", authMiddleware, userController.updateProfile);
router.get("/profile", authMiddleware, userController.getUserProfile);
router.get("/get-resume/:userId", userController.getResume);
router.get("/api/user/current-user", userController.getCurrentUser);

module.exports = router;
