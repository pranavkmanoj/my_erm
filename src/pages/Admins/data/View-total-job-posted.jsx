import { useState, useEffect } from "react";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  // Mock data (Replace with API fetch)
  useEffect(() => {
    const fetchJobListings = async () => {
      const data = [
        {
          id: 1,
          title: "Frontend Developer",
          company: "TechCorp Ltd.",
          location: "New York, USA",
          salary: "$80,000 - $100,000",
          status: "Active",
        },
        {
          id: 2,
          title: "Backend Engineer",
          company: "Code Innovations",
          location: "San Francisco, USA",
          salary: "$90,000 - $110,000",
          status: "Closed",
        },
        {
          id: 3,
          title: "UI/UX Designer",
          company: "DesignHub",
          location: "Remote",
          salary: "$70,000 - $90,000",
          status: "Active",
        },
      ];
      setJobs(data);
    };

    fetchJobListings();
  }, []);

  // Status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-red-100 text-red-700";
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
              <th className="p-3 border border-gray-200">Company</th>
              <th className="p-3 border border-gray-200">Location</th>
              <th className="p-3 border border-gray-200">Salary</th>
              <th className="p-3 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="text-gray-700 text-center">
                <td className="p-3 border border-gray-200">{job.title}</td>
                <td className="p-3 border border-gray-200">{job.company}</td>
                <td className="p-3 border border-gray-200">{job.location}</td>
                <td className="p-3 border border-gray-200">{job.salary}</td>
                <td className="p-3 border border-gray-200">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(job.status)}`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListings;
