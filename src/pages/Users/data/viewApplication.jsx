import { useEffect, useState } from "react";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";
import Navbar from "../../Users/Layout/User-Navbar";
import backgroundImage from "../images/background.jpg";
import { motion } from "framer-motion";

const ViewApplications = () => {
    const { user } = useUser();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            if (!user || !user.id) {
                setError("User is not authenticated. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(`/job-applications`, {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setApplications(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();

        // Poll for status updates every 30 seconds
        const interval = setInterval(fetchApplications, 30000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [user]);

    return (
        <div className="min-h-screen bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 mt-10 w-11/12 md:w-3/4 lg:w-2/3"
            >
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">My Job Applications</h2>

                {loading ? (
                    <motion.p className="text-gray-600 text-center animate-pulse" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Loading applications...
                    </motion.p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : applications.length === 0 ? (
                    <p className="text-gray-600 text-center">No applications found.</p>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white shadow-md rounded-lg text-sm overflow-hidden">
                            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                <tr>
                                    <th className="p-3 text-left">Job Title</th>
                                    <th className="p-3 text-left">Company</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">City</th>
                                    <th className="p-3 text-left">Experience</th>
                                    <th className="p-3 text-left">Skills</th>
                                    <th className="p-3 text-left">Availability</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Applied Date</th>
                                    <th className="p-3 text-left">Resume</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <motion.tr key={app._id} whileHover={{ scale: 1.02 }} className="border-b hover:bg-gray-100 transition-all">
                                        <td className="p-3">{app.jobTitle || "N/A"}</td>
                                        <td className="p-3">{app.company || "N/A"}</td>
                                        <td className="p-3">{app.fullName}</td>
                                        <td className="p-3">{app.phone || "N/A"}</td>
                                        <td className="p-3">{app.email || "N/A"}</td>
                                        <td className="p-3">{app.city || "N/A"}</td>
                                        <td className="p-3">{app.experience || "N/A"} years</td>
                                        <td className="p-3">{app.skills?.join(", ") || "N/A"}</td>
                                        <td className="p-3">{app.availability || "N/A"}</td>
                                        <td className={`p-3 font-semibold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                                            {app.status || "Pending"}
                                        </td>
                                        <td className="p-3">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "N/A"}</td>
                                        <td className="p-3">
                                            {app.resumeLink ? (
                                                <motion.a
                                                    href={app.resumeLink.replace("/image/upload/", "/raw/upload/")}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline hover:text-indigo-700 transition-all"
                                                    whileHover={{ scale: 1.1 }}
                                                >
                                                    View Resume
                                                </motion.a>
                                            ) : (
                                                <span className="text-gray-500">No Resume</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default ViewApplications;
