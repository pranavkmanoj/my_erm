import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const ViewInterviews = () => {
    // Dummy data for UI preview (Assuming one employee with multiple interviews)
    const interviews = [
        {
            id: 1,
            candidate: "Tom",
            jobTitle: "Software Engineer",
            date: "2025-02-15",
            time: "10:00 AM",
            status: "Scheduled",
        },

        {
            id: 1,
            candidate: "Tom",
            jobTitle: "Software Engineer",
            date: "2025-02-15",
            time: "10:00 AM",
            status: "Scheduled",
        },
        {
            id: 2,
            candidate: "Tony doe",
            jobTitle: "UI/UX Designer",
            date: "2025-02-17",
            time: "2:00 PM",
            status: "Completed",
        },
        {
            id: 1,
            candidate: "Tom",
            jobTitle: "Software Engineer",
            date: "2025-02-15",
            time: "10:00 AM",
            status: "Scheduled",
        },
        {
            id: 2,
            candidate: "Tony doe",
            jobTitle: "UI/UX Designer",
            date: "2025-02-17",
            time: "2:00 PM",
            status: "Completed",
        },
        {
            id: 2,
            candidate: "Tony doe",
            jobTitle: "UI/UX Designer",
            date: "2025-02-17",
            time: "2:00 PM",
            status: "Completed",
        },
        {
            id: 3,
            candidate: "Smith",
            jobTitle: "Data Scientist",
            date: "2025-02-20",
            time: "11:30 AM",
            status: "Pending",
        },
        {
            id: 3,
            candidate: "Smith",
            jobTitle: "Data Scientist",
            date: "2025-02-20",
            time: "11:30 AM",
            status: "Pending",
        },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <h2 className="text-3xl font-bold mb-6 text-center p-20">My Scheduled Interviews</h2>

            {interviews.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {interviews.map((interview) => (
                        <div key={interview.id} className="bg-white shadow-lg rounded-lg p-6 w-96">
                            <h3 className="text-xl font-semibold text-gray-800">{interview.jobTitle}</h3>
                            <p className="text-gray-600 mt-2">Date: <span className="font-medium">{interview.date}</span></p>
                            <p className="text-gray-600">Time: <span className="font-medium">{interview.time}</span></p>
                            <div
                                className={`mt-4 px-4 py-2 rounded-full text-center text-white font-semibold ${interview.status === "Scheduled"
                                    ? "bg-blue-500"
                                    : interview.status === "Completed"
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }`}
                            >
                                {interview.status}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center">No scheduled interviews.</p>
            )}
            <Footer />
        </div>
    );
};

export default ViewInterviews;
