import { Routes, Route } from "react-router-dom";
import Navbar from "../Admins/Layout/Navbar";
import Sidebar from "../Admins/Layout/Sidebar";
import ViewCompany from "../Admins/data/ViewCompany";
import ApprovedCompany from "../Admins/data/ApprovedCompany";
import TotalNoOfJobs from "../Admins/data/TotalJobs";
import AdminDashboard from "./data/Admin-Dash";
import RMP from "./data/RecruiterManagementPanel";
import ViewJobPost from "./data/View-total-job-posted";
import JobFilter from "./data/Job-filter";

import '../../App.css'

const AdminPanel = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <main className="p-6 flex-grow bg-gray-100 pt-4">
          <Routes>
            <Route path="view-company" element={<ViewCompany />} />
            <Route path="Approved-Company" element={<ApprovedCompany />} />
            <Route path="Total-No.-Jobs" element={<TotalNoOfJobs />} />
            <Route path="Dash-board" element={<AdminDashboard />} />
            <Route path="RecruiterManagementPanel" element={<RMP />} />
            <Route path="View-total-job-posted" element={<ViewJobPost />} />
            <Route path="Job-filter" element={<JobFilter />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
