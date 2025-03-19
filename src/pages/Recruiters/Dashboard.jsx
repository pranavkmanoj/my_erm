import { Routes, Route } from "react-router-dom";
import Navbar from "./Layout/Rec-Navbar";
import Sidebar from "./Layout/Rec-Sidebar";
import JobPosting from "./data/JobPosting";
import Jobview from "./data/Jobview";
import ViewApplication from "./data/view-application";
import ShortlistedCandidates from './data/shortlisted-candidates';
import ScheduleInterview from './data/schedule-interviews';
import ManageFeedback from './data/manage-feedback';
import CompanyProfile from './data/company-profile';
import AccountSettings from './data/account-settings';
import EditJob from './data/EditJob';

function Dashboard() {
    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Navbar */}
            <div className="fixed top-0 w-full z-50">
                <Navbar />
            </div>

            {/* Sidebar & Main Content */}
            <div className="flex flex-1 pt-16 flex-col md:flex-row">
                <Sidebar className="w-full md:w-64 fixed md:relative" />

                {/* Main Content Area (Updated via Nested Routes) */}
                <div className="flex-1 p-6 bg-gradient-to-b pt-1 md:ml-0">
                    <Routes>
                        <Route path="job-posting" element={<JobPosting />} />
                        <Route path="job-view" element={<Jobview />} />
                        <Route path="view-application" element={<ViewApplication />} />
                        <Route path="shortlisted-candidates" element={<ShortlistedCandidates />} />
                        <Route path="schedule-interviews" element={<ScheduleInterview />} />
                        <Route path="manage-feedback" element={<ManageFeedback />} />
                        <Route path="company-profile" element={<CompanyProfile />} />
                        <Route path="account-settings" element={<AccountSettings />} />
                        <Route path="edit-job" element={<EditJob />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
