const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },  // Store Cloudinary URL
  publicId: { type: String, required: true },  // Cloudinary Public ID (for deletion)
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", ImageSchema);
