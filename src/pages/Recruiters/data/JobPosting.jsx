import { useState } from "react";
import axiosInstance from "../../../axiosInstance"; // Import Axios instance

const JobPosting = () => {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    jobLocation: "",
    salary: "",
    jobType: "Full-time",
    skillsRequired: "",
    experienceRequired: "",
    qualifications: "",
    applicationDeadline: "",
    workMode: "Onsite",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedJobData = {
        ...jobData,
        skillsRequired: jobData.skillsRequired.split(",").map((skill) => skill.trim()), // Convert skills to array
      };

      const response = await axiosInstance.post("/jobs", formattedJobData);
      if (response.status === 201) {
        setSuccessMessage("Job posted successfully! ✅");
        setJobData({
          jobTitle: "",
          companyName: "",
          jobDescription: "",
          jobLocation: "",
          salary: "",
          jobType: "Full-time",
          skillsRequired: "",
          experienceRequired: "",
          qualifications: "",
          applicationDeadline: "",
          workMode: "Onsite",
        });

        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Post a New Job</h2>

      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={jobData.jobTitle}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={jobData.companyName}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="jobDescription"
          placeholder="Job Description"
          value={jobData.jobDescription}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="jobLocation"
          placeholder="Location"
          value={jobData.jobLocation}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Job Type Dropdown */}
        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        {/* Work Mode Dropdown */}
        <select
          name="workMode"
          value={jobData.workMode}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <input
          type="text"
          name="skillsRequired"
          placeholder="Skills (comma separated)"
          value={jobData.skillsRequired}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="experienceRequired"
          placeholder="Experience Required (e.g. 0-2 years)"
          value={jobData.experienceRequired}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="qualifications"
          placeholder="Qualifications (e.g. B.Tech, MCA)"
          value={jobData.qualifications}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="date"
          name="applicationDeadline"
          value={jobData.applicationDeadline}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-200"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default JobPosting;
