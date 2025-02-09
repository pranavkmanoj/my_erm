import React from "react";
import { useNavigate } from "react-router-dom";
import img1 from '../Images/Freston.jpg';

export default function ApprovedCompany() {
    const navigate = useNavigate();

    const companies = [
        { id: 1, name: "Company 1 Name", industry: "Industry 1", logo: img1 },
        { id: 2, name: "Company 2 Name", industry: "Industry 2", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 4, name: "Company 4 Name", industry: "Industry 4", logo: img1 },
        { id: 5, name: "Company 5 Name", industry: "Industry 5", logo: img1 },
        { id: 6, name: "Company 6 Name", industry: "Industry 6", logo: img1 },
        { id: 7, name: "Company 7 Name", industry: "Industry 7", logo: img1 },
        { id: 8, name: "Company 8 Name", industry: "Industry 8", logo: img1 },
        { id: 9, name: "Company 9 Name", industry: "Industry 9", logo: img1 },
        { id: 10, name: "Company 10 Name", industry: "Industry 10", logo: img1 },
        { id: 11, name: "Company 11 Name", industry: "Industry 11", logo: img1 },
        { id: 12, name: "Company 12 Name", industry: "Industry 12", logo: img1 },
        { id: 13, name: "Company 13 Name", industry: "Industry 13", logo: img1 },
        { id: 14, name: "Company 14 Name", industry: "Industry 14", logo: img1 },
        { id: 15, name: "Company 15 Name", industry: "Industry 15", logo: img1 },
    ];

    const handleViewDetails = (id) => {
        navigate(`/company-details/${id}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
            {companies.map((company) => (
                <div
                    key={company.id}
                    className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                    <img
                        src={company.logo}
                        alt={`${company.name} Logo`}
                        className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-500"
                    />
                    <h2 className="text-xl font-semibold text-center">{company.name}</h2>
                    <p className="text-sm text-center text-gray-300">{company.industry}</p>
                    <div className="flex justify-center mt-4">
                        <a
                            href={`/company-details/${company.id}`}
                            className="bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-blue-500 transition duration-300 text-center"
                        >
                            View Details
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
