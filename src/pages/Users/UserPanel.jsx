import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import JobListing from "../Users/JobList";
import BrowseJob from "../Users/BrowseJob";

const UserPanel = () => {
  const [selectedJob, setSelectedJob] = useState(""); // State to track selected job section

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar setSelectedJob={setSelectedJob} />

        {/* Main Content Area */}
        <main className="pt-20 p-4 ml-64 flex-grow">
          {selectedJob === "BrowseJob" && <BrowseJob />}
          {selectedJob === "JobListing" && <JobListing />}
          {!selectedJob && (
            <>
              <h1 className="text-2xl font-bold mb-4">Welcome to User Panel</h1>
              <p className="text-gray-600">This is a simple React component with a header and a paragraph.</p>
            </>
          )}
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default UserPanel;
