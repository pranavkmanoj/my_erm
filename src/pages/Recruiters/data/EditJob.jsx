import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import { Pencil, Trash2, Briefcase, X, Info } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Jobview = () => {
    const { user } = useUser();
    const recruiterId = user?.role === "recruiter" ? user.recruiterId : null;
    const token = user?.token;

    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState("loading");
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobData, setJobData] = useState({
        jobTitle: "",
        jobDescription: "",
        salary: "",
        jobType: "",
        jobLocation: "",
        skillsRequired: "",
        experienceRequired: "",
        qualifications: "",
        applicationDeadline: "",
        workMode: "",
    });

    useEffect(() => {
        if (!recruiterId) {
            setStatus("failed");
            setError("Recruiter ID not found. Please log in again.");
            return;
        }

        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get(`/jobs/recruiter/${recruiterId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setJobs(response.data);
                setStatus("success");
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch jobs.");
                setStatus("failed");
            }
        };

        fetchJobs();
    }, [recruiterId, token]);

    const deleteJob = async (jobId) => {
        try {
            await axiosInstance.delete(`/api/jobs/${jobId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setJobs(jobs.filter((job) => job._id !== jobId));
            toast.success("Job deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete job.");
        }
    };

    const viewJobDetails = (job) => {
        setSelectedJob(job);
        setJobData({
            jobTitle: job.jobTitle,
            jobDescription: job.jobDescription,
            salary: job.salary,
            jobType: job.jobType,
            jobLocation: job.jobLocation,
            skillsRequired: job.skillsRequired.join(", "),
            experienceRequired: job.experienceRequired,
            qualifications: job.qualifications,
            applicationDeadline: job.applicationDeadline.split("T")[0],
            workMode: job.workMode,
        });
    };

    const handleEditChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const saveJob = async () => {
        try {
            const response = await axiosInstance.put(`/jobs/${selectedJob._id}`,
                {
                    ...jobData,
                    skillsRequired: jobData.skillsRequired.split(",").map((skill) => skill.trim()),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );


            if (response.status === 200) {
                setJobs(jobs.map((job) => (job._id === selectedJob._id ? response.data : job))); // Update the local job list
                toast.success("Job updated successfully!");
                setSelectedJob(null); // Close the edit form
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update job.");
        }
    };

    if (status === "loading") return <p className="text-center text-gray-500">Loading jobs...</p>;
    if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Job Listings</h2>

            {jobs.length === 0 ? (
                <p className="text-center text-gray-500">No jobs available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job._id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200 hover:shadow-xl transition duration-300">
                            <div className="flex items-center gap-3 mb-3">
                                <Briefcase size={40} className="text-blue-600" />
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                                    <p className="text-gray-600">{job.companyName} - {job.jobLocation}</p>
                                </div>
                            </div>

                            <p className="text-gray-500"><strong>Salary:</strong> {job.salary}</p>
                            <p className="text-gray-500"><strong>Type:</strong> {job.jobType}</p>

                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => viewJobDetails(job)}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                                >
                                    <Info size={18} />
                                    Details
                                </button>

                                <button
                                    onClick={() => deleteJob(job._id)}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-md"
                                >
                                    <Trash2 size={18} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Edit Job Details</h2>
                            <button onClick={() => setSelectedJob(null)} className="text-gray-500 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Structured Two-Column Layout */}
                        <div className="grid grid-cols-2 gap-6">
                            {Object.keys(jobData).map((key) => (
                                <div key={key} className="flex flex-col">
                                    <label className="block text-gray-700 font-semibold mb-1 capitalize">
                                        {key.replace(/([A-Z])/g, " $1")}
                                    </label>
                                    {key === "jobDescription" ? (
                                        <textarea
                                            name={key}
                                            value={jobData[key]}
                                            onChange={handleEditChange}
                                            className="w-full border p-2 rounded resize-none h-24"
                                        />
                                    ) : key === "applicationDeadline" ? (
                                        <input
                                            type="date"
                                            name={key}
                                            value={jobData[key]}
                                            onChange={handleEditChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={key}
                                            value={jobData[key]}
                                            onChange={handleEditChange}
                                            className="w-full border p-2 rounded"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Button Area */}
                        <div className="flex justify-end mt-6">
                            <button onClick={saveJob} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
                                Save Changes
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
