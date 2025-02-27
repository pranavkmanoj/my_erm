import { useState, useEffect } from "react";
import API from "../../../../backend/axiosInstance";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch Jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await API.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Function to update job status
  const updateJobStatus = async (jobId, newStatus) => {
    try {
      await API.put(`/jobs/${jobId}`, { status: newStatus }); // Using axios instance

      // Update state to reflect changes instantly
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Job Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold">{job.jobTitle}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p>{job.jobLocation}</p>
            <p className="text-blue-600 font-semibold">Salary: {job.salary}</p>
            <p className="text-gray-700">{job.jobType}</p>
            <p className={`text-sm font-semibold ${job.status === "Active" ? "text-blue-500" : "text-red-500"}`}>
              {job.status}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateJobStatus(job._id, "Active")}
                className={`px-4 py-2 rounded ${job.status === "Active" ? "bg-gray-400" : "bg-green-500 text-white"}`}
                disabled={job.status === "Active"}
              >
                Active
              </button>
              <button
                onClick={() => updateJobStatus(job._id, "Closed")}
                className={`px-4 py-2 rounded ${job.status === "Closed" ? "bg-gray-400" : "bg-red-500 text-white"}`}
                disabled={job.status === "Closed"}
              >
                Closed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobs;
