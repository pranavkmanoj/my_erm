import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserPanel from './pages/Users/UserPanel';
import RegistrationPage from './pages/Users/UserReg';
import LoginPage from './pages/Users/UserLogin';
import BrowseJob from './pages/Users/data/BrowseJob';
import JobDetails from './pages/Users/data/JobDetails';
import JobListing from './pages/Users/data/JobList';
import ScheduleInterview from './pages/Users/data/ScheduleInterview';


import AdminLoginPage from './pages/Admins/AdminLogin';
import AdminRegistrationPage from './pages/Admins/AdminReg';
import AdminPanel from './pages/Admins/AdminPanel';


import Recuiter from './pages/Recruiters/Rpanel';
import Dashboard from './pages/Recruiters/Dashboard';
import JobPostingForm from './pages/Recruiters/data/JobPosting';
import Jobview from './pages/Recruiters/data/Jobview';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/uregister" element={<RegistrationPage />} />

        <Route path="/upanel" element={<UserPanel />} />
        <Route path="/browsejobs" element={<BrowseJob />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/interview" element={<ScheduleInterview />} />

        <Route path="/alogin" element={<AdminLoginPage />} />
        <Route path="/aregister" element={<AdminRegistrationPage />} />
        <Route path="/apanel/*" element={<AdminPanel />} />


        <Route path="/rpanel" element={<Recuiter />} />
        <Route path="/job-posting" element={<JobPostingForm />} />
        <Route path="/job-status" element={<Jobview />} />
        <Route path="/dashboard/*" element={<Dashboard />} />



      </Routes>
    </Router>
  );
}

export default App;
