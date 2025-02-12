import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  // Function to toggle main menus
  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-100 to-blue-200 text-black p-4 h-full min-h-screen">
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

        {/* Application */}
        <div>
          <motion.div
            whileHover={{ backgroundColor: "white" }}
            className="p-3 rounded cursor-pointer transition-all"
            onClick={() => toggleMenu("application")}
          >
            Application
          </motion.div>
          {openMenu === "application" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4"
            >
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/view-application")}
              >
                View Applications
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/shortlisted-candidates")}
              >
                Shortlisted Candidates
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Interview Scheduling*/}
        <div>
          <motion.div
            whileHover={{ backgroundColor: "white" }}
            className="p-3 rounded cursor-pointer transition-all"
            onClick={() => toggleMenu("interviewScheduling")}
          >
            Interview Scheduling
          </motion.div>
          {openMenu === "interviewScheduling" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4"
            >
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/schedule-interviews")}
              >
                Schedule Interviews
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/manage-feedback")}
              >
                Manage Feedback
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Profile & Settings */}
        <div>
          <motion.div
            whileHover={{ backgroundColor: "white" }}
            className="p-3 rounded cursor-pointer transition-all"
            onClick={() => toggleMenu("profile&settings")}
          >
            Profile & Settings
          </motion.div>
          {openMenu === "profile&settings" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="ml-4"
            >
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/company-profile")}
              >
                Company Profile
              </motion.div>
              <motion.div
                whileHover={{ backgroundColor: "white" }}
                className="p-2 rounded cursor-pointer transition-all"
                onClick={() => navigate("/Dashboard/account-settings")}
              >
                Account Settings
              </motion.div>
            </motion.div>
          )}
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;
