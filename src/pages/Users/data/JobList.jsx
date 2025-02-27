import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Navbar from "../Layout/User-Navbar";
import background from '../images/background.jpg';
import logo from '../../../assets/logo.jpg';
import API from '../../../../backend/axiosInstance';


const JobList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get('/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const closeDetails = () => {
    setSelectedJob(null);
  };

  const handleApply = (jobId) => {
    navigate(`/apply-jobs?jobId=${jobId}`);
  };

  const filteredJobs = jobs.filter(job =>
    job.status !== 'Closed' && (
      (job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.companyName && job.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (job.jobLocation && job.jobLocation.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen relative"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <Navbar />

      {/* Search Bar Section */}
      <div className="pt-20 w-full flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search by title, company, or location..."
            className="w-full p-4 pl-12 border border-gray-400 bg-white rounded-md shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-xl" />
        </div>
      </div>


      <div className={`container mx-auto mt-4 px-4 md:px-0 ${selectedJob ? 'blur-sm' : ''}`}>
        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-4 shadow-md rounded-md transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-blue-500">{job.jobTitle}</h3>
                  <p className="text-gray-600">{job.companyName}</p>
                  <p className="text-gray-600">{job.jobLocation}</p>
                  <p className="text-gray-600">Salary: ₹{job.salary}</p>
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">No jobs found.</p>
            )}
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full transform transition-transform scale-100 relative z-10">
            <h3 className="text-lg font-bold text-blue-500">{selectedJob.jobTitle}</h3>
            <p className="text-gray-600">{selectedJob.companyName}</p>
            <p className="text-gray-600">{selectedJob.description}</p>
            <p className="text-gray-600">Experience Required: {selectedJob.experience} years</p>
            <button
              onClick={closeDetails}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Close
            </button>
            <button
              onClick={() => handleApply(selectedJob._id)}
              className="mt-4 ml-2 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
