import React from "react";

const Widget = () => {
    return (
        <div className="bg-background text-primary-foreground min-h-screen flex items-center justify-center">
            <div className="bg-card p-8 rounded-lg shadow-lg w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Total Number of Registrations</h2>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {[
                        { month: "January", count: 150 },
                        { month: "February", count: 200 },
                        { month: "March", count: 180 },
                        { month: "April", count: 220 },
                        { month: "May", count: 250 }
                    ].map(({ month, count }) => (
                        <div key={month} className="flex items-center justify-between mb-4">
                            <p className="text-lg">{month}</p>
                            <p className="text-lg font-bold">{count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Widget;
