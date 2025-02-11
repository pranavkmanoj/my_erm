import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "./images/picture.png";


const floatingVariants = {
  animate: {
    y: [0, 20, 0], // Floating animation up and down
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const UserLogin = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userType = activeTab === "user" ? "users" : "recruiters";
    const storedUsers = JSON.parse(localStorage.getItem(userType)) || [];
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login successful!");
      navigate(activeTab === "user" ? "/upanel" : "/rpanel");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated Floating Background (Covers Entire Page) */}
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

      {/* Centered Login Form */}
      <div className="relative z-10 flex items-center justify-center flex-grow p-4">
        <div className="flex bg-white rounded-lg shadow-lg max-w-4xl w-full h-auto">
          {/* Left Section - Image */}
          <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-gray-100">
            <img src={img1} alt="Login Illustration" className="w-3/4" />
            <h2 className="text-xl font-bold mt-4 text-center text-gray-800">
              Connect. Apply. Succeed. Your future starts here.
            </h2>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
            <p className="text-center text-gray-600">Select your role to continue</p>

            {/* Tab Navigation */}
            <div className="relative flex border-b mt-6">
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "user"
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("user")}
              >
                User
              </button>
              <button
                className={`flex-1 text-center py-2 text-lg font-medium transition ${activeTab === "recruiter"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
                onClick={() => setActiveTab("recruiter")}
              >
                Recruiter
              </button>

              {/* Underline Animation */}
              <div
                className={`absolute bottom-0 h-1 transition-all duration-300 ease-in-out ${activeTab === "user"
                  ? "left-0 w-1/2 bg-blue-600"
                  : "left-1/2 w-1/2 bg-green-600"
                  }`}
              ></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 px-4 rounded-md transition ${activeTab === "user"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                Login as {activeTab === "user" ? "User" : "Recruiter"}
              </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={activeTab === "user" ? "/uregister" : "/rregister"}
                className="text-blue-600 font-medium hover:underline"
              >
                Signup Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
