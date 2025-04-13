import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import { Pencil, Trash2, Briefcase, X, Info, Clock, MapPin, DollarSign, Layers, User, Award, Globe, Calendar } from "lucide-react";
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
    const [viewMode, setViewMode] = useState(null); // 'details' or 'edit'
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
            await axiosInstance.delete(`/jobs/${jobId}`, {
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
        setViewMode("details");
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
            companyName: job.companyName,
        });
    };

    const openEditForm = (job) => {
        setSelectedJob(job);
        setViewMode("edit");
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
            companyName: job.companyName,
        });
    };

    const handleEditChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const saveJob = async () => {
        try {
            const response = await axiosInstance.put(
                `/jobs/${selectedJob._id}`,
                {
                    ...jobData,
                    skillsRequired: jobData.skillsRequired.split(",").map((skill) => skill.trim()),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                setJobs(jobs.map((job) => (job._id === selectedJob._id ? response.data : job)));
                toast.success("Job updated successfully!");
                setViewMode(null);
                setSelectedJob(null);
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

                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                                <DollarSign size={16} />
                                <span>Salary: {job.salary}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock size={16} />
                                <span>Type: {job.jobType}</span>
                            </div>

                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => viewJobDetails(job)}
                                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition"
                                >
                                    <Info size={18} />
                                    Details
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditForm(job)}
                                        className="flex items-center gap-2 px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-md transition"
                                    >
                                        <Pencil size={18} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteJob(job._id)}
                                        className="flex items-center gap-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md transition"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Job Details Modal */}
            {selectedJob && viewMode === "details" && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedJob.jobTitle}</h2>
                            <button 
                                onClick={() => setSelectedJob(null)}
                                className="text-gray-500 hover:text-red-500 transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start gap-6 mb-8">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <Briefcase size={40} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold">{selectedJob.companyName}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                                        <MapPin size={16} />
                                        <span>{selectedJob.jobLocation}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg mb-3 text-gray-700">Job Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <DollarSign size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Salary</p>
                                                <p className="font-medium">{selectedJob.salary}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Job Type</p>
                                                <p className="font-medium">{selectedJob.jobType}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Globe size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Work Mode</p>
                                                <p className="font-medium">{selectedJob.workMode}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Calendar size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Application Deadline</p>
                                                <p className="font-medium">
                                                    {new Date(selectedJob.applicationDeadline).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg mb-3 text-gray-700">Requirements</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <User size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Experience</p>
                                                <p className="font-medium">{selectedJob.experienceRequired}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Award size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Qualifications</p>
                                                <p className="font-medium">{selectedJob.qualifications}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Layers size={18} className="text-gray-500 mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500">Skills Required</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {selectedJob.skillsRequired.map((skill, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-semibold text-lg mb-3 text-gray-700">Job Description</h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="whitespace-pre-line">{selectedJob.jobDescription}</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    onClick={() => openEditForm(selectedJob)}
                                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                    Edit Job
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Job Modal */}
            {selectedJob && viewMode === "edit" && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Edit Job Details</h2>
                            <button 
                                onClick={() => setSelectedJob(null)} 
                                className="text-gray-500 hover:text-red-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            className="w-full border p-2 rounded resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : key === "applicationDeadline" ? (
                                        <input
                                            type="date"
                                            name={key}
                                            value={jobData[key]}
                                            onChange={handleEditChange}
                                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={key}
                                            value={jobData[key]}
                                            onChange={handleEditChange}
                                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveJob}
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Jobview;