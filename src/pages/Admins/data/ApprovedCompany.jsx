import React from "react";
import img1 from '../Images/Freston.jpg'


export default function ApprovedCompany() {
    const companies = [
        { id: 1, name: "Company 1 Name", industry: "Industry 1", logo: img1 },
        { id: 2, name: "Company 2 Name", industry: "Industry 2", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 1, name: "Company 1 Name", industry: "Industry 1", logo: img1 },
        { id: 2, name: "Company 2 Name", industry: "Industry 2", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 1, name: "Company 1 Name", industry: "Industry 1", logo: img1 },
        { id: 2, name: "Company 2 Name", industry: "Industry 2", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
        { id: 3, name: "Company 3 Name", industry: "Industry 3", logo: img1 },
    ];

    return (
        <div className="flex flex-wrap justify-center">
            {companies.map((company) => (
                <div 
                    key={company.id} 
                    className="bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-4 rounded-lg shadow-md m-4"
                    style={{ maxWidth: "300px" }}
                >
                    <img 
                        src={company.logo} 
                        alt={`${company.name} Logo`} 
                        className="w-16 h-16 rounded-full mx-auto mb-4" 
                    />
                    <h2 className="text-lg font-semibold text-center">{company.name}</h2>
                    <p className="text-sm text-center text-muted-foreground">{company.industry}</p>
                    <div className="flex justify-center mt-4">
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
