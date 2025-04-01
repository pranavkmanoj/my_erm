const express = require('express');
const userController = require('../controllers/userController');  // Verify the correct path
const upload = require('../middleware/uploadMiddleware');         // Verify the correct path
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.put("/upload-cv/:id", authMiddleware, upload.single("cvFile"), userController.uploadCv);
router.get("/get-cv/:id", authMiddleware, userController.getCv);
router.get("/profile", authMiddleware, userController.getUserProfile);// fetching user details 
router.put("/update-profile", authMiddleware, userController.updateUserProfile);//Update the user Details (Name and email)
router.put("/upload-profile", authMiddleware, upload.single("profilePic"), userController.uploadProfilePic); //upload profile pic
router.put("/upload-cover", authMiddleware, upload.single("coverPhoto"), userController.uploadCoverPhoto); //upload cover Pic

module.exports = router;
