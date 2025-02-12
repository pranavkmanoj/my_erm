import { useState, useEffect } from "react";

const InterviewScheduler = () => {
  const [candidates, setCandidates] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState({});

  // Mock data (Replace with API fetch)
  useEffect(() => {
    const fetchCandidates = async () => {
      const data = [
        {
          id: 1,
          applicant: "Emily Davis",
          jobTitle: "Software Engineer",
        },
        {
          id: 2,
          applicant: "Mark Wilson",
          jobTitle: "Data Scientist",
        },
      ];
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  // Handle interview scheduling input changes
  const handleInputChange = (id, field, value) => {
    setInterviewDetails((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Submit interview schedule (Replace with API call)
  const handleScheduleInterview = (id) => {
    const details = interviewDetails[id];
    if (details?.date && details?.time) {
      alert(`Interview scheduled for ${candidates.find(c => c.id === id).applicant} on ${details.date} at ${details.time}`);
    } else {
      alert("Please select date and time.");
    }
  };

  return (
    <div className="w-auto h-auto mx-auto p-6 bg-white shadow-lg rounded-lg">
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
              <tr key={candidate.id} className="text-gray-700 text-center">
                <td className="p-3 border border-gray-200">{candidate.applicant}</td>
                <td className="p-3 border border-gray-200">{candidate.jobTitle}</td>
                <td className="p-3 border border-gray-200">
                  <input
                    type="date"
                    className="border p-2 rounded w-full"
                    onChange={(e) => handleInputChange(candidate.id, "date", e.target.value)}
                  />
                </td>
                <td className="p-3 border border-gray-200">
                  <input
                    type="time"
                    className="border p-2 rounded w-full"
                    onChange={(e) => handleInputChange(candidate.id, "time", e.target.value)}
                  />
                </td>
                <td className="p-3 border border-gray-200">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleScheduleInterview(candidate.id)}
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
