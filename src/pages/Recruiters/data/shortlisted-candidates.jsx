import { useState, useEffect } from "react";
import axios from "axios";

const ShortlistedCandidates = () => {
    const [approvedCandidates, setApprovedCandidates] = useState([]);

    useEffect(() => {
        const fetchApprovedCandidates = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/job-applications/approved");
                setApprovedCandidates(response.data);
            } catch (error) {
                console.error("Error fetching approved candidates:", error);
            }
        };

        fetchApprovedCandidates();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Approved Candidates</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border border-gray-200">Applicant</th>
                            <th className="p-3 border border-gray-200">Job Title</th>
                            <th className="p-3 border border-gray-200">Details</th>
                            <th className="p-3 border border-gray-200">Resume</th>
                            <th className="p-3 border border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedCandidates.map((candidate) => (
                            <tr key={candidate._id} className="text-gray-700 text-center">
                                <td className="p-3 border border-gray-200">{candidate.fullName}</td>
                                <td className="p-3 border border-gray-200">{candidate.jobTitle || "N/A"}</td>
                                <td className="p-3 border border-gray-200 text-left">
                                    <div className="text-sm">
                                        <p><strong>📞 Phone:</strong> {candidate.details?.phone || "N/A"}</p>
                                        <p><strong>📧 Email:</strong> {candidate.details?.email || "N/A"}</p>
                                        <p><strong>📍 City:</strong> {candidate.details?.city || "N/A"}</p>
                                        <p><strong>💼 Experience:</strong> {candidate.details?.experience || "N/A"}</p>
                                        <p><strong>🛠 Skills:</strong> {candidate.details?.skills?.join(", ") || "N/A"}</p>
                                        <p><strong>📅 Availability:</strong> {candidate.details?.availability || "N/A"}</p>
                                        <p><strong>📆 Applied On:</strong> {new Date(candidate.details?.appliedAt).toLocaleDateString()}</p>
                                    </div>
                                </td>
                                <td className="p-3 border border-gray-200">
                                    <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        View Resume
                                    </a>
                                </td>
                                <td className="p-3 border border-gray-200">
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        Schedule Interview
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShortlistedCandidates;
