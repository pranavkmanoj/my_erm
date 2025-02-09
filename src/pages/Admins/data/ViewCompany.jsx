import { useState } from "react";

const ViewCompany = () => {
  const [companies, setCompanies] = useState([
    { id: 1, name: "TechCorp", industry: "Software", location: "New York", phone: "123-456-7890", email: "contact@techcorp.com", registrationDate: "2024-01-15", status: "Pending" },
    { id: 2, name: "BizSolutions", industry: "Finance", location: "San Francisco", phone: "987-654-3210", email: "info@bizsolutions.com", registrationDate: "2024-02-01", status: "Approved" },
    { id: 3, name: "GreenEnergy", industry: "Renewable Energy", location: "Chicago", phone: "555-123-4567", email: "support@greenenergy.com", registrationDate: "2024-03-10", status: "Pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    setCompanies(companies.map(company => 
      company.id === id ? { ...company, status: newStatus } : company
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Company Registration List</h2>
      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        {companies.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Company ID</th>
                <th className="p-2 border">Company Name</th>
                <th className="p-2 border">Industry</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Registration Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-100">
                  <td className="p-2 border">{company.id}</td>
                  <td className="p-2 border">{company.name}</td>
                  <td className="p-2 border">{company.industry}</td>
                  <td className="p-2 border">{company.location}</td>
                  <td className="p-2 border">{company.phone}</td>
                  <td className="p-2 border">{company.email}</td>
                  <td className="p-2 border">{company.registrationDate}</td>
                  <td className="p-2 border font-bold">{company.status}</td>
                  <td className="p-2 border">
                    <button 
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => updateStatus(company.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => updateStatus(company.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No registered companies available</p>
        )}
      </div>
    </div>
  );
};

export default ViewCompany;
