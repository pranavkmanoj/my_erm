import React, { useState } from "react";
import { Bell, User, LogOut, Briefcase, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import logo from "../../../assets/logo.jpg";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const handleProfileClick = () => {
    if (user?.id) {
      navigate("/user-profile");
    } else {
      alert("You need to log in first!");
      navigate("/ulogin");
    }
  };

  const isActive = (path) =>
    location.pathname === path ? "text-red-500 font-semibold" : "text-gray-700 dark:text-white";

  return (
    <nav
      className="bg-white border-b border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 shadow-md"
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="flex items-center space-x-3"
        >
          <img src={logo} className="h-8 ml-2" alt="ERM Logo" />
          <span className="text-2xl font-semibold dark:text-white">ERM</span>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-medium">
          {["/job-listing", "/view-application", "/interview"].map((path, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(path)}
              className={`hover:text-red-500 transition-colors duration-300 ${isActive(path)}`}
            >
              {path === "/job-listing" ? "Jobs" : path === "/view-application" ? "Applications" : "Interviews"}
            </motion.button>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1, color: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/ulogin")}
            className={`flex items-center space-x-2 text-lg font-medium transition-all duration-300 ${isActive("/ulogin")}`}
          >
            <Briefcase size={20} />
            <span>Recruiter</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, color: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProfileClick}
            className={`flex items-center space-x-2 text-lg font-medium transition-all duration-300 ${isActive("/user-profile")}`}
          >
            <User size={24} className="rounded-full bg-gray-200 p-1 dark:bg-gray-700" />
            <span>Profile</span>
          </motion.button>
        </div>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white dark:bg-gray-900 shadow-md"
          >
            <motion.button
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              onClick={() => navigate("/job-listing")}
              className="hover:text-red-500 dark:text-white"
            >
              Jobs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              onClick={() => navigate("/view-application")}
              className="hover:text-red-500 dark:text-white"
            >
              Applications
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              onClick={() => navigate("/interview")}
              className="hover:text-red-500 dark:text-white"
            >
              Interviews
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, color: "#ef4444" }}
              onClick={() => navigate("/rpanel")}
              className="flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500"
            >
              <Briefcase size={20} />
              <span>Recruiter</span>
            </motion.button>
            <div className="flex flex-col items-center space-y-2 mt-2">
              <motion.button
                whileHover={{ scale: 1.1, color: "#ef4444" }}
                className="hover:text-red-500 dark:text-white"
              >
                Notifications
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#ef4444" }}
                onClick={handleProfileClick}
                className="hover:text-red-500 dark:text-white"
              >
                Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, color: "#dc2626" }}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar1;
