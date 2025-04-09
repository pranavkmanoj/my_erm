import React, { useState, useEffect } from "react";
import Navbar from "../Layout/User-Navbar";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import CvUpload from "./cv";
import { FiEdit2, FiUpload, FiSave, FiLogOut, FiUser, FiMail } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [tempProfilePic, setTempProfilePic] = useState("");
  const [tempCoverPhoto, setTempCoverPhoto] = useState("");

  useEffect(() => {
    if (!user?.token) {
      window.location.href = "/ulogin";
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/user/profile", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setUser({
          id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          profilePic: response.data.profilePic,
          coverPhoto: response.data.coverPhoto,
          token: user.token,
        });

        setFormData({ name: response.data.name, email: response.data.email });
        setProfilePic(response.data.profilePic);
        setCoverPhoto(response.data.coverPhoto);
      } catch (error) {
        console.error("Error fetching user data:", error.response?.data || error);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.token]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.href = "/ulogin";
  };

  const handleImageUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show Preview
    const fileURL = URL.createObjectURL(file);
    if (type === "profile") {
      setTempProfilePic(fileURL);
    } else {
      setTempCoverPhoto(fileURL);
    }

    // Upload to Backend
    const uploadData = new FormData();
    uploadData.append(type === "profile" ? "profilePic" : "coverPhoto", file);

    try {
      const response = await axiosInstance.put(
        `/user/upload-${type}`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url || response.data.url;

      if (type === "profile") {
        setProfilePic(imageUrl);
        setUser((prevUser) => ({ ...prevUser, profilePic: imageUrl }));
      } else {
        setCoverPhoto(imageUrl);
        setUser((prevUser) => ({ ...prevUser, coverPhoto: imageUrl }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed. Please try again.");
    }
  };

  const updateProfile = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        "/user/update-profile",
        { name: formData.name, email: formData.email },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setUser((prevUser) => ({
        ...prevUser,
        name: response.data.name,
        email: response.data.email,
      }));

      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Profile update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Unauthorized Access</h2>
        <p className="text-gray-600 mb-4">You need to login to view this page.</p>
        <button
          onClick={() => window.location.href = "/ulogin"}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Photo Section */}
        <div className="relative rounded-xl overflow-hidden shadow-lg h-64 bg-gradient-to-r from-blue-500 to-indigo-600">
          {coverPhoto || tempCoverPhoto ? (
            <img
              src={tempCoverPhoto || coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white text-lg font-medium">Cover Photo</span>
            </div>
          )}

          <div className="absolute bottom-4 right-4 z-10">
            <label className="flex items-center justify-center bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-opacity-100 transition-all cursor-pointer">
              <FiUpload className="mr-2" />
              Change Cover
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "cover")}
              />
            </label>
          </div>

        </div>

        {/* Profile Content */}
        <div className="relative bg-white rounded-xl shadow-md -mt-16 px-6 py-8 sm:px-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative -mt-20 mb-4 group">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                {profilePic || tempProfilePic ? (
                  <img
                    src={tempProfilePic || profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="text-gray-400 text-4xl" />
                  </div>
                )}
              </div>

              <label className="absolute -bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer">
                <FiUpload className="text-gray-700" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "profile")}
                />
              </label>
            </div>

            {/* Profile Info */}
            <div className="w-full max-w-lg">
              {editMode ? (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600 mt-1">{user.email}</p>
                </div>
              )}

              {/* CV Upload Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Resume/CV</h3>
                <CvUpload />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <IoMdClose className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={updateProfile}
                      disabled={saving}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FiEdit2 className="mr-2" />
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;