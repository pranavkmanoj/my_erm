import React from 'react';

const MainContent = ({ selected }) => {
  const renderContent = () => {
    switch (selected) {
      case 'Dashboard':
        return <div>Dashboard Content</div>;
      case 'View Company Reg':
        return <div>View Company Registration Content</div>;
      case 'Approval/Decline':
        return <div>Approval/Decline Content</div>;
      case 'Employee Reg Management':
        return <div>Employee Registration Management Content</div>;
      case 'Job Posting Management':
        return <div>Job Posting Management Content</div>;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex-1 p-4">
      {renderContent()}
    </div>
  );
};

export default MainContent;