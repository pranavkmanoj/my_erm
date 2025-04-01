const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "others";  // Default folder

    if (file.fieldname === "profilePic") {
      folder = "profile_pics";
    } else if (file.fieldname === "coverPhoto") {
      folder = "cover_pics";
    } else if (file.fieldname === "resume") {
      folder = "resumes";
    }

    return {
      folder: folder,
      format: file.mimetype === "application/pdf" ? "pdf" : "png",
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, and PDF are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload.fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]);
