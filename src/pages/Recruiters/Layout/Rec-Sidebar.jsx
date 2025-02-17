import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-3 fixed top-4 left-4 bg-blue-500 text-white rounded z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-gradient-to-b from-blue-100 to-blue-200 text-black p-4 h-full min-h-screen transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static`}
      >
        <nav className="flex flex-col gap-2">
          {/* Job Posting */}
          <div>
            <motion.div
              whileHover={{ backgroundColor: "white" }}
              className="p-3 rounded cursor-pointer transition-all"
              onClick={() => toggleMenu("jobPosting")}
            >
              Job Postings
            </motion.div>
            {openMenu === "jobPosting" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-4"
              >
                <motion.div
                  whileHover={{ backgroundColor: "white" }}
                  className="p-2 rounded cursor-pointer transition-all"
                  onClick={() => navigate("/Dashboard/job-posting")}
                >
                  Post Job
                </motion.div>
                <motion.div
                  whileHover={{ backgroundColor: "white" }}
                  className="p-2 rounded cursor-pointer transition-all"
                  onClick={() => navigate("/Dashboard/job-view")}
                >
                  Status
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Other Menu Sections */}
          {[
            {
              title: "Application", links: [
                { name: "View Applications", path: "/Dashboard/view-application" },
                { name: "Shortlisted Candidates", path: "/Dashboard/shortlisted-candidates" }
              ]
            },
            {
              title: "Interview Scheduling", links: [
                { name: "Schedule Interviews", path: "/Dashboard/schedule-interviews" },
                { name: "Manage Feedback", path: "/Dashboard/manage-feedback" }
              ]
            },
            {
              title: "Profile & Settings", links: [
                { name: "Company Profile", path: "/Dashboard/company-profile" },
                { name: "Account Settings", path: "/Dashboard/account-settings" }
              ]
            },
          ].map((menu, index) => (
            <div key={index}>
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-3 rounded cursor-pointer transition-all"
                onClick={() => toggleMenu(menu.title)}
              >
                {menu.title}
              </motion.div>
              {openMenu === menu.title && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4"
                >
                  {menu.links.map((link, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ backgroundColor: "white" }}
                      className="p-2 rounded cursor-pointer transition-all"
                      onClick={() => navigate(link.path)}
                    >
                      {link.name}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
