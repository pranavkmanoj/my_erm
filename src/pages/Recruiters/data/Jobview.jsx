import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Briefcase, CheckCircle, XCircle } from "lucide-react";

const Jobview = () => {
  const { user } = useUser();
  const recruiterId = user?.role === "recruiter" ? user.recruiterId : null;

  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (!recruiterId) {
      setStatus("failed");
      setError("Recruiter ID not found. Please log in again.");
      return;
    }

    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`/jobs/recruiter/${recruiterId}`);
        setJobs(response.data);
        setStatus("success");
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch jobs.");
        setStatus("failed");
      }
    };

    fetchJobs();
  }, [recruiterId]);

  // Count active and closed jobs
  const activeJobsCount = jobs.filter(job => job.status === "Active").length;
  const closedJobsCount = jobs.filter(job => job.status === "Closed").length;

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
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }

      const response = await axiosInstance.put(
        `/jobs/update-status/${selectedJob._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === selectedJob._id ? { ...job, status: newStatus } : job
          )
        );

        toast.success("Status successfully updated!");
        closeModal();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  if (status === "loading") return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Job Status Overview</h2>

      {/* Job Count Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Active Jobs */}
        <div className="flex items-center justify-between bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div>
            <h3 className="text-xl font-semibold">Active Jobs</h3>
            <p className="text-3xl font-bold">{activeJobsCount}</p>
          </div>
          <CheckCircle size={48} className="opacity-80" />
        </div>

        {/* Closed Jobs */}
        <div className="flex items-center justify-between bg-gradient-to-r from-red-400 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <div>
            <h3 className="text-xl font-semibold">Closed Jobs</h3>
            <p className="text-3xl font-bold">{closedJobsCount}</p>
          </div>
          <XCircle size={48} className="opacity-80" />
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

              <div className="mt-4 flex space-x-3">
                {/* Active Button */}
                <button
                  onClick={() => openModal(job, "Active")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded-md transition duration-300 
      ${job.status === "Active" ? "bg-green-600 cursor-not-allowed opacity-70" : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 shadow-lg"}`}
                  disabled={job.status === "Active"}
                >
                  <CheckCircle size={20} />
                  Active
                </button>

                {/* Closed Button */}
                <button
                  onClick={() => openModal(job, "Closed")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white font-semibold rounded-md transition duration-300 
      ${job.status === "Closed" ? "bg-red-600 cursor-not-allowed opacity-70" : "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 shadow-lg"}`}
                  disabled={job.status === "Closed"}
                >
                  <XCircle size={20} />
                  Closed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Change Job Status</h3>
            <p className="text-gray-700">
              Are you sure you want to change the status of <strong>{selectedJob.jobTitle}</strong> to{" "}
              <strong>{newStatus}</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 text-white rounded-md ${newStatus === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Jobview;
