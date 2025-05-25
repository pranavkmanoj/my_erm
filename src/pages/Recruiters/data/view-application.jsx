import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiTrash2, FiChevronDown, FiMail, FiPhone, FiAward, FiSearch, FiFilter } from "react-icons/fi";
import Swal from "sweetalert2";

// Helper function to get initials
const getInitials = (firstName, lastName) => {
  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

const ViewApplications = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  useEffect(() => {
    if (!user || !user.id) {
      setError("No recruiter ID found");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(`job-applications/recruiter/${user.id}`);
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    const result = await Swal.fire({
      title: "Update Status?",
      text: `Change this application to ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      background: "#1E293B",
      color: "#F8FAFC",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.put(`job-applications/update-status/${id}`, { status });
        setApplications(prev => prev.map(app => app._id === id ? { ...app, status } : app));

        Swal.fire({
          title: "Updated!",
          text: `Status changed to ${status}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1E293B",
          color: "#F8FAFC",
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to update status",
          icon: "error",
          background: "#1E293B",
          color: "#F8FAFC",
        });
      }
    }
  };

  const deleteApplication = async (id) => {
    const result = await Swal.fire({
      title: "Delete Application?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#1E293B",
      color: "#F8FAFC",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`job-applications/delete-application/${id}`);
        setApplications(prev => prev.filter(app => app._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Application removed",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
          background: "#1E293B",
          color: "#F8FAFC",
        });
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Failed to delete application",
          icon: "error",
          background: "#1E293B",
          color: "#F8FAFC",
        });
      }
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedApplications = [...applications].sort((a, b) => {
    const aValue = a[sortConfig.key] || '';
    const bValue = b[sortConfig.key] || '';
    
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredApplications = sortedApplications.filter(app => {
    const matchesSearch = `${app.firstName} ${app.lastName} ${app.email} ${app.skills?.join(" ")} ${app.jobTitle} ${app.companyName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status === "Accepted" ? "bg-green-100 text-green-800" :
      status === "Rejected" ? "bg-red-100 text-red-800" :
        status === "Reviewed" ? "bg-blue-100 text-blue-800" :
          "bg-yellow-100 text-yellow-800"
      }`}>
      {status || "Pending"}
    </span>
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-500/20 rounded-full mb-4"></div>
        <p className="text-gray-500">Loading applications...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p className="text-red-600 font-medium">❌ {error}</p>
    </div>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Candidate Applications</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all job applications including their details and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="flex space-x-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-white pl-3 pr-8 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 cursor-pointer"
                      onClick={() => requestSort("firstName")}
                    >
                      <div className="flex items-center">
                        Candidate
                        {sortConfig.key === "firstName" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("jobTitle")}
                    >
                      <div className="flex items-center">
                        Job Title
                        {sortConfig.key === "jobTitle" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("companyName")}
                    >
                      <div className="flex items-center">
                        Company
                        {sortConfig.key === "companyName" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === "email" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("skills")}
                    >
                      Skills
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("createdAt")}
                    >
                      <div className="flex items-center">
                        Applied
                        {sortConfig.key === "createdAt" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                      onClick={() => requestSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortConfig.key === "status" && (
                          <span className="ml-1">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <motion.tr
                        key={app._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
                        className="transition-colors duration-150"
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            {app.profilePic ? (
                              <img 
                                src={app.profilePic} 
                                alt={`${app.firstName} ${app.lastName}`}
                                className="h-10 w-10 rounded-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                                {getInitials(app.firstName, app.lastName)}
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{app.firstName} {app.lastName}</div>
                              <div className="text-gray-500 flex items-center">
                                <FiPhone className="mr-1 h-3 w-3" />
                                {app.phone || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {app.jobTitle}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {app.companyName}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <FiMail className="mr-1 h-3 w-3 text-gray-400" />
                            <span className="truncate max-w-[180px]">{app.email}</span>
                          </div>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {app.skills?.slice(0, 3).map(skill => (
                              <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {skill}
                              </span>
                            ))}
                            {app.skills?.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                                +{app.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <div className="flex items-center space-x-2">
                            <select
                              value={app.status || "Pending"}
                              onChange={(e) => handleStatusChange(app._id, e.target.value)}
                              className="rounded-md border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewed">Reviewed</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                            <button
                              onClick={() => setSelectedApplication(app)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </button>
                            <button
                              onClick={() => deleteApplication(app._id)}
                              className="text-red-600 hover:text-red-900 ml-2"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-sm text-gray-500">
                        <div className="flex flex-col items-center justify-center">
                          <FiSearch className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-lg font-medium text-gray-900">No candidates found</p>
                          <p className="mt-1">
                            {searchTerm || statusFilter !== "All"
                              ? "Try adjusting your search or filter criteria"
                              : "You haven't received any applications yet"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setSelectedApplication(null)}
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="flex items-start">
                  {selectedApplication.profilePic ? (
                    <img 
                      src={selectedApplication.profilePic}
                      alt={`${selectedApplication.firstName} ${selectedApplication.lastName}`}
                      className="h-16 w-16 rounded-full object-cover mr-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-16 w-16 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-medium mr-4">
                      {getInitials(selectedApplication.firstName, selectedApplication.lastName)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedApplication.firstName} {selectedApplication.lastName}
                    </h3>
                    <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiMail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {selectedApplication.email}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiPhone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {selectedApplication.phone || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Job Title</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedApplication.jobTitle}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Company</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedApplication.companyName}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Application Status</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <StatusBadge status={selectedApplication.status} />
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Applied On</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {new Date(selectedApplication.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Skills</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div className="flex flex-wrap gap-2">
                          {selectedApplication.skills?.map(skill => (
                            <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {skill}
                            </span>
                          )) || "No skills listed"}
                        </div>
                      </dd>
                    </div>
                    {selectedApplication.resume && (
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Resume</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <a
                            href={selectedApplication.resume.replace("/cv/", "/resumes/")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                          >
                            View resume <FiExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </dd>
                      </div>
                    )}
                    {selectedApplication.coverLetter && (
                      <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <div className="prose prose-sm max-w-none">
                            <p className="whitespace-pre-line">{selectedApplication.coverLetter}</p>
                          </div>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setSelectedApplication(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewApplications;