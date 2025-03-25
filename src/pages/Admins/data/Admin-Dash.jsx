import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../axiosInstance";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ jobs: 0, applications: 0, users: 0, recruiters: 0 });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosInstance.get("/admin/dashboard-stats");
                setStats(response.data);
                setChartData([
                    { name: "Jan", jobs: Math.random() * 50, applications: Math.random() * 200 },
                    { name: "Feb", jobs: Math.random() * 50, applications: Math.random() * 200 },
                    { name: "Mar", jobs: Math.random() * 50, applications: Math.random() * 200 },
                    { name: "Apr", jobs: Math.random() * 50, applications: Math.random() * 200 },
                ]);
            } catch (err) {
                console.error("Error fetching dashboard stats:", err);
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <motion.div
            className="p-6 bg-gray-100 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            {/* Loading & Error Handling */}
            {loading ? (
                <p className="text-gray-500 text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <>
                    {/* Stats Overview */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {Object.entries(stats).map(([key, value]) => (
                            <motion.div
                                key={key}
                                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition transform hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-lg font-semibold capitalize">{key}</h3>
                                <p className="text-3xl font-bold text-blue-600">{value}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Chart Section */}
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold mb-4">Recruitment Trends</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="jobs" fill="#4F46E5" name="Jobs Posted" />
                                <Bar dataKey="applications" fill="#22C55E" name="Applications" />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default AdminDashboard;
