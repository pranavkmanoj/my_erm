import { useState, useEffect } from "react";

const FilterJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        location: "",
        salaryRange: "",
    });

    // Mock data (Replace with API fetch)
    useEffect(() => {
        const fetchJobListings = async () => {
            const data = [
                { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York", salary: 90000, status: "Active" },
                { id: 2, title: "Backend Engineer", company: "CodeHub", location: "San Francisco", salary: 110000, status: "Closed" },
                { id: 3, title: "UI/UX Designer", company: "DesignPro", location: "Remote", salary: 75000, status: "Active" },
                { id: 4, title: "Data Scientist", company: "AI Labs", location: "New York", salary: 120000, status: "Active" },
            ];
            setJobs(data);
            setFilteredJobs(data);
        };

        fetchJobListings();
    }, []);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Apply filters
    useEffect(() => {
        let updatedJobs = jobs;

        if (filters.status) {
            updatedJobs = updatedJobs.filter((job) => job.status === filters.status);
        }

        if (filters.location) {
            updatedJobs = updatedJobs.filter((job) => job.location.includes(filters.location));
        }

        if (filters.salaryRange) {
            const salaryLimit = parseInt(filters.salaryRange);
            updatedJobs = updatedJobs.filter((job) => job.salary <= salaryLimit);
        }

        setFilteredJobs(updatedJobs);
    }, [filters, jobs]);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Job Listings</h2>

            {/* Filters */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <select name="status" onChange={handleFilterChange} className="border p-2 rounded w-full">
                    <option value="">Filter by Status</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                </select>

                <input
                    type="text"
                    name="location"
                    placeholder="Filter by Location"
                    onChange={handleFilterChange}
                    className="border p-2 rounded w-full"
                />

                <select name="salaryRange" onChange={handleFilterChange} className="border p-2 rounded w-full">
                    <option value="">Filter by Salary</option>
                    <option value="80000">Up to $80,000</option>
                    <option value="100000">Up to $100,000</option>
                    <option value="120000">Up to $120,000</option>
                </select>
            </div>

            {/* Job Listings Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border border-gray-200">Job Title</th>
                            <th className="p-3 border border-gray-200">Company</th>
                            <th className="p-3 border border-gray-200">Location</th>
                            <th className="p-3 border border-gray-200">Salary</th>
                            <th className="p-3 border border-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <tr key={job.id} className="text-gray-700 text-center">
                                    <td className="p-3 border border-gray-200">{job.title}</td>
                                    <td className="p-3 border border-gray-200">{job.company}</td>
                                    <td className="p-3 border border-gray-200">{job.location}</td>
                                    <td className="p-3 border border-gray-200">${job.salary.toLocaleString()}</td>
                                    <td className="p-3 border border-gray-200">
                                        <span className={`px-3 py-1 text-sm rounded-full ${job.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    No jobs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FilterJobs;
