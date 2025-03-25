import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosInstance";
import { Eye } from "lucide-react";
import Navbar from "./Layout/User-Navbar";
import Footer from "./Layout/Footer";
import "../../App.css";
import img from "../../pages/Users/images/12.png";
import { useUser } from "../../context/AuthContext";

const UserPanel1 = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      console.log(`🔍 Fetching resume for user ID: ${user.id}`);

      axiosInstance
        .get(`/user/get-resume/${user.id}`)
        .then((response) => {
          if (response.data.resumeUrl) {
            setResumeUrl(response.data.resumeUrl);
            console.log("✅ Resume fetched successfully:", response.data.resumeUrl);
          } else {
            console.warn("⚠️ No resume found for this user.");
          }
        })
        .catch((error) => {
          console.error("❌ Error fetching resume:", error.response?.data || error.message);
        });
    }
  }, [user]);  // 🔥 No need to check `navigate`



  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return alert("Please select a file.");
    if (file.type !== "application/pdf") return alert("Only PDF files allowed.");

    setLoading(true);
    const formData = new FormData();
    formData.append("cvFile", file);
    formData.append("userId", user.id);

    try {
      const response = await axiosInstance.put("/user/upload-cv", formData);
      setResumeUrl(response.data.cvUrl);
      alert("✅ Resume uploaded successfully!");
    } catch (error) {
      console.error("❌ Error uploading resume:", error);
      alert("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col bg-gradient-to-b from-blue-100 to-purple-200 py-20 lg:py-32">
        <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
          <main className="w-full max-w-2xl">
            <h1 className="text-4xl font-bold mt-6 wave-heading">Find the job made for you.</h1>
            <p className="text-lg text-gray-600 mt-4">
              We make it easy to find what's next. <br />
              Browse over 100,000 jobs — from top companies to fast-growing startups.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                onClick={() => navigate("/ulogin")}
              >
                Create Your Profile
              </button>
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300"
                onClick={() => navigate("/browsejobs")}
              >
                Browse Jobs
              </button>
            </div>
          </main>
        </div>
      </div>
      <motion.div
        className="bg-white py-20 lg:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="container mx-auto px-4 lg:px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <img src={img} alt="Hero Image" className="w-full h-auto" />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Brand yourself for new opportunities</h1>
            <p className="text-lg text-gray-600 mb-8">Create a profile that highlights your unique skills and preferences, then apply to jobs with just one click.</p>
            <div className="mt-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">Upload Resume (PDF only)</label>
              <input
                type="file"
                accept="application/pdf"
                className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-white file:hover:bg-gray-100"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
            {resumeUrl && (
              <div className="mt-6 flex items-center gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" /> View Resume
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default UserPanel1;