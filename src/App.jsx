import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Users/UserLogin';
import RegistrationPage from './pages/Users/UserReg'; 
import AdminLoginPage from './pages/Admins/AdminLogin';
import AdminRegistrationPage from './pages/Admins/AdminReg'; 
import AdminPanel from './pages/Admins/AdminPanel';
import UserPanel from './pages/Users/UserPanel';
import Recuiter from './pages/Recruiters/RecuiterPage';
import ApprovedCompany from './pages/Admins/data/ApprovedCompany';
import TotalNoOfJobs from './pages/Admins/data/TotalJobs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ulogin" element={<LoginPage />} />
        <Route path="/uregister" element={<RegistrationPage />} />
        <Route path="/upanel" element={<UserPanel />} />
        <Route path="/alogin" element={<AdminLoginPage />} />
        <Route path="/aregister" element={<AdminRegistrationPage />} />
        <Route path="/apanel/*" element={<AdminPanel />} /> 
        <Route path="/Rpanel" element={<Recuiter/>} />
        <Route path="/AppCmpny" element={<ApprovedCompany/>} />
        <Route path="/TotalJobs" element={<TotalNoOfJobs/>} />
      </Routes>
    </Router>
  );
}

export default App;
