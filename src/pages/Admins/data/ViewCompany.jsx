import { useState, useEffect } from "react";
import axiosInstance from "../../../axiosInstance";

const ViewCompany = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recruiters from the backend
  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const response = await axiosInstance.get("/auth/recruiters");
        setRecruiters(response.data);
      } catch (err) {
        console.error("Error fetching recruiters:", err);
        setError("Failed to fetch recruiters");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiters();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recruiter Registration List</h2>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : recruiters.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Company Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Bio</th>
              </tr>
            </thead>
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter._id} className="border-b hover:bg-gray-100">
                  <td className="p-2 border">{recruiter.companyName}</td>
                  <td className="p-2 border">{recruiter.email}</td>
                  <td className="p-2 border">{recruiter.bio || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No registered recruiters available</p>
        )}
      </div>
    </div>
  );
};

export default ViewCompany;
