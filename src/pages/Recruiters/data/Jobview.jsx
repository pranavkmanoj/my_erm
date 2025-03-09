import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        setJobs(response.data);
        setStatus("success");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchJobs();
  }, []);

  if (status === "loading") return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-600">{job.jobTitle}</h3>
              <p className="text-gray-700"><strong>Company:</strong> {job.companyName}</p>
              <p className="text-gray-700"><strong>Location:</strong> {job.jobLocation}</p>
              <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
              <p className="text-gray-700"><strong>Type:</strong> {job.jobType}</p>
              <p className="text-gray-600 mt-2">{job.jobDescription}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Status
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobListing;
