import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 shadow-md flex justify-between items-center px-4 py-3">
      {/* Logo and Brand Name */}
      <button onClick={() => navigate("/rpanel")} className="flex items-center space-x-3">
        <img src={logo} className="h-8 ml-2" alt="ERM Logo" />
        <span className="text-2xl font-semibold dark:text-white">ERM</span>
        <span>for Employers</span>
      </button>

      {/* Profile Dropdown */}
      <div className="relative flex items-center space-x-6">
        <button
          onClick={() => navigate("/Dashboard")}
          className="hidden md:flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500"
        >
          <span>Dashboard</span>
        </button>
        <div className="group relative">
          <button className="flex items-center space-x-2 text-lg font-medium dark:text-white hover:text-red-500">
            <User size={24} className="rounded-full bg-gray-200 p-1 dark:bg-gray-700" />
            <span>Profile</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden flex flex-col">
            <button className="flex items-center justify-start px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3 text-gray-700 dark:text-white">
              <Bell size={20} className="text-blue-500" /> <span>Notifications</span>
            </button>
            <button className="flex items-center justify-start px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3 text-gray-700 dark:text-white">
              <User size={20} className="text-green-500" /> <span>Account</span>
            </button>
            <button className="flex items-center justify-start px-4 py-3 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 gap-3 font-semibold">
              <LogOut size={20} className="text-red-500" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
