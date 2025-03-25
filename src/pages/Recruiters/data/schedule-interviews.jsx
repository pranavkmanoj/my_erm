import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { useUser } from "../../../context/AuthContext";

const ShortlistedCandidates = () => {
  const { user } = useUser(); // Get logged-in recruiter data
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewDate, setInterviewDate] = useState("");

  // Fetch shortlisted candidates for the logged-in recruiter
  useEffect(() => {
    if (user?.id) {
      axiosInstance
        .get(`/interview/shortlisted?recruiterId=${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((response) => setCandidates(response.data))
        .catch((error) => console.error("Error fetching candidates:", error));
    }
  }, [user]);

  const handleViewMore = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const confirmInterview = () => {
    if (!interviewDate) {
      alert("Please select an interview date and time.");
      return;
    }

    axiosInstance
      .post(
        "/interview/schedule",
        {
          jobApplicationId: selectedCandidate._id, // Send selected candidate's job application ID
          interviewDate, // Send selected interview date
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include token if required
          },
        }
      )
      .then(() => {
        alert("Interview Scheduled Successfully! The candidate has been notified.");
        setSelectedCandidate(null); // Close the modal
      })
      .catch((error) => {
        console.error("Error scheduling interview:", error);
        alert("There was an error scheduling the interview.");
      });
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 text-gray-700">Shortlisted Candidates</h2>

      {candidates.length === 0 ? (
        <p className="text-gray-600">No shortlisted candidates found.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Skills</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{candidate.firstName} {candidate.lastName}</td>
                  <td className="p-3">{candidate.email}</td>
                  <td className="p-3">{candidate.phone}</td>
                  <td className="p-3">{candidate.experience} Years</td>
                  <td className="p-3">{candidate.skills.join(", ")}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleViewMore(candidate)}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      View More
                    </button>
                    <button
                      onClick={() => handleViewMore(candidate)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Schedule Interview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold">Candidate Details</h3>
            <p><strong>Name:</strong> {selectedCandidate.firstName} {selectedCandidate.lastName}</p>
            <p><strong>Email:</strong> {selectedCandidate.email}</p>
            <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
            <p><strong>City:</strong> {selectedCandidate.city}</p>
            <p><strong>Experience:</strong> {selectedCandidate.experience} Years</p>
            <p><strong>Skills:</strong> {selectedCandidate.skills.join(", ")}</p>
            <p><strong>Availability:</strong> {selectedCandidate.availability}</p>
            <p><strong>Status:</strong> {selectedCandidate.status}</p>
            <p><strong>Cover Letter:</strong> {selectedCandidate.coverLetter || "Not provided"}</p>

            <label className="block mt-3 text-sm font-medium">Select Interview Date & Time</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-3"
              onChange={(e) => setInterviewDate(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 border rounded hover:bg-gray-200"
              >
                Close
              </button>
              <button
                onClick={confirmInterview}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortlistedCandidates;
