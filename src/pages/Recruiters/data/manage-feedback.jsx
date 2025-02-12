import { useState, useEffect } from "react";

const ManageFeedback = () => {
    const [candidates, setCandidates] = useState([]);
    const [feedbackData, setFeedbackData] = useState({});

    // Mock data (Replace with API fetch)
    useEffect(() => {
        const fetchCandidates = async () => {
            const data = [
                {
                    id: 1,
                    applicant: "Emily Davis",
                    jobTitle: "Software Engineer",
                    interviewDate: "2025-02-15",
                },
                {
                    id: 2,
                    applicant: "Mark Wilson",
                    jobTitle: "Data Scientist",
                    interviewDate: "2025-02-17",
                },
            ];
            setCandidates(data);
        };

        fetchCandidates();
    }, []);

    // Handle feedback input changes
    const handleInputChange = (id, field, value) => {
        setFeedbackData((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    // Submit feedback (Replace with API call)
    const handleSubmitFeedback = (id) => {
        const feedback = feedbackData[id];
        if (feedback?.comment && feedback?.rating) {
            alert(`Feedback for ${candidates.find(c => c.id === id).applicant}: ${feedback.comment}, Rating: ${feedback.rating}`);
        } else {
            alert("Please enter feedback and rating.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Interview Feedback</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border border-gray-200">Applicant</th>
                            <th className="p-3 border border-gray-200">Job Title</th>
                            <th className="p-3 border border-gray-200">Interview Date</th>
                            <th className="p-3 border border-gray-200">Feedback</th>
                            <th className="p-3 border border-gray-200">Rating</th>
                            <th className="p-3 border border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id} className="text-gray-700 text-center">
                                <td className="p-3 border border-gray-200">{candidate.applicant}</td>
                                <td className="p-3 border border-gray-200">{candidate.jobTitle}</td>
                                <td className="p-3 border border-gray-200">{candidate.interviewDate}</td>
                                <td className="p-3 border border-gray-200">
                                    <textarea
                                        className="border p-2 rounded w-full"
                                        placeholder="Enter feedback"
                                        onChange={(e) => handleInputChange(candidate.id, "comment", e.target.value)}
                                    />
                                </td>
                                <td className="p-3 border border-gray-200">
                                    <select
                                        className="border p-2 rounded w-full"
                                        onChange={(e) => handleInputChange(candidate.id, "rating", e.target.value)}
                                    >
                                        <option value="">Select Rating</option>
                                        <option value="1">⭐</option>
                                        <option value="2">⭐⭐</option>
                                        <option value="3">⭐⭐⭐</option>
                                        <option value="4">⭐⭐⭐⭐</option>
                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                    </select>
                                </td>
                                <td className="p-3 border border-gray-200">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => handleSubmitFeedback(candidate.id)}
                                    >
                                        Save Feedback
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

export default ManageFeedback;
