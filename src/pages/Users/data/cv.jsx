import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";

const CVUpload = () => {
    const { user } = useUser();
    const [file, setFile] = useState(null);
    const [cvUrl, setCvUrl] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const allowedTypes = ["application/pdf"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // Fetch existing CV if available
    useEffect(() => {
        const fetchCv = async () => {
            if (!user?.id || !user?.token) {
                setError("Unauthorized! Please log in again.");
                return;
            }

            try {
                const response = await axiosInstance.get(`/user/get-cv/${user.id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });

                if (response.data.cvFile) {
                    setCvUrl(response.data.cvFile);
                } else {
                    setCvUrl("");
                }
            } catch (error) {
                console.error("Error fetching CV:", error);
                setError(error.response?.status === 401 ? "Unauthorized! Please log in again." : "Failed to fetch CV.");
            }
        };

        fetchCv();
    }, [user]);

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (!allowedTypes.includes(selectedFile.type)) {
                setError("Invalid file type. Please upload a PDF.");
                return;
            }

            if (selectedFile.size > maxFileSize) {
                setError("File size exceeds 5MB limit.");
                return;
            }

            setFile(selectedFile);
            setError("");
        }
    };

    // Upload the CV file
    const handleUpload = async () => {
        if (!user?.id || !user?.token) {
            setError("You must be logged in to upload a CV.");
            return;
        }

        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("cvFile", file);

        try {
            setUploading(true);
            setProgress(0);

            const res = await axiosInstance.put(`/user/upload-cv/${user.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                },
            });

            alert("CV uploaded successfully!");
            setFile(null);
            setProgress(0);
            setCvUrl(res.data.cvUrl);
        } catch (err) {
            setError("Failed to upload CV. Please try again.");
            console.error("Upload error:", err);
        } finally {
            setUploading(false);
        }
    };

    // Download CV
    const handleDownload = () => {
        if (cvUrl) {
            const link = document.createElement("a");
            link.href = cvUrl;
            link.setAttribute("download", `CV_${user.id}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("No CV available for download.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Upload Your CV</h2>

            {!user ? (
                <p className="text-red-500 text-sm text-center">Please log in to upload your CV.</p>
            ) : (
                <>
                    {cvUrl && (
                        <div className="mb-4">
                            <p className="text-green-600 text-center">Your uploaded CV:</p>
                            <button
                                onClick={handleDownload}
                                className="block w-full text-center text-blue-500 underline mt-2"
                            >
                                Download/View CV
                            </button>
                        </div>
                    )}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                        <input
                            type="file"
                            id="cv-upload"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="cv-upload" className="block text-gray-600 cursor-pointer">
                            {file ? file.name : "Drag & drop or click to upload"}
                        </label>
                    </div>

                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                    {uploading && (
                        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-500 h-2.5 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={uploading || !user}
                        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {uploading ? "Uploading..." : "Upload CV"}
                    </button>
                </>
            )}
        </div>
    );
};

export default CVUpload;
