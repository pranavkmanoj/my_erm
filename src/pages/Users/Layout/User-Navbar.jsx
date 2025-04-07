import React, { useState } from "react";
import { Bell, User, LogOut, Briefcase, Menu, X, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import logo from "../../../assets/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const handleProfileClick = () => {
    if (user?.id) {
      navigate("/user-profile");
    } else {
      alert("You need to log in first!");
      navigate("/ulogin");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/ulogin");
  };

  const isActive = (path) =>
    location.pathname === path ? "text-red-500 font-semibold" : "text-gray-800";

  return (
    <nav className="bg-black border-b border-gray-200 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex-shrink-0 flex items-center"
          >
            <img src={logo} className="h-8" alt="ERM Logo" />
            <span className="ml-2 text-xl sm:text-2xl font-semibold text-white">ERM</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:ml-6 md:items-center md:space-x-4 lg:space-x-8">
            <div className="flex space-x-4 lg:space-x-8">
              {["/job-listing", "/view-application", "/interview"].map((path, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, color: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(path)}
                  className={`px-5 py-2 text-lg font-semibold text-white hover:text-red-500 transition-colors duration-300 ${isActive(path)}`}
                >
                  {path === "/job-listing" ? "Jobs" : path === "/view-application" ? "Applications" : "Interviews"}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05, color: "#ef4444" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/ulogin")}
              className={`flex items-center space-x-1 text-lg font-medium text-white hover:text-red-500 transition-colors duration-300 ${isActive("/ulogin")}`}
            >
              <Briefcase size={18} className="flex-shrink-0" />
              <span>Recruiter</span>
            </motion.button>

            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05, color: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleProfileClick}
                  className={`flex items-center space-x-1 text-lg font-medium text-white hover:text-red-500 transition-colors duration-300 ${isActive("/user-profile")}`}
                >
                  <User size={20} className="flex-shrink-0 rounded-full bg-gray-200 p-0.5" />
                  <span>Profile</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, color: "#dc2626" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-lg font-medium text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <LogOut size={18} className="flex-shrink-0" />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, color: "#ef4444" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/ulogin")}
                className="flex items-center space-x-1 text-sm lg:text-base font-medium hover:text-red-500 transition-colors duration-300"
              >
                <LogIn size={18} className="flex-shrink-0" />
                <span>Login</span>
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="text-gray-800 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["/job-listing", "/view-application", "/interview"].map((path, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    navigate(path);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActive(path)} hover:bg-gray-100`}
                >
                  {path === "/job-listing" ? "Jobs" : path === "/view-application" ? "Applications" : "Interviews"}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => {
                  navigate("/ulogin");
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActive("/ulogin")} hover:bg-gray-100`}
              >
                <div className="flex items-center">
                  <Briefcase size={18} className="mr-2" />
                  Recruiter
                </div>
              </motion.button>

              {user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => {
                      handleProfileClick();
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${isActive("/user-profile")} hover:bg-gray-100`}
                  >
                    <div className="flex items-center">
                      <User size={18} className="mr-2 rounded-full bg-gray-200 p-0.5" />
                      Profile
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100 hover:text-red-700"
                  >
                    <div className="flex items-center">
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </div>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    navigate("/ulogin");
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar1;