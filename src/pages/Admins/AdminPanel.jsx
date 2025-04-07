import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Layout/Admin-Navbar";
import Sidebar from "./Layout/Admin-Sidebar";
import ViewCompany from "./data/ViewCompany";
import ApprovedCompany from "./data/ApprovedCompany";
import TotalNoOfJobs from "./data/TotalJobs";
import AdminDashboard from "./data/Admin-Dash";
import ViewJobPost from "./data/View-total-job-posted";
import JobFilter from "./data/Job-filter";
import DeleteEmployee from "./data/emp-delete";


const AdminPanel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleQuickStatsClick = () => {
    navigate("Dash-board");
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <main className="p-6 flex-grow bg-gray-100 pt-4 relative overflow-hidden">
          <Routes>
            <Route path="view-company" element={<ViewCompany />} />
            <Route path="Approved-Company" element={<ApprovedCompany />} />
            <Route path="Total-No.-Jobs" element={<TotalNoOfJobs />} />
            <Route path="Dash-board" element={<AdminDashboard />} />
            <Route path="View-total-job-posted" element={<ViewJobPost />} />
            <Route path="Job-filter" element={<JobFilter />} />
            <Route path="emp-delete" element={<DeleteEmployee />} />
          </Routes>

          {location.pathname === "/apanel" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50"
            >
              <div className="text-center max-w-4xl px-6">
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center shadow-lg text-blue-600 text-4xl">
                    👨‍💼
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                  >
                    Welcome Back, <span className="text-blue-600">Admin</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                  >
                    Manage your platform efficiently with our comprehensive admin tools and analytics dashboard.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex justify-center gap-4"
                  >
                    <button
                      onClick={handleQuickStatsClick}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
                    >
                      <span className="mr-2">📊</span>
                      Quick Stats
                    </button>

                  </motion.div>
                </motion.div>

                {/* Animated background elements */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute -top-20 -left-20 w-48 h-48 bg-blue-200 rounded-full opacity-20"
                />
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;