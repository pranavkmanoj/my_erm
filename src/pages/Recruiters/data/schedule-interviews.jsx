import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";

const ScheduleInterview = () => {
  const { user } = useUser();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/interview/shortlisted?recruiterId=${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          setCandidates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
          setMessage({ text: "Failed to load candidates.", type: "error" });
        });
    }
  }, [user]);

  const handleViewMore = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const confirmInterview = async () => {
    if (!interviewDate) {
      setMessage({ text: "Please select an interview date and time.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/interview/schedule`,
        {
          jobApplicationId: selectedCandidate._id,
          recruiterId: user.id,
          userId: selectedCandidate.userId,
          jobId: selectedCandidate.jobId,
          interviewDate: new Date(interviewDate).toISOString(),
          firstName: selectedCandidate.firstName,
          lastName: selectedCandidate.lastName,
          phoneNumber: selectedCandidate.phone,
          email: selectedCandidate.email,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json"
          },
        }
      );

      setMessage({ text: "Interview Scheduled Successfully!", type: "success" });
      setSelectedCandidate(null);
      setInterviewDate("");

      // Refresh the candidates list
      const updatedResponse = await axiosInstance.get(`/interview/shortlisted?recruiterId=${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCandidates(updatedResponse.data);

    } catch (error) {
      console.error("Error scheduling interview:", error);
      setMessage({ text: error.response?.data?.error || "An error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shortlisted Candidates</h2>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === "success"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
          }`}>
          {message.text}
        </div>
      )}

      {candidates.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">👤</div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No candidates found</h3>
          <p className="mt-1 text-gray-500">You haven't shortlisted any candidates yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div key={candidate._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{candidate.firstName} {candidate.lastName}</h3>
                    <p className="text-gray-500 text-sm">{candidate.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📞</span>
                    {candidate.phone || "Not provided"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">💼</span>
                    {candidate.experience} years experience
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <span className="mr-2">🛠️</span>
                    <span className="flex-1">{candidate.skills.slice(0, 3).join(", ")}{candidate.skills.length > 3 ? "..." : ""}</span>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => handleViewMore(candidate)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleViewMore(candidate)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Schedule Interview</h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {selectedCandidate.firstName.charAt(0)}{selectedCandidate.lastName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedCandidate.firstName} {selectedCandidate.lastName}</h4>
                  <p className="text-gray-500 text-sm">{selectedCandidate.email}</p>
                </div>
              </div>

              <div className="space-y-3">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date & Time</label>
                  <input
                    type="datetime-local"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedCandidate.status === "scheduled"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {selectedCandidate.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmInterview}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white text-sm ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  } transition-colors duration-200`}
              >
                {loading ? "Scheduling..." : "Confirm Interview"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;