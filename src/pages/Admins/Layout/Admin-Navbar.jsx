import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/logo.webp";
import Profile from "./Navbar-Profile";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center relative">
      {/* Logo & ERM - Click to Navigate */}
      <div
        className="text-xl font-bold flex items-center cursor-pointer"
        onClick={() => navigate("/apanel")}
      >
        <img src={img} alt="Logo" className="w-[90px] md:w-[120px]" />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Section */}
        <div
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >

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
