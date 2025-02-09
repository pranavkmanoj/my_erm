import React, { useState } from "react";
import logo from '../../assets/logo.jpg';

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

const Sidebar = () => {
  const [menus, setMenus] = useState({});

  const toggleMenu = (menu) => {
    setMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-gray-100 dark:bg-gray-800 p-4 shadow-md overflow-y-auto">
      <ul className="space-y-4 font-medium">
        <li><a href="#" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">ERM</a></li>
        <li>
          <button className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => toggleMenu('jobSearch')}>Job Search <span>{menus.jobSearch ? "▲" : "▼"}</span></button>
          {menus.jobSearch && (
            <ul className="pl-4 space-y-2">
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">View Job Listing</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Manage Job Posts</a></li>
            </ul>
          )}
        </li>
        <li>
          <button className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => toggleMenu('applications')}>Applications <span>{menus.applications ? "▲" : "▼"}</span></button>
          {menus.applications && (
            <ul className="pl-4 space-y-2">
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">View Application</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Application Status</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Candidate Profile</a></li>
            </ul>
          )}
        </li>
        <li>
          <button className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => toggleMenu('Interviews')}>Interviews<span>{menus.Interviews ? "▲" : "▼"}</span></button>
          {menus.Interviews && (
            <ul className="pl-4 space-y-2">
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Upcoming Interviews</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Interview History</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Reschedule/Cancel</a></li>
            </ul>
          )}
        </li>
        <li>
          <button className="flex items-center justify-between w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100" onClick={() => toggleMenu('Settings')}> Settings <span>{menus.Settings ? "▲" : "▼"}</span></button>
          {menus.Settings && (
            <ul className="pl-4 space-y-2">
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Account Settings</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Job Alerts</a></li>
              <li><a href="#" className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100">Privacy Settings</a></li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-6">
      <p>&copy; 2025 ERM. All rights reserved.</p>
      <p>Developed by Pranav K Manoj</p>
    </footer>
  );
};

// Layout component that wraps content
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 ml-64 p-6 mt-16">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
