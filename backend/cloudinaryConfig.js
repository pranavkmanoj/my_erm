const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: fileBuffer.mimetype === "application/pdf" ? "raw" : "image"
      },
      (error, result) => {
        if (error) throw new Error(error.message);
        return result;
      }
    ).end(fileBuffer);
    
    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

module.exports = { cloudinary, uploadToCloudinary };
