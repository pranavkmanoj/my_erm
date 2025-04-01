import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";
import Navbar from "../../Users/Layout/User-Navbar";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiMapPin,
  FiAward,
  FiDownload,
  FiCalendar,
  FiSearch
} from "react-icons/fi";
import background from '../images/background.jpg';

const statusConfig = {
  "Pending": { color: "bg-amber-100 text-amber-800", icon: <FiClock className="text-amber-500" /> },
  "Accepted": { color: "bg-emerald-100 text-emerald-800", icon: <FiCheckCircle className="text-emerald-500" /> },
  "Rejected": { color: "bg-rose-100 text-rose-800", icon: <FiXCircle className="text-rose-500" /> }
};

const ViewApplications = () => {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !user.id) {
        setError("Please log in to view applications");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get(`/job-applications`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
    const interval = setInterval(fetchApplications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className="min-h-screen bg-gray-50 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      <div className="pt-20 pb-8"> {/* Added pt-20 to account for navbar height */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Applications Dashboard</h1>
                <p className="text-gray-600 mt-1">Track and manage your job applications</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative flex-1 min-w-[200px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Applications</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{statusCounts.total || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <FiBriefcase className="text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <p className="text-2xl font-semibold text-amber-600 mt-1">{statusCounts.Pending || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
                    <FiClock className="text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Accepted</p>
                    <p className="text-2xl font-semibold text-emerald-600 mt-1">{statusCounts.Accepted || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
                    <FiCheckCircle className="text-xl" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rejected</p>
                    <p className="text-2xl font-semibold text-rose-600 mt-1">{statusCounts.Rejected || 0}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
                    <FiXCircle className="text-xl" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-300"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiSearch className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                {searchTerm || statusFilter !== "All" ? "No matching applications" : "No applications yet"}
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || statusFilter !== "All"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by applying to your dream jobs!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredApplications.map((app) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">{app.jobTitle || "Untitled Position"}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[app.status]?.color}`}>
                            {statusConfig[app.status]?.icon}
                            <span className="ml-1">{app.status || "Pending"}</span>
                          </span>
                        </div>
                        <p className="text-gray-600">{app.companyName || "Unknown Company"}</p>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <FiCalendar className="mr-1.5" />
                        {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : "N/A"}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                          <p className="mt-1 flex items-center">
                            <FiMapPin className="mr-1.5 text-gray-400" />
                            {app.city || "Remote"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</p>
                          <p className="mt-1 flex items-center">
                            <FiAward className="mr-1.5 text-gray-400" />
                            {app.experience || "0"} years
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {app.skills?.slice(0, 4).map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {skill}
                            </span>
                          ))}
                          {app.skills?.length > 4 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{app.skills.length - 4} more
                            </span>
                          )}
                          {!app.skills && <span className="text-gray-400 text-sm">Not specified</span>}
                        </div>
                      </div>

                      {app.resume && (
                        <div className="mt-6">
                          <a
                            href={app.resume.replace("/cv/", "/resumes/")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <FiDownload className="mr-1.5" />
                            View Resume
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;