import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import Navbar from "../Layout/User-Navbar";
import { useUser } from "../../../context/AuthContext";
import { CalendarDays, Clock, Briefcase, MapPin, ChevronRight } from "lucide-react";
import background from "../images/background.jpg";

const ViewInterviews = () => {
    const { user } = useUser();
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInterviews = async () => {
            if (!user || !user.id || !user.token) {
                console.log("No user found");
                setLoading(false);
                return;
            }

            try {
                const res = await axiosInstance.get(`/interview/user/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                setInterviews(res.data);
            } catch (error) {
                console.error("Error fetching interviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInterviews();
    }, [user]);

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString([], {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <Navbar />

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 pt-24 px-4">
                    <div className="mb-10 text-center">
                        <p className="text-lg text-gray-600">
                            {interviews.length > 0
                                ? `You have ${interviews.length} upcoming interview${interviews.length > 1 ? 's' : ''}`
                                : "No upcoming interviews"}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-300"></div>
                        </div>
                    ) : interviews.length > 0 ? (
                        <div className="space-y-6">
                            {interviews.map((interview) => (
                                <div key={interview._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <div className="p-3 bg-blue-100 rounded-lg">
                                                        <Briefcase className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900">
                                                            {interview.jobId?.jobTitle || "Unknown Position"}
                                                        </h3>
                                                        <p className="text-gray-500 flex items-center">
                                                            <MapPin className="h-4 w-4 mr-1" />
                                                            {interview.jobId?.location || "Location not specified"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                    <div className="flex items-center text-gray-700">
                                                        <CalendarDays className="h-5 w-5 mr-2 text-gray-400" />
                                                        <span>{formatDate(interview.interviewDate)}</span>
                                                    </div>
                                                    <div className="flex items-center text-gray-700">
                                                        <Clock className="h-5 w-5 mr-2 text-gray-400" />
                                                        <span>{formatTime(interview.interviewDate)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center">
                                                <span className={`px-4 py-2 rounded-full text-sm font-medium 
                                                    ${interview.action === "Interview"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : "bg-yellow-100 text-yellow-800"}`}>
                                                    {interview.action || "Pending"}
                                                </span>
                                                <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <div className="mx-auto max-w-md">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No interviews scheduled</h3>
                                <p className="mt-1 text-gray-500">You don't have any upcoming interviews at this time.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewInterviews;
