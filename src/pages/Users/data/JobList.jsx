import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Navbar from "../Layout/User-Navbar";
import background from '../images/background.jpg';
import API from '../../../axiosInstance';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaGraduationCap, FaTools, FaCalendarAlt } from 'react-icons/fa';

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
    console.log("Selected Job:", job);
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
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
  };

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

      {/* Job List */}
      <div className={`container mx-auto mt-4 px-4 md:px-0 ${selectedJob ? 'blur-sm' : ''}`}>
        {loading ? (
          <p className="text-center text-gray-600">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Job Details Modal */}
      {selectedJob && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: "linear-gradient(to right, #f0f2f5, #e6e9ec)", // Soft gradient
            backdropFilter: "blur(10px)", // Elegant Blur Effect
          }}
        >
          {/* Job Details Card with Elegant Styling */}
          <motion.div
            className="relative bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full border border-gray-200"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ scale: 0.8, opacity: 0, y: -50, transition: { duration: 0.3 } }}
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
              <FaBriefcase className="mr-2 text-blue-500" /> {selectedJob.jobTitle}
            </h3>

            <p className="text-lg font-semibold text-gray-800 mb-2">{selectedJob.companyName}</p>
            <p className="text-gray-600 mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" /> {selectedJob.jobLocation}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaMoneyBillWave className="mr-2 text-green-500" /> <strong>Salary:</strong> ₹{selectedJob.salary}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaClock className="mr-2 text-purple-500" /> <strong>Job Type:</strong> {selectedJob.jobType}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaBriefcase className="mr-2 text-yellow-500" /> <strong>Work Mode:</strong> {selectedJob.workMode || "Not specified"}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaGraduationCap className="mr-2 text-indigo-500" /> <strong>Qualifications:</strong> {selectedJob.qualifications || "Not specified"}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaTools className="mr-2 text-red-500" /> <strong>Skills:</strong> {selectedJob.skillsRequired?.join(', ') || "Not specified"}
            </p>

            <p className="text-gray-700 mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-pink-500" /> <strong>Application Deadline:</strong> {selectedJob.applicationDeadline || "Not specified"}
            </p>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <motion.button
                onClick={closeDetails}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Close
              </motion.button>

              <motion.button
                onClick={() => handleApply(selectedJob._id)}
                className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
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

