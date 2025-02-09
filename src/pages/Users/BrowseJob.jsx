import React, { useState, useEffect } from "react";

const BrowseJob = ({ setSelectedJob }) => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://dummyjson.com/quotes") // Replace with actual job API
      .then((res) => res.json())
      .then((data) => setJobs(data.quotes.slice(0, 10))) // Adjust based on actual data structure
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.quote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Jobs</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 w-full border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Carousel */}
      <div className="relative mb-6">
        <div className="absolute w-full flex overflow-hidden h-64">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="w-full flex-none p-4 bg-blue-100 text-center"
              style={{
                animation: `slide 12s infinite`,
                animationDelay: `${index * 2}s`,
              }}
            >
              <img
                src={`https://placeimg.com/640/480/tech?${index}`} // Placeholder image (replace with actual image URLs)
                alt={`Job image ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Job List */}
      <ul className="space-y-2">
        {filteredJobs.map((job, index) => (
          <li
            key={index}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => setSelectedJob(job.id)}
          >
            Job {index + 1} - Placeholder Title
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default BrowseJob;
