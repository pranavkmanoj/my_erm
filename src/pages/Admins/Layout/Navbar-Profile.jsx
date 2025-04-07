import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../Images/Admin_logo.jpg";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 bg-white hover:bg-gray-400 transition-all duration-200 p-2 rounded-lg"
        >
          <div className="relative">
            <img
              alt="User Profile"
              src={img}
              className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-gray-800 font-medium">Pranav K Manoj</span>
            <span className="text-gray-500 text-xs">Administrator</span>
          </div>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 z-20 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
          >
            <div className="py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Signed in as</p>
                <p className="text-sm text-gray-500 truncate">admin@gmail.com</p>
              </div>



              <div className="border-t border-gray-100">
                <button
                  onClick={() => navigate("/ulogin")}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;