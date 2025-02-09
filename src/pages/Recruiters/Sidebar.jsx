import React, { useState } from 'react';

const Sidebar = ({ onSelect }) => {
  const [companyRegOpen, setCompanyRegOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white w-64 space-y-2 p-4">
      <div className="font-bold text-lg">Admin Panel</div>
      <div className="space-y-1">
        <div 
          className="p-2 hover:bg-gray-700 cursor-pointer" 
          onClick={() => onSelect('Dashboard')}
        >
          Dashboard
        </div>
        <div 
          className="p-2 hover:bg-gray-700 cursor-pointer" 
          onClick={() => setCompanyRegOpen(!companyRegOpen)}
        >
          Company Reg Management
        </div>
        {companyRegOpen && (
          <div className="pl-4">
            <div 
              className="p-2 hover:bg-gray-700 cursor-pointer" 
              onClick={() => onSelect('View Company Reg')}
            >
              View Company Reg
            </div>
            <div 
              className="p-2 hover:bg-gray-700 cursor-pointer" 
              onClick={() => onSelect('Approval/Decline')}
            >
              Approval/Decline
            </div>
          </div>
        )}
        <div 
          className="p-2 hover:bg-gray-700 cursor-pointer" 
          onClick={() => onSelect('Employee Reg Management')}
        >
          Employee Reg Management
        </div>
        <div 
          className="p-2 hover:bg-gray-700 cursor-pointer" 
          onClick={() => onSelect('Job Posting Management')}
        >
          Job Posting Management
        </div>
      </div>
    </div>
  );
};

export default Sidebar;