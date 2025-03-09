const express = require("express");
const { cloudinary } = require("../cloudinaryConfig");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// Allowed MIME types for images
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log("File received:", file); // ✅ Debugging

    const allowedTypes = ["profile", "cover"];
    const type = req.body.type || "profile"; // Default to "profile"

    if (!allowedTypes.includes(type)) {
      console.error("Invalid image type received:", type);
      throw new Error("Invalid image type. Allowed types: 'cover' or 'profile'");
    }

    return {
      folder: type === "cover" ? "cover_photos" : "profile_pictures",
      format: "png",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and WEBP are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Fix: Use router.post instead of app.post
router.post("/upload-profile", upload.single("image"), async (req, res) => {
  try {
    console.log("Incoming file:", req.file); // ✅ Check if file is received
    console.log("Request body:", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ✅ Cloudinary automatically uploads, get the URL from req.file.path
    res.status(200).json({ 
      message: "Upload successful", 
      imageUrl: req.file.path // Cloudinary URL
    });

  } catch (error) {
    console.error("Upload error:", error); // ✅ Log full error
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});



module.exports = router;
