import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [employeeMenuOpen, setEmployeeMenuOpen] = useState(false);
  const [jobMenuOpen, setJobMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-800 text-white p-1">
      <nav className="flex flex-col gap-2">
        {/* Dashboard */}
        <div
          className="p-3 hover:bg-gray-700 rounded cursor-pointer"
          onClick={() => navigate("/apanel/Dash-board")}
        >
          Dashboard
        </div>
        {/* Company Registration Management */}
        <div>
          <div
            className="p-3 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
          >
            Company Registration Management
          </div>
          {companyMenuOpen && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/view-company")}
              >
                View Company Registrations
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Approved-Company")}
              >
                Approved Companies
              </div>
            </div>
          )}
        </div>

        {/* Employee Registration Management */}
        <div>
          <div
            className="p-3 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => setEmployeeMenuOpen(!employeeMenuOpen)}
          >
            Employee Registration Management
          </div>
          {employeeMenuOpen && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Total-No.-Jobs")}
              >
                Total Number of Registrations
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/emp-delete")}
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
            onClick={() => setJobMenuOpen(!jobMenuOpen)}
          >
            Job Posting Management
          </div>
          {jobMenuOpen && (
            <div className="ml-4">
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/View-total-job-posted")}
              >
                Total Job Posted
              </div>
              <div
                className="p-2 hover:bg-gray-600 rounded cursor-pointer"
                onClick={() => navigate("/apanel/Job-filter")}
              >
                Filter Jobs
              </div>
            </div>
          )}
        </div>


      </nav>
    </aside>
  );
};

export default Sidebar;
