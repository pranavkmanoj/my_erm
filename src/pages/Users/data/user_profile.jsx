import React, { useState, useEffect } from "react";
import Navbar from "../Layout/User-Navbar";
import back from "../images/background.jpg";
import profilePic from "../images/back.jpg";
import coverPhoto from "../images/coverforBrowse.jpg";
// import { motion } from "framer-motion";
// import { FaUpload } from "react-icons/fa";
import axios from "../../../../backend/axiosInstance";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token
        const response = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSave = () => {
  //   axios
  //     .put("http://localhost:5000/api/user/update", formData)
  //     .then((response) => {
  //       setUser(response.data);
  //       setEditMode(false);
  //     })
  //     .catch((error) => console.error("Error updating user data:", error));
  // };

  // const handlePasswordChange = (e) => {
  //   setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  // };

  // const handlePasswordSubmit = () => {
  //   if (passwordData.newPassword !== passwordData.confirmPassword) {
  //     alert("Passwords do not match");
  //     return;
  //   }
  //   axios
  //     .post("http://localhost:5000/api/user/change-password", passwordData)
  //     .then(() => {
  //       setShowPasswordDialog(false);
  //       alert("Password changed successfully");
  //     })
  //     .catch((error) => console.error("Error changing password:", error));
  // };

  // const handleLogout = () => {
  //   axios.post("http://localhost:5000/api/user/logout").then(() => {
  //     window.location.href = "/login";
  //   });
  // };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
      console.log("File selected:", file.name);
      // Add your file upload logic here
    }
  };

  return (
    <div style={{ backgroundImage: `url(${back})`, backgroundSize: "cover", minHeight: "100vh", backgroundPosition: "center" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden p-6 relative mt-10">
        {/* Cover Photo */}
        <img src={coverPhoto} alt="Cover" className="w-full h-48 object-cover" />

        {/* Profile Photo */}
        <div className="relative -mt-16 flex justify-center">
          <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full border-4 border-white" />
        </div>

        {/* Edit/Save Button */}
        <div className="flex justify-end mt-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
          >
            {editMode ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Details */}
        <h3 className="text-xl font-semibold text-gray-800 text-center mt-2">Profile Details</h3>
        {editMode ? (
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleInputChange}
            className="text-3xl font-bold text-gray-800 border p-2 rounded-md w-full text-center"
          />
        ) : (
          <h2 className="text-3xl font-bold text-gray-800 text-center">{user.name}</h2>
        )}
        <p className="text-gray-600 text-center">{user.email}</p>
        <p className="text-gray-600 text-center">DOB: {user.dob}</p>
        <p className="text-gray-600 text-center">Phone: {user.phone}</p>
        <p className="text-gray-600 text-center">Address: {user.address}</p>

        <hr className="my-4" />

        {/* CV Upload Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload CV</h3>
        <div className="text-center mb-4">
          <p className="text-gray-600 italic">
            "A great career begins with a great first step. Upload your CV and make it count!"
          </p>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {/* Upload Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>

          {/* Upload Text */}
          <p className="mt-2 text-gray-600 text-sm">
            Upload CV (PDF, DOCX, DOC, RTF, or TXT)
          </p>

          {/* Upload Button */}
          <label className="mt-2 inline-block px-4 py-1 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-colors text-sm">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.docx,.doc,.rtf,.txt"
              onChange={handleFileUpload}
            />
            Upload CV
          </label>
        </div>

        <hr className="my-4" />

        {/* Change Password and Logout Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => setShowPasswordDialog(true)}
          >
            Change Password
          </button>

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          // onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;