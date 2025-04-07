import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Layout/User-Navbar";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyJobs = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        email: user?.email || "",
        city: "",
        coverLetter: "",
        experience: "",
        skills: [],
        availability: "",
        recruiterId: "",
    });

    const jobId = new URLSearchParams(useLocation().search).get("jobId");

    useEffect(() => {
        if (!user) {
            toast.error("Please login to apply for this job", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/ulogin", { state: { from: `/apply-job?jobId=${jobId}` } });
            return;
        }

        const fetchJobDetails = async () => {
            if (!jobId) {
                setError("Job not found.");
                setLoading(false);
                toast.error("Job not found");
                return;
            }
            try {
                const { data } = await axiosInstance.get(`/jobs/${jobId}`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });
                setJobDetails(data);
                setFormData(prev => ({
                    ...prev,
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    phone: user.phone || "",
                    email: user.email || "",
                    recruiterId: data.recruiterId || ""
                }));
            } catch (error) {
                setError("Failed to load job details.");
                toast.error("Failed to load job details");
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [jobId, user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setFormData({ ...formData, skills: e.target.value.split(",").map(skill => skill.trim()) });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            toast.success("Resume uploaded successfully");
        } else {
            toast.warning("Please upload a valid PDF file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to apply for this job");
            navigate("/login", { state: { from: `/apply-job?jobId=${jobId}` } });
            return;
        }

        if (!jobId || !selectedFile) {
            toast.error("Please fill all required fields and upload your resume.");
            return;
        }

        setIsSubmitting(true);

        try {
            const applicationData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === "skills") {
                    applicationData.append(key, JSON.stringify(value));
                } else {
                    applicationData.append(key, value);
                }
            });
            applicationData.append("userId", user.id);
            applicationData.append("jobId", jobId);
            applicationData.append("resume", selectedFile);

            await axiosInstance.post("/job-applications/apply", applicationData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`,
                },
            });

            toast.success("Application submitted successfully!");
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting application:", error);
            toast.error(error.response?.data?.message || "Application failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepTitles = ["Personal Info", "Application Details", "Upload Resume"];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                {submitted ? (
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
                        <div className="p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h2>
                            <p className="text-gray-600 mb-6">We've received your application and will review it shortly.</p>
                            <button
                                onClick={() => navigate("/job-listing")}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Back to Jobs
                            </button>
                        </div>
                    </div>
                ) : isSubmitting ? (
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
                        <div className="p-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Submitting Application...</h2>
                            <p className="text-gray-600">Please wait while we process your application.</p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            {jobDetails && (
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Applying for: {jobDetails.title} at {jobDetails.company}
                                </h2>
                            )}
                        </div>

                        {/* Stepper */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex justify-between">
                                {[1, 2, 3].map((stepNumber) => (
                                    <div key={stepNumber} className="flex flex-col items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                                        >
                                            {stepNumber}
                                        </div>
                                        <span className={`text-sm mt-2 ${step >= stepNumber ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                                            {stepTitles[stepNumber - 1]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="p-6">
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {["firstName", "lastName", "phone", "email", "city"].map((field) => (
                                            <div key={field} className="space-y-1">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                                                    {["firstName", "lastName", "phone", "email"].includes(field) && " *"}
                                                </label>
                                                <input
                                                    type={field === "email" ? "email" : "text"}
                                                    name={field}
                                                    value={formData[field]}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    required={["firstName", "lastName", "phone", "email"].includes(field)}

                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Application Details</h2>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                                        <textarea
                                            name="coverLetter"
                                            value={formData.coverLetter}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Explain why you're a good fit for this position..."
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Experience (years) *</label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            min="0"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Skills (comma separated) *</label>
                                        <input
                                            type="text"
                                            name="skills"
                                            value={formData.skills.join(", ")}
                                            onChange={handleSkillsChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                            placeholder="e.g. JavaScript, React, Node.js"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-gray-700">Availability *</label>
                                        <select
                                            name="availability"
                                            value={formData.availability}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        >
                                            <option value="">Select availability</option>
                                            <option value="Immediate">Immediate</option>
                                            <option value="1 Month">1 Month</option>
                                            <option value="2 Months">2 Months</option>
                                            <option value="More">More than 2 months</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(3)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Upload Your Resume</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF only (max 5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="resume"
                                                    accept="application/pdf"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    required
                                                />
                                            </label>
                                        </div>
                                        {selectedFile && (
                                            <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
                                                Selected file: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || !selectedFile}
                                            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} ${!selectedFile && 'opacity-50 cursor-not-allowed'}`}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ApplyJobs;