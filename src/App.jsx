import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider

import UserPanel from './pages/Users/UserPanel';
import RegistrationPage from './pages/Users/UserReg';
import LoginPage from './pages/Users/UserLogin';
import BrowseJob from './pages/Users/data/BrowseJob';
import JobDetails from './pages/Users/data/JobDetails';
import JobListing from './pages/Users/data/JobList';
import ScheduleInterview from './pages/Users/data/ScheduleInterview';
import ApplyJobs from './pages/Users/data/Apply-Jobs';
import UserProfile from './pages/Users/data/user_profile';
import ViewApplication from './pages/Users/data/ViewApplication';

import AdminPanel from './pages/Admins/AdminPanel';
import AdminLogin from './pages/Admins/AdminLogin';
import AdminRegister from './pages/Admins/AdminReg';

import Recruiter from './pages/Recruiters/Rpanel';
import Dashboard from './pages/Recruiters/Dashboard';

function App() {
  return (
    <AuthProvider> {/* Wrapping App with AuthProvider */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/ulogin" element={<LoginPage />} />
          <Route path="/uregister" element={<RegistrationPage />} />

          <Route path="/" element={<UserPanel />} />
          <Route path="/browsejobs" element={<BrowseJob />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/job-listing" element={<JobListing />} />
          <Route path="/interview" element={<ScheduleInterview />} />
          <Route path="/apply-jobs" element={<ApplyJobs />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/view-application" element={<ViewApplication />} />


          <Route path="/alogin" element={<AdminLogin />} />
          <Route path="/aregister" element={<AdminRegister />} />

          {/* Protected Routes (Handled inside components instead) */}
          <Route path="/apanel/*" element={<AdminPanel />} />
          <Route path="/rpanel" element={<Recruiter />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
