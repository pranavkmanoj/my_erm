import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [statuses, setStatuses] = useState(["Status", "Active", "Closed", "Pending"]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedSalary, setSelectedSalary] = useState("");

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobListings();
  }, []);

  useEffect(() => {
    let updatedJobs = jobs;

    if (selectedLocation) {
      updatedJobs = updatedJobs.filter(job => job.jobLocation.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    if (selectedStatus !== "Status") {
      updatedJobs = updatedJobs.filter(job => job.status === selectedStatus);
    }

    if (selectedSalary) {
      updatedJobs = updatedJobs.filter(job => job.salary.toString().includes(selectedSalary));
    }

    setFilteredJobs(updatedJobs);
  }, [selectedLocation, selectedStatus, selectedSalary, jobs]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const downloadPDF = () => {
    if (filteredJobs.length === 0) {
      alert("No jobs available to download.");
      return;
    }

    const doc = new jsPDF();
    doc.text("Job Listings", 14, 15);

    const tableColumn = ["Job Title", "Location", "Salary", "Job Type", "Status"];
    const tableRows = [];

    filteredJobs.forEach((job) => {
      const jobData = [job.jobTitle, job.jobLocation, job.salary, job.jobType, job.status];
      tableRows.push(jobData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("job_listings.pdf");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-12 bg-white shadow-xl rounded-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-blue-500" /> Job Listings Management
        </h2>
        <motion.button
          onClick={downloadPDF}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <FaDownload /> Download PDF
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mb-8"
      >
        <div className="relative w-full md:w-1/3">
          <FaMapMarkerAlt className="absolute left-3 top-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by location"
            className="p-4 pl-10 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          />
        </div>

        <div className="relative w-full md:w-1/3">
          <FaBriefcase className="absolute left-3 top-4 text-gray-500" />
          <select
            className="p-4 pl-10 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full md:w-1/3">
          <FaMoneyBillWave className="absolute left-3 top-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by salary"
            className="p-4 pl-10 border rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedSalary}
            onChange={(e) => setSelectedSalary(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="overflow-x-auto"
      >
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-500 text-white text-lg">
              <th className="p-4 border border-gray-300">Job Title</th>
              <th className="p-4 border border-gray-300">Location</th>
              <th className="p-4 border border-gray-300">Salary</th>
              <th className="p-4 border border-gray-300">Job Type</th>
              <th className="p-4 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.tr
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700 text-center hover:bg-gray-100 transition-all"
                >
                  <td className="p-4 border border-gray-300">{job.jobTitle}</td>
                  <td className="p-4 border border-gray-300">{job.jobLocation}</td>
                  <td className="p-4 border border-gray-300">{job.salary}</td>
                  <td className="p-4 border border-gray-300">{job.jobType}</td>
                  <td className="p-4 border border-gray-300">
                    <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No job listings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default JobListings;
