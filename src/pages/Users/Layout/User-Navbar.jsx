import React, { useState } from "react";
import { Bell, User, LogOut, Briefcase, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left - Logo and Brand Name */}
        <button onClick={() => navigate("/")} className="flex items-center space-x-3">
          <img src={logo} className="h-8 ml-2" alt="ERM Logo" />
          <span className="text-2xl font-semibold dark:text-white">ERM</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 text-lg font-medium">
          <button onClick={() => navigate("/job-listing")} className="hover:text-red-500 dark:text-white">Jobs</button>
          <button className="hover:text-red-500 dark:text-white">Applications</button>
          <button onClick={() => navigate("/interview")} className="hover:text-red-500 dark:text-white">Interviews</button>
        </div>

        {/* Right - Recruiter and Profile */}
        <div className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/ulogin")} className="flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500">
            <Briefcase size={20} />
            <span>Recruiter</span>
          </button>

          {/* Profile Button (Now Directly Navigates) */}
          <button
            onClick={() => navigate("/user-profile")}
            className="flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500"
          >
            <User size={24} className="rounded-full bg-gray-200 p-1 dark:bg-gray-700" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 py-4 bg-white dark:bg-gray-900 shadow-md">
          <button onClick={() => navigate("/job-listing")} className="hover:text-red-500 dark:text-white">Jobs</button>
          <button className="hover:text-red-500 dark:text-white">Applications</button>
          <button onClick={() => navigate("/interview")} className="hover:text-red-500 dark:text-white">Interviews</button>
          <button onClick={() => navigate("/rpanel")} className="flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500">
            <Briefcase size={20} />
            <span>Recruiter</span>
          </button>
          <div className="flex flex-col items-center space-y-2 mt-2">
            <button className="hover:text-red-500 dark:text-white">Notifications</button>
            <button onClick={() => navigate("/user-profile")} className="hover:text-red-500 dark:text-white">Account</button>
            <button className="text-red-500 hover:text-red-700">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;
