import React, { useState, useEffect } from "react";
import Navbar from "../Layout/User-Navbar";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import CvUpload from "./cv";

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

  // ✅ Optimized Upload Function
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

  // ✅ Profile Update Handler
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

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-gray-600">Unauthorized access. Redirecting...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-10">

        {/* Cover Photo Section */}
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={tempCoverPhoto || coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />

          {editMode && (
            <div className="absolute bottom-2 right-2 z-10">
              <button
                onClick={() => document.getElementById("coverUploadInput").click()}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800"
              >
                Change Cover Photo
              </button>
              <input
                type="file"
                id="coverUploadInput"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "cover")}
              />
            </div>
          )}
        </div>

        {/* Profile Photo Section */}
        <div className="relative -mt-16 flex flex-col items-center">
          <img
            src={tempProfilePic || profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />

          {editMode && (
            <label className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 relative cursor-pointer">
              Change Profile Picture
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "profile")}
              />
            </label>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-800 text-center mt-4">Profile Details</h3>

        {editMode ? (
          <div className="text-center">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border px-2 py-1 rounded w-full mt-2"
              placeholder="Enter Name"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border px-2 py-1 rounded w-full mt-2"
              placeholder="Enter Email"
            />
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center">{user.name}</h2>
            <p className="text-gray-600 text-center">{user.email}</p>
          </>
        )}

        <CvUpload />

        <div className="flex justify-between mt-4">
          {editMode ? (
            <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={updateProfile}>
              Save Changes
            </button>
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
