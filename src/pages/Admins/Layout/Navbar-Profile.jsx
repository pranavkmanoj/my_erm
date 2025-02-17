import { useState } from "react";
import { motion } from "framer-motion";
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
          className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-md"
        >
          <img
            alt="User Profile"
            src={img}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <span className="text-zinc-800 font-medium">Pranav K Manoj</span>
            <span className="text-green-500 text-xs">• Admin</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg"
        >
          <div className="border-t border-zinc-200">
            <button
              onClick={() => navigate("/ulogin")}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
