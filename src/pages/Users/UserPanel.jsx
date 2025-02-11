import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import "../../App.css";
import img from "../../pages/Users/images/12.png";

const UserPanel1 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col bg-gradient-to-b from-blue-100 to-purple-200 py-20 lg:py-32">
        <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
          <main className="w-full max-w-2xl">
            <h1 className="text-4xl font-bold mt-6 wave-heading" >
              Find the job made for you.
            </h1>

            <p className="text-lg text-gray-600 mt-4">
              We make it easy to find what's next. <br />
              Browse over 100,000 jobs — from top companies to fast-growing
              startups.
            </p>

            <div className="mt-6 flex gap-4 justify-center">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                onClick={() => navigate("/ulogin")}
              >
                Create Your Profile
              </button>
              <button
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-gray-300 hover:scale-105"
                onClick={() => navigate("/browsejobs")}
              >
                Browse Jobs
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Motion effect added when scrolling into view */}
      <motion.div
        className="bg-white py-20 lg:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }} // Triggers animation when 20% of section is visible
      >
        <motion.div
          className="container mx-auto px-4 lg:px-6 flex flex-col lg:flex-row items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }} // Triggers animation when section enters viewport
        >
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <img src={img} alt="Hero Image" className="w-full h-auto" />
          </div>

          <div className="lg:w-1/2 lg:pl-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Brand yourself for new opportunities
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Create a profile that highlights your unique skills and preferences,
              then apply to jobs with just one click.
            </p>

            <div className="mb-8">
              <div className="flex items-start mb-4">
                <span className="text-indigo-500 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    One click apply
                  </h3>
                  <p className="text-gray-600">
                    Say goodbye to cover letters - your profile is all you need.
                    One click to apply, then you're done.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-indigo-500 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Set your preferences
                  </h3>
                  <p className="text-gray-600">
                    Streamline the interview process by setting your expectations
                    (salary, industry, culture, etc.) upfront.
                  </p>
                </div>
              </div>
            </div>

            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg">
              Upload Resume
            </button>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default UserPanel1;
