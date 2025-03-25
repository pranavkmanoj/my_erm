import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../../axiosInstance";

const JobSeekerRegistrations = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job seekers from backend
  useEffect(() => {
    const fetchJobSeekers = async () => {
      try {
        const response = await axiosInstance.get("/auth/users"); // Adjust API endpoint
        setJobSeekers(response.data);
      } catch (err) {
        console.error("Error fetching job seekers:", err);
        setError("Failed to fetch job seekers");
      } finally {
        setLoading(false);
      }
    };

    fetchJobSeekers();
  }, []);

  // Function to generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Seeker Registrations", 14, 10);

    const tableColumn = ["Name", "Email", "Phone", "Age", "Gender", "Location", "Interests"];
    const tableRows = [];

    jobSeekers.forEach((seeker) => {
      tableRows.push([
        seeker.name,
        seeker.email,
        seeker.phone || "N/A",
        seeker.age || "N/A",
        seeker.gender || "N/A",
        seeker.location || "N/A",
        seeker.interests || "N/A",
      ]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Job_Seekers.pdf");
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with PDF Download Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Job Seeker Registrations</h2>
        <motion.button
          onClick={downloadPDF}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Download PDF
        </motion.button>
      </div>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {/* Total Job Seekers */}
          <motion.div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold">Total Job Seekers</h3>
            <p className="text-3xl font-bold">{jobSeekers.length}</p>
          </motion.div>

          {/* Job Seeker Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobSeekers.map((seeker) => (
              <motion.div
                key={seeker._id}
                className="bg-gray-100 p-5 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900">{seeker.name}</h3>
                <p className="text-gray-700">
                  <strong>Email:</strong> {seeker.email}
                </p>
                {seeker.phone && (
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {seeker.phone}
                  </p>
                )}
                {seeker.age && (
                  <p className="text-gray-700">
                    <strong>Age:</strong> {seeker.age}
                  </p>
                )}
                {seeker.gender && (
                  <p className="text-gray-700">
                    <strong>Gender:</strong> {seeker.gender}
                  </p>
                )}
                {seeker.location && (
                  <p className="text-gray-700">
                    <strong>Location:</strong> {seeker.location}
                  </p>
                )}
                {seeker.interests && (
                  <p className="text-gray-700">
                    <strong>Interests:</strong> {seeker.interests}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default JobSeekerRegistrations;
