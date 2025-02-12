import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const JobSeekerRegistrations = () => {
  const [jobSeekers, setJobSeekers] = useState([]);

  // Mock data (Replace with API fetch)
  useEffect(() => {
    const fetchJobSeekers = async () => {
      const data = [
        { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 123-456-7890", age: "25", gender: "Male", location: "New York, USA", interests: "Web Development, AI" },
        { id: 2, name: "Emily Johnson", email: "emily@example.com", phone: "+1 987-654-3210", age: "28", gender: "Female", location: "San Francisco, USA", interests: "UI/UX Design, Product Management" },
      ];
      setJobSeekers(data);
    };

    fetchJobSeekers();
  }, []);

  // Function to generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Seeker Registrations", 14, 10);
    
    const tableColumn = ["Name", "Email", "Phone", "Age", "Gender", "Location", "Interests"];
    const tableRows = [];

    jobSeekers.forEach(seeker => {
      tableRows.push([seeker.name, seeker.email, seeker.phone, seeker.age, seeker.gender, seeker.location, seeker.interests]);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Job_Seekers.pdf");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Job Seeker Registrations</h2>
        <button onClick={downloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Download PDF
        </button>
      </div>

      {/* Total Job Seekers */}
      <div className="bg-blue-500 text-white p-5 rounded-lg shadow text-center mb-6">
        <h3 className="text-lg">Total Job Seekers</h3>
        <p className="text-2xl font-bold">{jobSeekers.length}</p>
      </div>

      {/* Job Seeker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobSeekers.map(seeker => (
          <div key={seeker.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{seeker.name}</h3>
            <p className="text-gray-700"><strong>Email:</strong> {seeker.email}</p>
            {seeker.phone && <p className="text-gray-700"><strong>Phone:</strong> {seeker.phone}</p>}
            {seeker.age && <p className="text-gray-700"><strong>Age:</strong> {seeker.age}</p>}
            {seeker.gender && <p className="text-gray-700"><strong>Gender:</strong> {seeker.gender}</p>}
            {seeker.location && <p className="text-gray-700"><strong>Location:</strong> {seeker.location}</p>}
            {seeker.interests && <p className="text-gray-700"><strong>Interests:</strong> {seeker.interests}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSeekerRegistrations;
