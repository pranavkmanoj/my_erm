import React, { useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/AuthContext";
import logo from "../../../assets/logo.webp";
import { motion, AnimatePresence } from "framer-motion";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate("/ulogin");
  };

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-[#140000] border-b border-gray-600 text-white fixed w-full z-50 px-4 md:px-8 lg:px-10 pt-4 pb-3 shadow-md"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on the left */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/rpanel")}
            className="flex-shrink-0 flex items-center"
          >
            <img src={logo} className="w-[90px] md:w-[130px]" alt="ERM Logo" />
          </motion.button>

          {/* Navigation items on the right */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard/job-posting")}
                className="text-[18px] font-medium hover:text-red-500 transition-colors duration-300"
              >
                Dashboard
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.05, color: "#dc2626" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-[18px] font-medium text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <LogOut size={20} className="flex-shrink-0" />
                  <span>Logout</span>
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#1a1a1a] shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => {
                  navigate("/dashboard");
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-3 rounded-md text-[20px] font-medium hover:bg-gray-800"
              >
                Dashboard
              </motion.button>

              {user && (
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-[20px] font-medium text-red-500 hover:bg-gray-800 hover:text-red-700"
                >
                  <div className="flex items-center">
                    <LogOut size={20} className="mr-2" />
                    Logout
                  </div>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar1;