import { Routes, Route, useLocation } from "react-router-dom";
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
import "../../App.css";

const AdminPanel = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <main className="p-6 flex-grow bg-gray-100 pt-4 relative">
          <Routes>
            <Route path="view-company" element={<ViewCompany />} />
            <Route path="Approved-Company" element={<ApprovedCompany />} />
            <Route path="Total-No.-Jobs" element={<TotalNoOfJobs />} />
            <Route path="Dash-board" element={<AdminDashboard />} />
            <Route path="View-total-job-posted" element={<ViewJobPost />} />
            <Route path="Job-filter" element={<JobFilter />} />
            <Route path="emp-delete" element={<DeleteEmployee />} />
          </Routes>

          {/* Show Welcome Message with Motion Effects */}
          {location.pathname === "/apanel" && (
            <motion.div
              initial={{ opacity: 10, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-0 flex bg-cover bg-center"
            >
              {/* Heading with Motion */}
              <motion.div
                initial={{ opacity: 10, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
                className="absolute inset-0 flex items-center justify-center bg-opacity-50"
              >
                <h1 className="text-6xl font-extrabold text-black px-6 py-4 rounded-lg">
                  Welcome to Admin Panel
                </h1>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;