import { Routes, Route } from "react-router-dom";
import ViewCompany from "../Admins/data/ViewCompany";
import ApprovedCompany from "../Admins/data/ApprovedCompany";
import TotalNoOfJobs from "../Admins/data/TotalJobs";
import Navbar from "../Admins/Layout/Navbar";
import Sidebar from "../Admins/Layout/Sidebar";

const AdminPanel = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar - Fixed at the top */}
      <Navbar />

      {/* Content Wrapper with Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar - Positioned below Navbar, permanent */}
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="p-6 flex-grow bg-gray-100 pt-4">
          <Routes>
            <Route path="view-company" element={<ViewCompany />} />
            <Route path="Approved-Company" element={<ApprovedCompany />} />
            <Route path="Total-No.-Jobs" element={<TotalNoOfJobs />} />
            {/* Add more routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
