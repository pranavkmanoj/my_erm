const ViewJobs = () => {

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "New York, USA",
      salary: "$80,000",
      status: "Open",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "CodeMasters",
      location: "San Francisco, USA",
      salary: "$90,000",
      status: "Closed",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Remote",
      salary: "$75,000",
      status: "Open",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Job Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p>{job.location}</p>
            <p className="text-green-600 font-semibold">Salary: {job.salary}</p>
            <p
              className={`text-sm font-semibold ${job.status === "Open" ? "text-blue-500" : "text-red-500"
                }`}
            >
              {job.status}
            </p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobs;
