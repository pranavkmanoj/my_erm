// const User = require("../models/User");
// const cloudinary = require("../cloudinaryConfig");

// // Get User Profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     console.log("User ID from token:", req.user?.id); // Debugging

//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Server Error:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Upload Profile Image
// exports.uploadProfileImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const file = req.file.path; // Ensure multer is handling file uploads
//     const uploadResult = await cloudinary.uploader.upload(file, {
//       folder: "profile_pics",
//     });

//     if (!uploadResult || !uploadResult.secure_url) {
//       return res.status(500).json({ message: "Cloudinary upload failed" });
//     }

//     // Update the user profile image in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { profileImage: uploadResult.secure_url },
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "Profile image updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error("Error uploading profile image:", error);
//     res.status(500).json({ message: "Image upload failed", error: error.message });
//   }
// };
