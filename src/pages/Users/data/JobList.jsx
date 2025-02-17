import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import background from '../images/background.jpg';
import logo from '../../../assets/logo.jpg';

const jobListings = [
  { title: "Mern Stack Developer Freelancer", company: "Vingsfire HRIM Pvt Ltd", location: "Remote", salary: "13K-163K (Employer Est.)" },
  { title: "Frontend Developer", company: "Tech Solutions Ltd", location: "Full-Time", salary: "20K-180K (Employer Est.)" },
  { title: "Backend Developer", company: "Innovatech Pvt Ltd", location: "Part-Time", salary: "30K-200K (Employer Est.)" },
  { title: "Mern Stack Developer Freelancer", company: "Vingsfire HRIM Pvt Ltd", location: "Remote", salary: "13K-163K (Employer Est.)" },
  { title: "Backend Developer", company: "Innovatech Pvt Ltd", location: "Full-Time", salary: "30K-200K (Employer Est.)" }
];

const JobSearchUI = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = () => {
    navigate('/Apply-Jobs');
  };
  const handleProfile = () => {
    navigate('/Profile');
  };

  const filteredJobs = jobListings.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Navbar */}
      <nav className="bg-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="h-10" />
          <span className="text-2xl font-bold text-gray-800">ERM</span>
        </div>
        <div>
          <button
            onClick={handleProfile}
            className="text-blue-500 px-4 py-2 rounded-md transition duration-300 ease-in-out bg-blue-100 hover:bg-blue-500 hover:text-white shadow-md"
          >
            Profile
          </button>
        </div>
      </nav>

      {/* Search Filter */}
      <div className="container mx-auto mt-4 px-4 md:px-0">
        <div className="relative w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search by title, company, or location..."
            className="w-full p-3 pl-10 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto mt-4 px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-md">
              <div className="flex flex-col md:flex-row justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-blue-500">{job.title}</h3>
                  <div className="text-gray-600">{job.company}</div>
                  <div className="text-gray-600">{job.location}</div>
                  <div className="text-gray-600">{job.salary}</div>
                </div>
                <div className="flex flex-col items-end mt-4 md:mt-0">
                  <button
                    onClick={handleApply}
                    className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
                  >
                    Easy Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearchUI;
