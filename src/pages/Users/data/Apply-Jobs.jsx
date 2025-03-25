import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Layout/User-Navbar";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";
import backgroundImage from "../images/background.jpg";

const ApplyJobs = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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
        const fetchJobDetails = async () => {
            if (!jobId) {
                setError("Job not found.");
                setLoading(false);
                return;
            }
            try {
                const { data } = await axiosInstance.get(`/jobs/${jobId}`, {
                    headers: { Authorization: `Bearer ${user?.token}` },
                });
                setJobDetails(data);

                // ✅ Assign recruiterId from the job details
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    recruiterId: data.recruiterId || "",
                }));
            } catch (error) {
                setError("Failed to load job details.");
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [jobId, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSkillsChange = (e) => {
        setFormData({ ...formData, skills: e.target.value.split(",").map((skill) => skill.trim()) });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
        } else {
            alert("❌ Please upload a valid image file (JPG, PNG).");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            alert("❌ User ID is missing. Please log in again.");
            return;
        }

        if (!jobId) {
            alert("❌ Invalid job selection.");
            return;
        }

        if (!selectedFile) {
            alert("❌ Please upload your resume as an image (JPG, PNG).");
            return;
        }

        try {
            const applicationData = new FormData();
            applicationData.append("userId", user.id);
            applicationData.append("firstName", formData.firstName);
            applicationData.append("lastName", formData.lastName);
            applicationData.append("phone", formData.phone);
            applicationData.append("email", formData.email);
            applicationData.append("city", formData.city);
            applicationData.append("coverLetter", formData.coverLetter);
            applicationData.append("experience", formData.experience);
            applicationData.append("skills", JSON.stringify(formData.skills));
            applicationData.append("availability", formData.availability);
            applicationData.append("jobId", jobId);
            applicationData.append("recruiterId", formData.recruiterId); // ✅ Attach recruiterId
            applicationData.append("cv", selectedFile);

            await axiosInstance.post("/job-applications/apply", applicationData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${user.token}`,
                },
            });

            setSubmitted(true);
            alert("✅ Application submitted successfully!");

        } catch (error) {
            console.error("❌ Error submitting application:", error);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="relative max-w-5xl mx-auto p-6">
                    {submitted ? (
                        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow-md text-center">
                            <h2 className="text-2xl font-semibold">Application Submitted!</h2>
                            <p>Thank you for applying. We will review your application and get back to you soon.</p>
                            <button
                                onClick={() => navigate("/job-listing")}
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mb-6">
                                {[1, 2, 3].map((s) => (
                                    <div key={s}
                                        className={`px-4 py-2 rounded-full text-white ${step === s ? "bg-blue-600" : "bg-gray-400"}`}>
                                        {`Step ${s}`}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-6">
                                <div className="w-2/3 bg-white p-6 shadow-md rounded-lg flex flex-col justify-center h-auto w-full">
                                    {step === 1 ? (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                                            <form>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {["firstName", "lastName", "phone", "email", "city"].map((field) => (
                                                        <input key={field}
                                                            type="text"
                                                            name={field}
                                                            value={formData[field]}
                                                            onChange={handleChange}
                                                            placeholder={field.replace(/([A-Z])/g, " $1")}
                                                            className="border p-2 rounded w-full"
                                                            required
                                                        />
                                                    ))}
                                                </div>
                                                <button type="button" className="mt-6 bg-blue-600 text-white py-2 px-4 rounded w-full" onClick={() => setStep(2)}>
                                                    Continue
                                                </button>
                                            </form>
                                        </>
                                    ) : step === 2 ? (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-4">Job Application Details</h2>
                                            <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} placeholder="Cover Letter (optional)" className="border p-2 rounded w-full" />
                                            <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience (in years)" className="border p-2 rounded w-full mt-4" required />
                                            <input type="text" name="skills" value={formData.skills.join(", ")} onChange={handleSkillsChange} placeholder="Skills (comma-separated)" className="border p-2 rounded w-full mt-4" required />
                                            <select name="availability" value={formData.availability} onChange={handleChange} className="border p-2 rounded w-full mt-4" required>
                                                <option value="">Select Availability</option>
                                                <option value="Immediate">Immediate</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="2 Months">2 Months</option>
                                                <option value="More">More</option>
                                            </select>
                                            <button className="bg-green-600 text-white py-2 px-4 rounded mt-6" onClick={() => setStep(3)}>Next</button>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-semibold mb-4">Upload Your CV</h2>
                                            <input type="file" accept="image/*" className="border p-2 rounded w-full" onChange={handleFileChange} required />
                                            <button className="bg-green-600 text-white py-2 px-4 rounded mt-6" onClick={handleSubmit}>Submit Application</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyJobs;
