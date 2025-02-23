import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import img1 from "./images/picture.png";

const floatingVariants = {
  animate: {
    y: [0, 20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const UserLogin = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [recruiterFormData, setRecruiterFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change for both User and Recruiter
  const handleChange = (e) => {
    if (activeTab === "user") {
      setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    } else {
      setRecruiterFormData({ ...recruiterFormData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission for both User and Recruiter
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = activeTab === "user" ? userFormData : recruiterFormData;
    const apiUrl =
      activeTab === "user"
        ? "http://localhost:5000/api/auth/user-login"
        : "http://localhost:5000/api/auth/recruiter-login";

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        alert("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Redirect based on role
        if (response.data.role === "user") {
          navigate("/");
        } else if (response.data.role === "recruiter") {
          navigate("/rpanel");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };


  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 120 + 50}px`,
              height: `${Math.random() * 120 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? "rgba(0, 123, 255, 0.5)" : "rgba(123, 31, 162, 0.5)",
            }}
            variants={floatingVariants}
            animate="animate"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center flex-grow p-4">
        <div className="flex bg-white rounded-lg shadow-lg max-w-4xl w-full h-auto">
          <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-100">
            <img src={img1} alt="Login Illustration" className="w-3/4" />
            <h2 className="text-xl font-bold mt-4 text-center text-gray-800">
              Connect. Apply. Succeed. Your future starts here.
            </h2>
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
            <p className="text-center text-gray-600">Select your role to continue</p>

            <div className="relative flex border-b mt-6">
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "user" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("user")}
              >
                User
              </button>
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "recruiter" ? "text-green-600" : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("recruiter")}
              >
                Recruiter
              </button>
              <div
                className={`absolute bottom-0 h-1 transition-all duration-300 ease-in-out ${activeTab === "user" ? "left-0 w-1/2 bg-blue-600" : "left-1/2 w-1/2 bg-green-600"
                  }`}
              ></div>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={activeTab === "user" ? userFormData.email : recruiterFormData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={activeTab === "user" ? userFormData.password : recruiterFormData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 px-4 rounded-md transition ${activeTab === "user" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                Login as {activeTab === "user" ? "User" : "Recruiter"}
              </button>
            </form>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/uregister" className="text-blue-600 hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
