import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ jobs: 0, applications: 0, users: 0, recruiters: 0 });
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Fetch dashboard data (Replace with real API calls)
        setStats({ jobs: 120, applications: 450, users: 300, recruiters: 50 });
        setChartData([
            { name: "Jan", jobs: 20, applications: 80 },
            { name: "Feb", jobs: 30, applications: 100 },
            { name: "Mar", jobs: 25, applications: 90 },
            { name: "Apr", jobs: 35, applications: 120 },
        ]);
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg shadow-md text-center">
                        <h3 className="text-lg font-semibold capitalize">{key}</h3>
                        <p className="text-2xl font-bold text-blue-600">{value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
            </div>
        </div>
    );
};

export default AdminDashboard;