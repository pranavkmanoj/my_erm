import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaGraduationCap, FaTools, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from "../Layout/User-Navbar";
import API from '../../../axiosInstance';

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
    <div className="min-h-screen bg-[#140000] text-white">
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="pt-24 px-4 pl-30 pr-30">
        {/* Search Bar */}
        <div className="w-full flex justify-center mb-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by title, company, or location..."
              className="w-full p-4 pl-12 border border-gray-400 bg-white rounded-md shadow-lg text-lg text-black focus:outline-none focus:ring-2 focus:ring-[#FB5607]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FB5607] text-xl" />
          </div>
        </div>

        {/* Job List */}
        <div className={`${selectedJob ? 'blur-sm' : ''}`}>
          {loading ? (
            <p className="text-center text-gray-400">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white text-[#140000] p-4 shadow-md rounded-md transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <h3 className="text-lg font-bold text-[#FB5607]">{job.jobTitle}</h3>
                    <p className="text-gray-700">{job.companyName}</p>
                    <p className="text-gray-700">{job.jobLocation}</p>
                    <p className="text-gray-700">Salary: ₹{job.salary}</p>
                    <button
                      onClick={() => handleViewDetails(job)}
                      className="mt-4 bg-[#FB5607] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition"
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 col-span-2">No jobs found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "rgba(20, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            zIndex: 50
          }}
        >
          <motion.div
            className="relative bg-white text-[#140000] p-8 rounded-xl shadow-2xl max-w-lg w-full border border-gray-200"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ scale: 0.8, opacity: 0, y: -50, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold text-[#FB5607] mb-4 flex items-center">
              <FaBriefcase className="mr-2 text-[#FB5607]" /> {selectedJob.jobTitle}
            </h3>

            <p className="text-lg font-semibold">{selectedJob.companyName}</p>
            <p className="mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" /> {selectedJob.jobLocation}
            </p>
            <p className="mb-2 flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-600" /> <strong>Salary:</strong> ₹{selectedJob.salary}
            </p>
            <p className="mb-2 flex items-center">
              <FaClock className="mr-2 text-purple-500" /> <strong>Job Type:</strong> {selectedJob.jobType}
            </p>
            <p className="mb-2 flex items-center">
              <FaBriefcase className="mr-2 text-yellow-500" /> <strong>Work Mode:</strong> {selectedJob.workMode || "Not specified"}
            </p>
            <p className="mb-2 flex items-center">
              <FaGraduationCap className="mr-2 text-indigo-500" /> <strong>Qualifications:</strong> {selectedJob.qualifications || "Not specified"}
            </p>
            <p className="mb-2 flex items-center">
              <FaTools className="mr-2 text-red-500" /> <strong>Skills:</strong> {selectedJob.skillsRequired?.join(', ') || "Not specified"}
            </p>
            <p className="mb-2 flex items-center">
              <FaCalendarAlt className="mr-2 text-pink-500" /> <strong>Application Deadline:</strong> {selectedJob.applicationDeadline || "Not specified"}
            </p>

            <div className="flex justify-between mt-6">
              <motion.button
                onClick={closeDetails}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Close
              </motion.button>
              <motion.button
                onClick={() => handleApply(selectedJob._id)}
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default JobList;
