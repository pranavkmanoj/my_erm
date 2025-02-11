import { Routes, Route } from "react-router-dom";
import Navbar from "./Layout/Navbar";
import Sidebar from "./Layout/Sidebar";
import JobPosting from "./data/JobPosting";
import Jobview from "./data/Jobview";

function Dashboard() {
    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Navbar */}
            <div className="fixed top-0 w-full z-50">
                <Navbar />
            </div>

            {/* Sidebar & Main Content */}
            <div className="flex flex-1 pt-16">
                <Sidebar />

                {/* Main Content Area (Updated via Nested Routes) */}
                <div className="flex-1 p-6 bg-gray-100 ml-64 md:ml-0 pt-1">
                    <Routes>

                        <Route path="job-posting" element={<JobPosting />} />
                        <Route path="job-view" element={<Jobview />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
