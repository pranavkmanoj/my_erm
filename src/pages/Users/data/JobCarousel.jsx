import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobCarousel = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoRotate, setAutoRotate] = useState(true);
    const [rotationInterval] = useState(5000); // 5 seconds

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/jobs");
                const activeJobs = response.data.filter(job => job.status === "Active");
                setJobs(activeJobs);
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === jobs.length - 1 ? 0 : prev + 1));
    }, [jobs.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? jobs.length - 1 : prev - 1));
    };

    useEffect(() => {
        if (jobs.length > 1 && autoRotate) {
            const timer = setInterval(nextSlide, rotationInterval);
            return () => clearInterval(timer);
        }
    }, [jobs.length, autoRotate, nextSlide, rotationInterval]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleApplyClick = (jobId) => {
        if (!user) {
            toast.info("Please login to apply for this job", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/ulogin", { state: { from: `/apply-jobs?jobId=${jobId}` } });
            return;
        }
        navigate(`/apply-jobs?jobId=${jobId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fb5607]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                {error}
            </div>
        );
    }

    if (jobs.length === 0) {
        return (
            <div className="text-center py-8 text-[#f7f7f7]">
                No active job listings available at the moment.
            </div>
        );
    }

    return (
        <div className="relative w-full px-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
            onMouseEnter={() => setAutoRotate(false)}
            onMouseLeave={() => setAutoRotate(true)}
        >
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {jobs.map((job) => (
                        <div key={job._id} className="w-full flex-shrink-0 px-2 sm:px-4">
                            <div className="bg-[#2a2a2a] rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <h3 className="text-lg sm:text-xl font-bold text-[#f7f7f7] mb-2">{job.jobTitle}</h3>
                                <p className="text-[#fb5607] font-medium mb-1 text-sm sm:text-base">{job.companyName}</p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="bg-[#333] text-[#f7f7f7] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                        {job.jobLocation}
                                    </span>
                                    <span className="bg-[#333] text-[#f7f7f7] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                        {job.jobType}
                                    </span>
                                    <span className="bg-[#333] text-[#f7f7f7] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                        {job.workMode}
                                    </span>
                                    {job.salary && (
                                        <span className="bg-[#333] text-[#f7f7f7] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                            {job.salary}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <p className="text-[#f7f7f7] text-xs sm:text-sm mb-1">
                                        <span className="font-semibold">Experience:</span> {job.experienceRequired}
                                    </p>
                                    <p className="text-[#f7f7f7] text-xs sm:text-sm mb-1">
                                        <span className="font-semibold">Skills:</span> {job.skillsRequired.join(", ")}
                                    </p>
                                    <p className="text-[#f7f7f7] text-xs sm:text-sm">
                                        <span className="font-semibold">Apply by:</span> {formatDate(job.applicationDeadline)}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-2 sm:gap-0">
                                    <button
                                        className="px-4 sm:px-6 py-1 sm:py-2 bg-[#fb5607] text-white font-medium rounded-lg hover:bg-[#ea033f] transition-colors text-sm sm:text-base"
                                        onClick={() => handleApplyClick(job._id)}
                                    >
                                        Apply Job
                                    </button>
                                    <span className="text-xs text-gray-400">
                                        Posted: {formatDate(job.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {jobs.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-[#fb5607] p-1 sm:p-2 rounded-full text-white hover:bg-[#ea033f] transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-[#fb5607] p-1 sm:p-2 rounded-full text-white hover:bg-[#ea033f] transition-colors"
                    >
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                    </button>
                </>
            )}
        </div>
    );
};

export default JobCarousel;