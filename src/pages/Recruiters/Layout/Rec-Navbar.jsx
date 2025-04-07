import React, { useState } from "react";
import { Bell, User, LogOut, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("recruiterToken"); // Assuming token is stored here
    navigate("/ulogin");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 shadow-md flex items-center justify-between px-4 py-3 w-full">
      {/* Logo and Brand Name */}
      <button onClick={() => navigate("/rpanel")} className="flex items-center space-x-3">
        <img src={logo} className="h-8 ml-2" alt="ERM Logo" />
        <span className="text-2xl font-semibold text-black">ERM</span>
        <span className="hidden sm:inline">for Employers</span>
      </button>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} className="text-gray-700 dark:text-white" /> : <Menu size={28} className="text-gray-700 dark:text-white" />}
      </button>

      {/* Menu Items */}
      <div className={`absolute md:static bottom-0 left-0 right-0 bg-white text-black md:flex md:items-center md:space-x-6 px-4 md:px-0 py-3 md:py-0 shadow-md md:shadow-none transition-transform transform ${menuOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"} flex flex-col md:flex-row md:translate-y-0`}>
        <motion.button
          whileHover={{ scale: 1.1, color: "#ef4444" }}
          onClick={() => navigate("/Dashboard")}
          className={`block md:inline-block text-lg font-medium px-3 py-2 transition-all duration-300 ${location.pathname === "/Dashboard" ? "text-red-500 font-semibold" : "dark:text-black hover:text-red-500"
            }`}
        >
          Dashboard
        </motion.button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.1, color: "#ef4444" }}
            className="flex items-center space-x-2 text-lg font-medium dark:text-black hover:text-red-500 transition-all"
          >
            <User size={24} className="rounded-full bg-gray-200 p-1 dark:bg-gray-200" />
            <span>Profile</span>
          </motion.button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col">
            <button className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
              <Bell size={20} className="text-blue-500" /> <span>Notifications</span>
            </button>
            <button className="flex items-center px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
              <User size={20} className="text-green-500" /> <span>Account</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold"
            >
              <LogOut size={20} className="text-red-500" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
