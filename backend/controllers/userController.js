const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

// Upload CV to Cloudinary
const uploadCv = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Get Cloudinary URL directly from req.file.path (already uploaded by multer-storage-cloudinary)
    const cloudinaryUrl = req.file.path;

    // ✅ Update user document with the uploaded CV URL
    const user = await User.findByIdAndUpdate(
      userId,
      { cvFile: cloudinaryUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "CV uploaded successfully",
      cvUrl: cloudinaryUrl
    });
  } catch (error) {
    console.error("CV upload error:", error);
    res.status(500).json({
      message: "Failed to upload CV",
      error: error.message
    });
  }
};


// ✅ Get CV
const getCv = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.cvFile) {
      return res.status(404).json({ message: "No CV found for this user" });
    }

    res.status(200).json({ cvFile: user.cvFile });

  } catch (error) {
    console.error("Error fetching CV:", error);
    res.status(500).json({ message: "Failed to fetch CV" });
  }
};


// fetching the user Profile (Name,email,coverProfile and profilepic)
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      coverPhoto: user.coverPhoto,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};



//update the profie UserProfile (Name and email)
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("name email");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Update the Profile Pic 

const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pics",
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: result.secure_url },
      { new: true }
    ).select("profilePic");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ profilePic: updatedUser.profilePic });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Upload the CoverPhoto
const uploadCoverPhoto = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "cover_photos",
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { coverPhoto: result.secure_url },
      { new: true }
    ).select("coverPhoto");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ coverPhoto: updatedUser.coverPhoto });
  } catch (error) {
    console.error("Error uploading cover photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  uploadCv,
  getCv,
  getUserProfile,
  updateUserProfile,
  uploadProfilePic,
  uploadCoverPhoto
};