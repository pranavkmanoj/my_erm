import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Layout/User-Navbar";
import axiosInstance from "../../../axiosInstance"; 
import backgroundImage from "../images/background.jpg";

const ApplyJobs = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        city: "",
        cv: null,
    });

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const jobId = searchParams.get("jobId"); // Extract jobId from query string

    const [jobDetails, setJobDetails] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!jobId) return; // Ensure jobId exists
            try {
                const response = await axiosInstance.get(`/jobs/${jobId}`);
                setJobDetails(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, cv: e.target.files[0] });
    };

    const handleSubmit = () => {
        alert("Your application is successfully registered. We will connect with you later.");
    };

    return (
        <div>
            <Navbar />
            <div
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="relative max-w-5xl mx-auto p-6">
                    {/* Step Indicator */}
                    <div className="flex justify-center mb-6">
                        <div className={`px-4 py-2 rounded-full text-white ${step === 1 ? "bg-blue-600" : "bg-gray-400"}`}>
                            Step 1
                        </div>
                        <div className="w-10 h-1 bg-gray-300 mx-2"></div>
                        <div className={`px-4 py-2 rounded-full text-white ${step === 2 ? "bg-blue-600" : "bg-gray-400"}`}>
                            Step 2
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {/* Left Section - Form */}
                        <div className="w-2/3">
                            <div className="bg-white p-6 shadow-md rounded-lg flex flex-col justify-center h-96 w-full">
                                {step === 1 ? (
                                    <>
                                        <h2 className="text-2xl font-semibold mb-4">Add your contact information</h2>
                                        <form>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    placeholder="First name"
                                                    className="border p-2 rounded w-full"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    placeholder="Last name"
                                                    className="border p-2 rounded w-full"
                                                    required
                                                />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone number"
                                                className="border p-2 rounded w-full mt-4"
                                                required
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="border p-2 rounded w-full mt-4"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                placeholder="City, Country"
                                                className="border p-2 rounded w-full mt-4"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded w-full"
                                                onClick={() => setStep(2)}
                                            >
                                                Continue
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-semibold mb-4">Upload Your CV</h2>
                                        <input type="file" className="border p-2 rounded w-full" onChange={handleFileChange} required />
                                        <div className="flex justify-between mt-6">
                                            <button
                                                className="bg-gray-500 text-white py-2 px-4 rounded"
                                                onClick={() => setStep(1)}
                                            >
                                                Back
                                            </button>
                                            <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                                                Submit Application
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right Section - Job Details */}
                        <div className="w-1/3 bg-gray-100 p-6 rounded-lg h-96 flex flex-col justify-center">
                            {jobDetails ? (
                                <>
                                    <h3 className="text-xl font-semibold">{jobDetails.jobTitle}</h3>
                                    <p className="text-gray-700 text-sm">{jobDetails.companyName} - {jobDetails.jobLocation}</p>
                                    <p className="mt-2 text-gray-600 text-sm">{jobDetails.jobDescription}</p>
                                    <button className="text-blue-600 mt-4">View full job description</button>
                                </>
                            ) : (
                                <p>Loading job details...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ApplyJobs;
