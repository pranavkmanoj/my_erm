import React from 'react';
import img from '../../assets/logo.jpg'

const Navbar = () => {
  return (
    <nav className="bg-cyan-100 p-4 text-black">
      <div className="container mx-auto flex items-center">
        <img src={img} alt="Logo" className="h-8 mr-2" />
        <span className="font-bold text-xl">ERM</span>
      </div>
    </nav>
  );
};

export default Navbar;