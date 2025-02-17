import React from "react";
import { FaSearch, FaMapMarkerAlt, FaSlidersH } from "react-icons/fa";
import img from '../images/coverforBrowse.jpg';
import Navbar1 from "../Layout/User-Navbar";
import "../../../App.css";

const BrowseJob = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Navbar */}
      <Navbar1 />
      {/* Background Image with Glass Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center backdrop-blur-lg"
        style={{ backgroundImage: `url(${img})` }}
      >

      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-semibold mb-6">
          The Smartest Way to Get Hired
        </h1>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row bg-white p-2 md:p-3 rounded-lg shadow-lg max-w-3xl mx-auto">
          {/* Keywords Input */}
          <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/3">
            <FaSearch className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Keywords"
              className="w-full focus:outline-none"
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/3 mt-2 md:mt-0 md:mx-2">
            <FaMapMarkerAlt className="text-gray-400 mx-2" />
            <input
              type="text"
              placeholder="Location"
              className="w-full focus:outline-none"
            />
            <button className="text-gray-400 px-2 hover:text-red-500">✖</button>
          </div>

          {/* Distance Dropdown */}
          <div className="flex items-center border border-gray-300 rounded-md p-2 w-full md:w-1/4 mt-2 md:mt-0">
            <FaSlidersH className="text-gray-400 mx-2" />
            <select className="w-full focus:outline-none">
              <option>Distance</option>
              <option>5 km</option>
              <option>10 km</option>
              <option>20 km</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-green-500 text-white px-6 py-2 rounded-md mt-2 md:mt-0 md:ml-2 hover:bg-green-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseJob;
