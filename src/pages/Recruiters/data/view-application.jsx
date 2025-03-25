import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext"; // Import AuthContext

const ViewApplications = () => {
  const { user } = useUser(); // Get logged-in user (recruiter)
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.id) {
      setError("No recruiter ID found");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        console.log("Fetching applications for recruiter:", user.id);

        const response = await axiosInstance.get(`job-applications/recruiter/${user.id}`, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Applications fetched:", response.data);
        setApplications(response.data);
      } catch (err) {
        console.error("❌ Error fetching applications:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  // Function to update application status
  const updateApplicationStatus = async (id, status) => {
    try {
      const response = await axiosInstance.put(`job-applications/update-status/${id}`, { status });
      console.log(`✅ Application updated to ${status}:`, response.data);

      // Update the application status in state
      setApplications(applications.map(app => (app._id === id ? { ...app, status } : app)));
    } catch (err) {
      console.error("❌ Error updating status:", err.response?.data || err);
    }
  };

  // Function to delete an application
  const deleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await axiosInstance.delete(`job-applications/delete-application/${id}`);
      console.log("✅ Application deleted successfully");

      // Remove the application from state
      setApplications(applications.filter(app => app._id !== id));
    } catch (err) {
      console.error("❌ Error deleting application:", err.response?.data || err);
    }
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed":
        return "text-blue-600 bg-blue-100 px-2 py-1 rounded";
      case "Accepted":
        return "text-green-600 bg-green-100 px-2 py-1 rounded";
      case "Rejected":
        return "text-red-600 bg-red-100 px-2 py-1 rounded";
      default:
        return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded"; // Pending
    }
  };

  if (loading) return <p className="text-center text-gray-700">Loading applications...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📄 Job Applications</h2>
      {applications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
                <th className="py-3 px-4 text-left">Resume</th>
                <th className="py-3 px-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-100 transition">
                  <td className="py-3 px-4">{app.firstName} {app.lastName}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.phone || "N/A"}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${getStatusColor(app.status || "Pending")}`}>
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <select
                      className="border px-2 py-1 rounded text-gray-700"
                      value={app.status || "Pending"}
                      onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Details
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {app.resume ? (
                      <a
                        href={app.resume.replace("/image/upload/", "/raw/upload/")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        📄 View Resume
                      </a>
                    ) : (
                      <span className="text-gray-500">No Resume</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteApplication(app._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-4">No applications found.</p>
      )}

      {/* Modal for Application Details */}
      {selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[70vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Applicant Details</h3>
            <p><strong>Name:</strong> {selectedApplication.firstName} {selectedApplication.lastName}</p>
            <p><strong>Email:</strong> {selectedApplication.email}</p>
            <p><strong>Phone:</strong> {selectedApplication.phone || "N/A"}</p>
            <p><strong>Skills:</strong> {selectedApplication.skills?.join(", ") || "N/A"}</p>
            <button
              onClick={() => setSelectedApplication(null)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;
