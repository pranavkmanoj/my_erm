const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName = "user_uploads";
    let resourceType = "auto";

    if (file.fieldname === "cvFile") {
      folderName = "cv_uploads";
      resourceType = "raw";
    }

    return {
      folder: folderName,
      resource_type: resourceType,
      public_id: `${Date.now()}_${file.originalname}`,
    };
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "cvFile" && file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for CV uploads"), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
