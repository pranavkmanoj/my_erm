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


import Recuiter from './pages/Recruiters/RecuiterPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ulogin" element={<LoginPage />} />
        <Route path="/uregister" element={<RegistrationPage />} />

        <Route path="/upanel" element={<UserPanel />} />
        <Route path="/browsejobs" element={<BrowseJob />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/job-listing" element={<JobListing />} />
        <Route path="/interview" element={<ScheduleInterview />} />

        <Route path="/alogin" element={<AdminLoginPage />} />
        <Route path="/aregister" element={<AdminRegistrationPage />} />
        <Route path="/apanel/*" element={<AdminPanel />} />

        <Route path="/Rpanel" element={<Recuiter />} />

      </Routes>
    </Router>
  );
}

export default App;
