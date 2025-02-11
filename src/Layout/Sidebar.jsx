import React, { useState } from "react";

const Sidebar = ({ setSelectedJob }) => {
  const [menus, setMenus] = useState({ jobSearch: false, Applications: false, Interview: false, Settings: false, Profile: false });

  const toggleMenu = (menu) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu], // Toggle the specific menu item
    }));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-gray-100 dark:bg-gray-800 p-4 shadow-md overflow-y-auto">
        <ul className="space-y-4 font-medium">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedJob("")} // Reset view when clicking ERM
            >
              ERM
            </a>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full p-2 text-indigo-800 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu("jobSearch")}
            >
              Job Search <span>{menus.jobSearch ? "▲" : "▼"}</span>
            </button>
            {menus.jobSearch && (
              <ul className="pl-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Job-Details")}
                  >
                    Job Details
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("JobListing")}
                  >
                    View Job Listing
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full p-2 text-indigo-800  rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu("Applications")}
            >
              Applications <span>{menus.Applications ? "▲" : "▼"}</span>
            </button>
            {menus.Applications && (
              <ul className="pl-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("")}
                  >
                    Applied Job
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("JobListing")}
                  >
                    Application Status
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full p-2 text-indigo-800  rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu("Interview")}
            >
              Interview <span>{menus.Interview ? "▲" : "▼"}</span>
            </button>
            {menus.Interview && (
              <ul className="pl-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Upcoming Interview")}
                  >
                    Upcoming Interview
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Interview History")}
                  >
                    Interview History
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Interview History")}
                  >
                    Reschedule/Cancel
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full p-2 text-indigo-800  rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu("Settings")}
            >
              Settings <span>{menus.Settings ? "▲" : "▼"}</span>
            </button>
            {menus.Settings && (
              <ul className="pl-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Account Settings")}
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Job Alert")}
                  >
                    Job Alert
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Privacy Settings")}
                  >
                    Privacy Settings
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full p-2 text-indigo-800  rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleMenu("Profile")}
            >
              Profile <span>{menus.Profile ? "▲" : "▼"}</span>
            </button>
            {menus.Profile && (
              <ul className="pl-4 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("View Profile")}
                  >
                    View Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Edit Profile")}
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Upload Resume")}
                  >
                    Upload Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 text-gray-900 rounded-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedJob("Portfolio")}
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
