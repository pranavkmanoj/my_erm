import React, { useState } from 'react';
import Navbar from '../Recruiters/Navbar';
import Sidebar from '../Recruiters/Sidebar';
import MainContent from '../Recruiters/MainContent';

const Recuiter = () => {
  const [selected, setSelected] = useState('Dashboard');

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onSelect={setSelected} />
        <MainContent selected={selected} />
      </div>
    </div>
  );
};

export default Recuiter;