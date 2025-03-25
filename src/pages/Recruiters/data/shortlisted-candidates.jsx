import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const ShortlistedCandidates = () => {
    const { user } = useUser();
    const [approvedCandidates, setApprovedCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [sendingEmails, setSendingEmails] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!user?.id) {
            setError("No recruiter ID found");
            setLoading(false);
            return;
        }

        const fetchApprovedCandidates = async () => {
            try {
                const response = await axiosInstance.get(`/job-applications/approved/${user.id}`);
                setApprovedCandidates(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch approved candidates");
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedCandidates();
    }, [user]);

    const handleShortlist = async (candidateId, candidate) => {
        if (!candidate.details?.email) {
            Swal.fire("Error", "No email found for this candidate.", "error");
            return;
        }

        setSendingEmails((prev) => ({ ...prev, [candidateId]: true }));

        try {
            await axiosInstance.post("/job-applications/send-shortlist-email", {
                recruiterId: user.id,
                candidateId: candidate._id,  // Include candidate ID
                candidateEmail: candidate.details.email,
                candidateName: candidate.fullName,
                jobTitle: candidate.jobTitle,
            });

            setApprovedCandidates((prevCandidates) =>
                prevCandidates.map((c) =>
                    c._id === candidateId ? { ...c, action: "Shortlist" } : c
                )
            );

            Swal.fire("Success", `Candidate ${candidate.fullName} has been shortlisted.`, "success");
        } catch (error) {
            Swal.fire("Error", "Could not process the request. Please try again.", "error");
        } finally {
            setSendingEmails((prev) => ({ ...prev, [candidateId]: false }));
        }
    };

    const filteredCandidates = approvedCandidates.filter(candidate => {
        return candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Shortlisted Candidates</h1>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search candidates..."
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredCandidates.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">Candidate</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Location</th>
                                <th className="py-3 px-6 text-left">Skills</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCandidates.map((candidate, index) => (
                                <tr key={candidate._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="py-4 px-6 flex items-center">
                                        <div className="bg-blue-100 text-blue-800 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold mr-3">
                                            {candidate.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{candidate.fullName}</p>
                                            <p className="text-sm text-gray-600">{candidate.jobTitle || "No job title"}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">{candidate.details?.email || "Not provided"}</td>
                                    <td className="py-4 px-6">{candidate.details?.city || "Not specified"}</td>
                                    <td className="py-4 px-6">{candidate.details?.skills?.slice(0, 3).join(", ") || "None listed"}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${candidate.action === "Shortlist"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {candidate.action || "Pending"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleShortlist(candidate._id, candidate)}
                                            disabled={sendingEmails[candidate._id] || candidate.action === "Shortlist"}
                                            className={`px-4 py-2 rounded text-sm font-semibold transition-all ${candidate.action === "Shortlist"
                                                ? "bg-green-500 text-white"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                                } ${sendingEmails[candidate._id] || candidate.action === "Shortlist"
                                                    ? "opacity-70 cursor-not-allowed"
                                                    : ""
                                                }`}
                                        >
                                            {sendingEmails[candidate._id]
                                                ? "Sending..."
                                                : candidate.action === "Shortlist"
                                                    ? "Shortlisted"
                                                    : "Shortlist"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p className="text-gray-600">
                        {searchTerm ? "No candidates match your search." : "No approved candidates found."}
                    </p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-3 text-blue-500 hover:underline"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShortlistedCandidates;
