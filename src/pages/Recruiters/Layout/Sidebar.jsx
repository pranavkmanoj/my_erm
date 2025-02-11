import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  // Function to toggle main menus
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Function to toggle submenus
  const toggleSubMenu = (submenu) => {
    setOpenSubMenu(openSubMenu === submenu ? null : submenu);
  };

  return (
    <aside className="w-64 bg-black text-white p-4 h-full min-h-screen">
      <nav className="flex flex-col gap-2">
        {/* Job Posting */}
        <div>
          <div
            className="p-3 rounded cursor-pointer"
            onClick={() => toggleMenu("jobPosting")}
          >
            Job Postings
          </div>
          {openMenu === "jobPosting" && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/Dashboard/job-posting")}
              >
                Post Job
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/Dashboard/job-vie")}
              >
                Status
              </div>
            </div>
          )}
        </div>

        {/* Employee Registration Management */}
        <div>
          <div
            className="p-3 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => toggleMenu("employeeRegistration")}
          >
            Employee Registration Management
          </div>
          {openMenu === "employeeRegistration" && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Total-No.-Jobs")}
              >
                Total Number of Registrations
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Delete-Employee-acct")}
              >
                Delete Employee Account
              </div>
            </div>
          )}
        </div>

        {/* Job Posting Management */}
        <div>
          <div
            className="p-3 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => toggleMenu("jobManagement")}
          >
            Job Posting Management
          </div>
          {openMenu === "jobManagement" && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/View-total-job-posted")}
              >
                Total Job Posted
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Filter-Jobs")}
              >
                Filter Jobs
              </div>
            </div>
          )}
        </div>

        {/* Dashboard */}
        <div
          className="p-3 hover:bg-gray-700 rounded cursor-pointer"
          onClick={() => navigate("/apanel/DashBoard")}
        >
          Dashboard
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
