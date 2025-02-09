import React from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

const JobCard = ({ position, company, date, status }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm w-full mx-auto">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{position}</h2>
      <p className="text-gray-600 dark:text-gray-400">{company}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      <div
        className={`mt-2 px-4 py-1 text-black text-sm font-medium rounded-full ${status === "Full-Time" ? "bg-yellow-300" : "bg-cyan-300"
          }`}
      >
        {status}
      </div>
      <div className="mt-4 flex space-x-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
          onClick={() => alert(`Viewing details for ${position}`)}
        >
          Details
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-full"
          onClick={() => alert(`Applying for ${position}`)}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

const JobListing = () => {
  const jobs = [
    { position: "Software Engineer", company: "Tech Corp", date: "Feb 5, 2025", status: "Full-Time" },
    { position: "Data Analyst", company: "Data Inc.", date: "Feb 10, 2025", status: "Part-Time" },
    { position: "Product Manager", company: "InnovateX", date: "Feb 15, 2025", status: "Full-Time" },
    { position: "UI/UX Designer", company: "Creative Solutions", date: "Feb 20, 2025", status: "Part-Time" },
    { position: "Software Engineer", company: "Tech Corp", date: "Feb 5, 2025", status: "Full-Time" },
    { position: "Data Analyst", company: "Data Inc.", date: "Feb 10, 2025", status: "Part-Time" },
    { position: "UI/UX Designer", company: "Creative Solutions", date: "Feb 20, 2025", status: "Part-Time" },
    { position: "Software Engineer", company: "Tech Corp", date: "Feb 5, 2025", status: "Full-Time" },
    { position: "Data Analyst", company: "Data Inc.", date: "Feb 10, 2025", status: "Part-Time" },
    { position: "UI/UX Designer", company: "Creative Solutions", date: "Feb 20, 2025", status: "Part-Time" },
    { position: "Data Analyst", company: "Data Inc.", date: "Feb 10, 2025", status: "Part-Time" },
    { position: "Product Manager", company: "InnovateX", date: "Feb 15, 2025", status: "Full-Time" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 ml-15 p-5 mt-5">
          <h1 className="text-2xl font-bold mb-6">Available Job Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default JobListing;
