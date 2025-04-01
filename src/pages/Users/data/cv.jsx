import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/AuthContext";
import axiosInstance from "../../../axiosInstance";
import { FiUploadCloud, FiDownload, FiTrash2, FiAlertCircle, FiFile } from "react-icons/fi";

const CVUpload = ({ bgColor = "white" }) => {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [cvUrl, setCvUrl] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["application/pdf"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  // Fetch existing CV
  useEffect(() => {
    const fetchCV = async () => {
      if (!user?.id || !user?.token) return;

      try {
        const response = await axiosInstance.get(`/user/get-cv/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (response.data.cvFile) {
          setCvUrl(response.data.cvFile);
        }
      } catch (err) {
        console.error("Error fetching CV:", err);
      }
    };

    fetchCV();
  }, [user]);

  // File validation
  const validateFile = (file) => {
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      setError("Only PDF files are allowed");
      return;
    }

    if (file.size > maxFileSize) {
      setError("File size exceeds 5MB limit");
      return;
    }

    setFile(file);
    setError("");
  };

  // Upload file
  const handleUpload = async () => {
    if (!user?.id || !user?.token || !file) {
      setError("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("cvFile", file);

    try {
      setUploading(true);

      const response = await axiosInstance.put(
        `/user/upload-cv/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      setCvUrl(response.data.cvUrl);
      setFile(null);
      setError("");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError("");
  };

  // Drag & Drop handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  return (
    <div
      className={`max-w-md mx-auto p-6 rounded-lg shadow-sm border border-gray-200 ${
        bgColor === "black" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-xl font-medium ${bgColor === "black" ? "text-white" : "text-black"}`}>
            Upload Your Resume
          </h2>
          <p className="text-sm text-gray-500 mt-1">PDF format, maximum 5MB</p>
        </div>

        {/* Existing Resume */}
        {cvUrl && (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2">
              <FiFile className="text-gray-500" />
              <span className="text-sm font-medium">Current Resume</span>
            </div>
            <button
              onClick={() => window.open(cvUrl, "_blank")}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <FiDownload size={14} /> View
            </button>
          </div>
        )}

        {/* Upload Area */}
        <div className="space-y-4">
          <label
            className={`block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <FiUploadCloud className={`text-3xl ${isDragging ? "text-blue-500" : "text-gray-400"}`} />
              <div className="text-sm text-gray-600">
                <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
              </div>
              <p className="text-xs text-gray-400">PDF only (max 5MB)</p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected File */}
          {file && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 overflow-hidden">
                <FiFile className="text-gray-500 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{file.name}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                onClick={handleRemoveFile}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiTrash2 />
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
              <FiAlertCircle />
              <span>{error}</span>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
              !file || uploading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-pulse">⏳</span> Uploading...
              </span>
            ) : (
              "Upload Resume"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVUpload;
