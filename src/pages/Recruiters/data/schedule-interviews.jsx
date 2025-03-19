import { useState, useEffect } from "react";
import axios from "axios";

const InterviewScheduler = () => {
  const [candidates, setCandidates] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState({});

  useEffect(() => {
    const fetchApprovedCandidates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/job-applications/approved");
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching approved candidates:", error);
      }
    };

    fetchApprovedCandidates();
  }, []);

  const handleInputChange = (id, field, value) => {
    setInterviewDetails((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleScheduleInterview = async (id) => {
    const details = interviewDetails[id];
    const candidate = candidates.find((c) => c._id === id);

    if (details?.date && details?.time) {
      try {
        await axios.post("http://localhost:5000/api/interviews/schedule", {
          candidateId: id,
          date: details.date,
          time: details.time,
        });

        alert(`Interview scheduled for ${candidate.fullName} on ${details.date} at ${details.time}`);
      } catch (error) {
        console.error("Error scheduling interview:", error);
        alert("Failed to schedule interview.");
      }
    } else {
      alert("Please select date and time.");
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Schedule Interviews</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border border-gray-200">Applicant</th>
              <th className="p-3 border border-gray-200">Job Title</th>
              <th className="p-3 border border-gray-200">Date</th>
              <th className="p-3 border border-gray-200">Time</th>
              <th className="p-3 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="text-gray-700 text-center">
                <td className="p-3 border border-gray-200">{candidate.fullName}</td>
                <td className="p-3 border border-gray-200">{candidate.jobTitle || "N/A"}</td>
                <td className="p-3 border border-gray-200">
                  <input
                    type="date"
                    className="border p-2 rounded w-full"
                    onChange={(e) => handleInputChange(candidate._id, "date", e.target.value)}
                  />
                </td>
                <td className="p-3 border border-gray-200">
                  <input
                    type="time"
                    className="border p-2 rounded w-full"
                    onChange={(e) => handleInputChange(candidate._id, "time", e.target.value)}
                  />
                </td>
                <td className="p-3 border border-gray-200">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleScheduleInterview(candidate._id)}
                  >
                    Schedule
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

export default InterviewScheduler;
