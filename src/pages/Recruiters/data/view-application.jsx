import { useState, useEffect } from "react";

const JobApplications = () => {
  const [applications, setApplications] = useState([]);

  // Mock data (Replace this with API fetch)
  useEffect(() => {
    const fetchApplications = async () => {
      const data = [
        {
          id: 1,
          applicant: "John Doe",
          jobTitle: "Frontend Developer",
          resume: "https://example.com/resume-john.pdf",
          status: "Pending",
        },
        {
          id: 2,
          applicant: "Jane Smith",
          jobTitle: "Backend Developer",
          resume: "https://example.com/resume-jane.pdf",
          status: "Accepted",
        },
        {
          id: 3,
          applicant: "Mike Johnson",
          jobTitle: "UI/UX Designer",
          resume: "https://example.com/resume-mike.pdf",
          status: "Rejected",
        },
      ];
      setApplications(data);
    };
    
    fetchApplications();
  }, []);

  // Status badge styles
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Applications</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border border-gray-200">Applicant</th>
              <th className="p-3 border border-gray-200">Job Title</th>
              <th className="p-3 border border-gray-200">Resume</th>
              <th className="p-3 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="text-gray-700 text-center">
                <td className="p-3 border border-gray-200">{app.applicant}</td>
                <td className="p-3 border border-gray-200">{app.jobTitle}</td>
                <td className="p-3 border border-gray-200">
                  <a href={app.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                </td>
                <td className="p-3 border border-gray-200">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(app.status)}`}>
                    {app.status}
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

export default JobApplications;
