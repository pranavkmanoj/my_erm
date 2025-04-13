import { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import {
  Briefcase, Building, MapPin, DollarSign, ClipboardList,
  Calendar, Layers, GraduationCap, Users, Timer, Globe
} from "lucide-react";
import Swal from 'sweetalert2';

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

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
      const recruiterId = userData?.id;

      if (!token || !recruiterId) {
        setErrorMessage("❌ No authentication details found. Please log in.");
        return;
      }

      const response = await axiosInstance.post(
        "/jobs",
        { ...jobData, recruiterId },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      console.log("✅ Job posted successfully:", response.data);
      
      // Show SweetAlert2 success message
      Swal.fire({
        title: 'Success!',
        text: 'Job posted successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EA033F',
        background: '#ffffff',
        iconColor: '#4CAF50',
        timer: 3000,
        timerProgressBar: true,
      });

      // Reset form
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
    } catch (error) {
      console.error("❌ Error posting job:", error.response?.data || error.message);
      const errorMsg = error.response?.data?.message || "Failed to post job. Please try again.";
      setErrorMessage(errorMsg);
      
      // Show SweetAlert2 error message
      Swal.fire({
        title: 'Error!',
        text: errorMsg,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#EA033F',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-b from-[#EA033F] to-[#140000] text-transparent bg-clip-text mb-8">
        Post a New Job
      </h2>

      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4 shadow-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {[
          { name: "jobTitle", placeholder: "Job Title", icon: <Briefcase />, type: "text" },
          { name: "companyName", placeholder: "Company Name", icon: <Building />, type: "text" },
          { name: "jobLocation", placeholder: "Location", icon: <MapPin />, type: "text" },
          { name: "salary", placeholder: "Salary", icon: <DollarSign />, type: "number" },
          { name: "skillsRequired", placeholder: "Skills (comma separated)", icon: <Layers />, type: "text" },
          { name: "experienceRequired", placeholder: "Experience (e.g. 0-2 years)", icon: <Users />, type: "text" },
          { name: "qualifications", placeholder: "Qualifications (e.g. B.Tech, MCA)", icon: <GraduationCap />, type: "text" },
          { name: "applicationDeadline", placeholder: "Deadline", icon: <Calendar />, type: "date" }
        ].map((field, index) => (
          <div key={index} className="relative">
            <div className="absolute left-4 top-3 text-gray-500">{field.icon}</div>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={jobData[field.name]}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>
        ))}

        <div className="col-span-2">
          <textarea
            name="jobDescription"
            placeholder="Job Description"
            value={jobData.jobDescription}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            rows="4"
            required
          />
        </div>

        <div className="col-span-1">
          <div className="relative">
            <div className="absolute left-4 top-3 text-gray-500"><Timer /></div>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="col-span-1">
          <div className="relative">
            <div className="absolute left-4 top-3 text-gray-500"><Globe /></div>
            <select
              name="workMode"
              value={jobData.workMode}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            >
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#EA033F] to-[#140000] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPosting;