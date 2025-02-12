import { useState, useEffect } from "react";

const ShortlistedCandidates = () => {
    const [shortlisted, setShortlisted] = useState([]);

    // Mock data (Replace this with API fetch)
    useEffect(() => {
        const fetchShortlistedCandidates = async () => {
            const data = [
                {
                    id: 1,
                    applicant: "Emily Davis",
                    jobTitle: "Software Engineer",
                    resume: "https://example.com/resume-emily.pdf",
                },
                {
                    id: 2,
                    applicant: "Mark Wilson",
                    jobTitle: "Data Scientist",
                    resume: "https://example.com/resume-mark.pdf",
                },
            ];
            setShortlisted(data);
        };

        fetchShortlistedCandidates();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shortlisted Candidates</h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border border-gray-200">Applicant</th>
                            <th className="p-3 border border-gray-200">Job Title</th>
                            <th className="p-3 border border-gray-200">Resume</th>
                            <th className="p-3 border border-gray-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shortlisted.map((candidate) => (
                            <tr key={candidate.id} className="text-gray-700 text-center">
                                <td className="p-3 border border-gray-200">{candidate.applicant}</td>
                                <td className="p-3 border border-gray-200">{candidate.jobTitle}</td>
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
