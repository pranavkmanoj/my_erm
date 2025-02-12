import { useState, useEffect } from "react";
import cover from "../images/cover_image.jpg";
import dp from "../images/Freston.jpg";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: "",
    email: "",
    description: "",
  });

  // Mock fetch (Replace with API call)
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const data = {
        name: "TechCorp Ltd.",
        email: "contact@techcorp.com",
        description: "A leading software company specializing in AI solutions.",
      };
      setCompany(data);
    };

    fetchCompanyDetails();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // Save profile changes (Replace with API call)
  const handleSave = () => {
    alert(`Company details updated: ${JSON.stringify(company)}`);
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center">
      <div className="w-full max-w-auto max-h-auto h-screen bg-white shadow-lg rounded-lg overflow-hidden ">
        {/* Cover Image */}
        <div className="relative h-60 bg-gray-300">
          <img
            src={cover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center p-6 relative -mt-16">
          <img
            src={dp}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
          <div className="ml-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800 pt-9">{company.name}</h2>
            <p className="text-gray-500">{company.email}</p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Edit Company Profile</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              value={company.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              value={company.email}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <textarea
              name="description"
              placeholder="Company Description"
              value={company.description}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
