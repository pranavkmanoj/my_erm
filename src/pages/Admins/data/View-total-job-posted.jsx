import { useState, useEffect } from "react";
import axiosInstance from "../../../../backend/axiosInstance";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const response = await axiosInstance.get("/jobs"); // Fetch jobs from API
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobListings();
  }, []);

  // Function to return status badge classes
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Listings Management</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border border-gray-200">Job Title</th>
              <th className="p-3 border border-gray-200">Location</th>
              <th className="p-3 border border-gray-200">Salary</th>
              <th className="p-3 border border-gray-200">Job Type</th>
              <th className="p-3 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id} className="text-gray-700 text-center">
                  <td className="p-3 border border-gray-200">{job.jobTitle}</td>
                  <td className="p-3 border border-gray-200">{job.jobLocation}</td>
                  <td className="p-3 border border-gray-200">{job.salary}</td>
                  <td className="p-3 border border-gray-200">{job.jobType}</td>
                  <td className="p-3 border border-gray-200">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  No job listings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListings;
