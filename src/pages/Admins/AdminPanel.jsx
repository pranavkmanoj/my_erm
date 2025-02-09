  import { Routes, Route } from "react-router-dom";
  import ViewCompany from "../Admins/data/ViewCompany";
  import ApprovedCompany from "../Admins/data/ApprovedCompany";
  import TotalNoOfJobs from "../Admins/data/TotalJobs";
  import Navbar from "../Admins/Layout/Navbar";
  import Sidebar from "../Admins/Layout/Sidebar";
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
            </Routes>
          </main>
        </div>
      </div>
    );
  };

  export default AdminPanel;
