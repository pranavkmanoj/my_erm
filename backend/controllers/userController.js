const User = require("../models/User");
const cloudinary = require("../cloudinaryConfig");

/**
 * ✅ Upload Profile Picture
 */
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: req.file.path },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Image upload failed", message: error.message });
  }
};

/**
 * ✅ Upload Cover Photo
 */
exports.uploadCoverPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { coverPhoto: req.file.path },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Image upload failed", message: error.message });
  }
};

/**
 * ✅ Upload CV (PDF, DOCX)
 */
exports.uploadCV = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file || !req.file.path) return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findByIdAndUpdate(id, { cvFile: req.file.path }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "CV uploaded successfully", cvUrl: user.cvFile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Get User's CV URL
 */
exports.getUserCV = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    const user = await User.findById(id);
    if (!user || !user.cvFile) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json({ cvFile: user.cvFile });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Update Profile Details (Name & Email)
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

/**
 * ✅ Fetch User Profile
 */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

/**
 * ✅ Fetch Resume File (Serve File)
 */
exports.getResume = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || !user.cvFile) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({ resumeUrl: user.cvFile });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

/**
 * ✅ Fetch Current User (for Authentication)
 */
exports.getCurrentUser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: "No user found" });
  }
};
