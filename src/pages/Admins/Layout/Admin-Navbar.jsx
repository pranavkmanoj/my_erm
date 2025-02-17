import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/logo.jpg";
import Profile from "./Navbar-Profile";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center relative">
      {/* Logo & ERM - Click to Navigate */}
      <div
        className="text-xl font-bold flex items-center cursor-pointer"
        onClick={() => navigate("/apanel")}
      >
        <img src={img} alt="Logo" className="h-8 w-8 mr-2" />
        ERM
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Section */}
        <div
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            {/* Notification Icon */}
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3c0 .386-.149.752-.405 1.045L4 17h5m6 0a3 3 0 11-6 0"
              ></path>
            </svg>
            <span>Notification</span>
          </div>

          {/* Notification Dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute right-0 top-full mt-2 w-64 bg-white text-black rounded-md shadow-lg p-4 z-50"
            >
              <h3 className="font-bold text-lg">Notifications</h3>
              <ul className="mt-2">
                <li className="p-2 border-b hover:bg-gray-100 cursor-pointer">
                  New user registered
                </li>
                <li className="p-2 border-b hover:bg-gray-100 cursor-pointer">
                  Company updated details
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  New job posting available
                </li>
              </ul>
            </motion.div>
          )}
        </div>

        {/* Profile Section */}
        <Profile />
      </div>
    </header>
  );
};

export default Navbar;
