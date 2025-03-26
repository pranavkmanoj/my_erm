import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import Swal from "sweetalert2"; // Import SweetAlert2

const ViewApplications = () => {
  const { user } = useUser();
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
        const response = await axiosInstance.get(`job-applications/recruiter/${user.id}`, {
          headers: { "Content-Type": "application/json" },
        });

        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  // Function to handle application status update with SweetAlert2
  const handleStatusChange = async (id, status) => {
    let alertMessage = "";

    switch (status) {
      case "Accepted":
        alertMessage = "Check the shortlisted candidates for the next process.";
        break;
      case "Pending":
        alertMessage = "Are you sure you want to set this application to Pending?";
        break;
      case "Rejected":
        alertMessage = "Are you sure you want to reject this candidate?";
        break;
      case "Reviewed":
        alertMessage = "Are you sure you have reviewed this application?";
        break;
      default:
        alertMessage = "Are you sure you want to change the status?";
    }

    // Show confirmation alert
    const result = await Swal.fire({
      title: "Confirm Status Change",
      text: alertMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Update it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.put(`job-applications/update-status/${id}`, { status });

        // Update the application status in state
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );

        // Show success alert
        Swal.fire({
          title: "Updated!",
          text: `Application status set to ${status}`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to update the status.",
          icon: "error",
        });
      }
    }
  };

  const deleteApplication = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`job-applications/delete-application/${id}`);
        setApplications((prev) => prev.filter((app) => app._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "The application has been deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the application.",
          icon: "error",
        });
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Reviewed":
        return "text-blue-600 bg-blue-100 px-2 py-1 rounded";
      case "Accepted":
        return "text-green-600 bg-green-100 px-2 py-1 rounded";
      case "Rejected":
        return "text-red-600 bg-red-100 px-2 py-1 rounded";
      default:
        return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded";
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
                      onChange={(e) => handleStatusChange(app._id, e.target.value)}
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
    </div>
  );
};

export default ViewApplications;
