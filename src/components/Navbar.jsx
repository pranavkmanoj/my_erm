import React from "react";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3">
          <img src={logo} className="h-8 ml-6" alt="ERM Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ERM</span>
        </a>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
