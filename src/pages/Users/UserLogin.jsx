import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../axiosInstance"; // Axios instance for API calls
import img1 from "./images/picture.png";
import { useUser } from "../../context/AuthContext"; // Import useUser context
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
  const { setUser } = useUser(); // Use context to store user data

  // Handle input changes separately for each role
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [activeTab]: { ...prevState[activeTab], [name]: value },
    }));
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const role = activeTab === "user" ? "user-login" : "recruiter-login";
      const response = await axiosInstance.post(`/auth/${role}`, formData[activeTab]);

      const { token, role: userRole } = response.data;
      const decoded = jwtDecode(token); // Extract ID from token

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify({ id: decoded.id, role: userRole, token }));

      // Update user in context
      setUser({ id: decoded.id, role: userRole, token });

      // Redirect user based on role
      navigate(userRole === "user" ? "/" : "/rpanel");
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Background Floating Animation */}
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
        <div className="flex bg-white rounded-lg shadow-lg max-w-4xl w-full h-auto overflow-hidden">
          {/* Left Side Illustration */}
          <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-100 p-6">
            <img src={img1} alt="Login Illustration" className="w-3/4" />
            <h2 className="text-xl font-bold mt-4 text-center text-gray-800">
              Connect. Apply. Succeed. Your future starts here.
            </h2>
          </div>

          {/* Right Side Login Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
            <p className="text-center text-gray-600">Select your role to continue</p>

            {/* Role Toggle Buttons */}
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
              <motion.div
                className={`absolute bottom-0 h-1 transition-all duration-300 ease-in-out ${activeTab === "user" ? "left-0 w-1/2 bg-blue-600" : "left-1/2 w-1/2 bg-green-600"
                  }`}
                layoutId="underline"
              />
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData[activeTab].email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  aria-label="Email Address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData[activeTab].password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  aria-label="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 px-4 rounded-md transition ${activeTab === "user" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                  }`}
                disabled={loading}
              >
                {loading ? "Logging in..." : `Login as ${activeTab === "user" ? "User" : "Recruiter"}`}
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
