const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Ensure Cloudinary is properly configured
if (!cloudinary.config().cloud_name) {
  console.error("❌ Cloudinary configuration missing");
  process.exit(1);
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";
    
    // Use consistent folder names
    const folder = isPdf
      ? "resumes"
      : file.fieldname === "profilePic"
      ? "profile_pics"
      : "cover_pics";  

    const params = {
      folder,
      public_id: `${Date.now()}-${file.originalname}`,
      transformation: isPdf ? [] : [{ width: 500, height: 500, crop: "limit" }],
      upload_preset: "signed_upload"  
    };

    if (isPdf) {
      params.resource_type = "raw";
    } else {
      params.format = "jpg";
      params.resource_type = "image";
    }

    return params;
  },
});

// ⚙️ File Filter and Size Limits
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only PDF, JPEG, and PNG allowed."), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
