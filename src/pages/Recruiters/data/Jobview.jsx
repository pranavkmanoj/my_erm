import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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

  const activeJobsCount = jobs.filter((job) => job.status === "Active").length;
  const closedJobsCount = jobs.filter((job) => job.status === "Closed").length;

  const openModal = (job, status) => {
    setSelectedJob(job);
    setNewStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    setNewStatus("");
  };

const confirmStatusChange = async () => {
  if (!selectedJob) return;

  try {
    // Optimistically update UI
    const updatedJobs = jobs.map((job) =>
      job._id === selectedJob._id ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);

    // Send PUT request instead of GET
    await axiosInstance.put(`/jobs/${selectedJob._id}`, { status: newStatus });

    toast.success("Status successfully updated!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    closeModal();
  } catch (err) {
    console.error("Failed to update job status:", err);
    toast.error("Failed to update status. Please try again.");
  }
};

  if (status === "loading") return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Job Status</h2>

      {/* Status Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Active Jobs</h3>
          <p className="text-2xl font-bold text-blue-600">{activeJobsCount}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-gray-700">Closed Jobs</h3>
          <p className="text-2xl font-bold text-blue-600">{closedJobsCount}</p>
        </div>
      </div>

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
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span className={`font-semibold ${job.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                  {job.status}
                </span>
              </p>

              {/* Buttons for updating status */}
              <div className="mt-4 flex">
                <button
                  onClick={() => openModal(job, "Active")}
                  className={`flex-1 px-4 py-2 text-white rounded-l-md ${job.status === "Active" ? "bg-green-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                >
                  Active
                </button>
                <button
                  onClick={() => openModal(job, "Closed")}
                  className={`flex-1 px-4 py-2 text-white rounded-r-md ${job.status === "Closed" ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                  Closed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Status Change Confirmation */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Change Job Status</h3>
            <p className="text-gray-700">
              Are you sure you want to change the status of{" "}
              <strong>{selectedJob.jobTitle}</strong> to{" "}
              <strong>{newStatus}</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 text-white rounded-md ${newStatus === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                  }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default JobListing;
