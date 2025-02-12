import React, { useState } from 'react';

const JobPostingForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ jobTitle, jobDescription, jobLocation, jobType, salary });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg ">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Post a Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobDescription">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job description"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobLocation">
              Job Location
            </label>
            <input
              type="text"
              id="jobLocation"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job location"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="jobType">
              Job Type
            </label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="salary">
              Salary
            </label>
            <input
              type="text"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter salary"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;
