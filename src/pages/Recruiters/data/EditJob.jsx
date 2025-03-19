import { useState, useEffect } from "react";
import axios from "axios";

const EditJob = () => {
    const [jobs, setJobs] = useState([]);
    const [editJob, setEditJob] = useState(null);
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        jobType: "",
        salary: "",
        status: "Active",
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/jobs");
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    };

    const handleEditClick = (job) => {
        setEditJob(job._id);
        setFormData({ ...job });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/jobs/${editJob}`, formData);
            fetchJobs();
            setEditJob(null);
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Jobs</h2>
            <ul className="space-y-4">
                {jobs.map((job) => (
                    <li key={job._id} className="border p-4 rounded shadow">
                        {editJob === job._id ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Company Name"
                                />
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Job Title"
                                />
                                <input
                                    type="text"
                                    name="jobLocation"
                                    value={formData.jobLocation}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Location"
                                />
                                <input
                                    type="text"
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Job Type"
                                />
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                    placeholder="Salary"
                                />
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="border p-2 w-full rounded"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Closed">Closed</option>
                                </select>
                                <button
                                    onClick={handleUpdate}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditJob(null)}
                                    className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-bold">{job.jobTitle}</h3>
                                <p>{job.companyName}</p>
                                <p>{job.jobLocation}</p>
                                <p>{job.jobType}</p>
                                <p>${job.salary}</p>
                                <p className={`font-bold ${job.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                                    {job.status}
                                </p>
                                <button
                                    onClick={() => handleEditClick(job)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EditJob;
