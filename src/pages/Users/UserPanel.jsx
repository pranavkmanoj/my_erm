// src/pages/Users/UserPanel1.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosInstance";
import { Eye } from "lucide-react";
import Navbar from "./Layout/User-Navbar";
import Footer from "./Layout/Footer";
import "../../App.css";
import img from "../../pages/Users/images/banner (1).webp";
import { useUser } from "../../context/AuthContext";
import JobCarousel from "./data/JobCarousel";
import CvUpload from "./data/cv";

const UserPanel1 = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/user/get-resume/${user.id}`)
        .then((response) => {
          if (response.data.resumeUrl) {
            setResumeUrl(response.data.resumeUrl);
          }
        })
        .catch((error) => {
          console.error("Error fetching resume:", error);
        });
    }
  }, [user]);

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
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Typing animation configuration
  const titleText = "Brand yourself for new opportunities";
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.05 * i },
    }),
  };

  const letter = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 12,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col bg-gradient-to-b from-[#fb5607] to-[#140000] py-20 lg:py-32">
        <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
          <main className="w-full max-w-2xl">
            <h1 className="text-5xl font-bold mt-6 wave-heading text-[#f7f7f7]">
              Find the job made for you.
            </h1>
            <p className="text-lg text-[#f7f7f7] mt-4">
              We make it easy to find what's next. <br />
              Browse over 100,000 jobs — from top companies to fast-growing
              startups.
            </p>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                onClick={() => navigate("/ulogin")}
              >
                Create Your Profile
              </button>
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300"
                onClick={() => navigate("/job-listing")}
              >
                Browse Jobs
              </button>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-black py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <img src={img} alt="Hero Image" className="w-full h-auto" />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#ea033f] via-[#fb5607] to-[#f7f7f7] text-transparent bg-clip-text mb-6 leading-tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
            >
              {Array.from(titleText).map((char, index) => (
                <motion.span key={index} variants={letter} className="inline-block">
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>

            <p className="text-lg text-[#f7f7f7] mb-8">
              Create a profile that highlights your unique skills and preferences,
              then apply to jobs with just one click.
            </p>

            <CvUpload bgColor="black" />
          </div>
        </div>
      </div>

      {/* Job Listings Carousel Section */}
      <div className="bg-[#1a1a1a] py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#f7f7f7] mb-8 text-center">
            Featured Job Opportunities
          </h2>
          <JobCarousel />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserPanel1;