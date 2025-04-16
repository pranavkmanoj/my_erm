import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosInstance";
import img1 from "./images/login image.webp";
import logo from "../../assets/logo.webp";
import { useUser } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const floatingVariants = {
  animate: {
    y: [0, 20, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const UserLogin = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [formData, setFormData] = useState({
    user: { email: "", password: "" },
    recruiter: { email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [activeTab]: { ...prevState[activeTab], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const role = activeTab === "user" ? "user-login" : "recruiter-login";
      const response = await axiosInstance.post(`/auth/${role}`, formData[activeTab]);

      if (!response.data.token) throw new Error("Authentication token missing in response.");

      const decoded = jwtDecode(response.data.token);
      const userData = {
        id: decoded.id,
        role: response.data.role,
        token: response.data.token,
      };

      if (activeTab === "recruiter") {
        userData.recruiterId = decoded.recruiterId || null;
      }

      if (activeTab === "user") {
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        localStorage.setItem("recruiterData", JSON.stringify(userData));
        localStorage.setItem("token", response.data.token);
      }

      setUser(userData);
      console.log("✅ Login successful. Stored user:", userData);

      navigate(userData.role === "user" ? "/" : "/rpanel");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#FB5607] to-[#140000]">
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="h-12 w-auto object-contain"
        />
      </div>
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
              backgroundColor: i % 2 === 0 ? "rgba(234, 3, 63, 0.3)" : "rgba(251, 86, 7, 0.3)",
            }}
            variants={floatingVariants}
            animate="animate"
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center flex-grow p-4">
        <div className="flex bg-white rounded-xl shadow-2xl max-w-4xl w-full h-auto overflow-hidden border">
          {/* Left Side with Image and Overlay Text */}
          <div className="hidden md:flex w-1/2 relative">
            <img
              src={img1}
              alt="Login Illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <motion.h2
                className="text-3xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Unlock Your Professional Journey
              </motion.h2>
              <motion.p
                className="text-xl text-white/90 font-light mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Where talent meets opportunity
              </motion.p>
              <motion.div
                className="w-16 h-1 bg-white/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>

          {/* Right Side with Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-black">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h2>
            <p className="text-center text-white mb-6">Select your role to continue</p>

            <div className="relative flex border-b border-gray-200 mt-2">
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "user" ? "text-[#EA033F]" : "text-white hover:text-gray-200"
                  }`}
                onClick={() => setActiveTab("user")}
              >
                User
              </button>
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "recruiter" ? "text-[#FB5607]" : "text-white hover:text-gray-200"
                  }`}
                onClick={() => setActiveTab("recruiter")}
              >
                Recruiter
              </button>

              <Link
                to="/alogin"
                className="flex-1 text-center py-2 text-lg font-medium text-white hover:text-[#EA033F] transition"
              >
                Admin
              </Link>

              <motion.div
                className={`absolute bottom-0 h-1 transition-all duration-300 ease-in-out ${activeTab === "user"
                  ? "left-0 w-1/3 bg-[#EA033F]"
                  : activeTab === "recruiter"
                    ? "left-1/3 w-1/3 bg-[#FB5607]"
                    : "left-2/3 w-1/3 bg-white"
                  }`}
                layoutId="underline"
              />
            </div>

            {error && <p className="text-[#EA033F] text-center mt-4 font-medium">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData[activeTab].email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border bg-white border-white rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData[activeTab].password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA033F] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white py-3 px-4 rounded-lg font-medium transition-all ${activeTab === "user"
                  ? "bg-[#EA033F] hover:bg-[#d00239] shadow-md hover:shadow-lg"
                  : "bg-[#FB5607] hover:bg-[#e04d06] shadow-md hover:shadow-lg"}`}
                disabled={loading}
              >
                {loading ? "Processing..." : `Login as ${activeTab === "user" ? "User" : "Recruiter"}`}
              </button>
            </form>

            <p className="mt-6 text-center text-white">
              Don't have an account?{" "}
              <Link to="/uregister" className="text-[#EA033F] hover:underline font-medium">
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