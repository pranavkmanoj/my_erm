import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Rec-Navbar";
import Footer from "./Layout/Rec-Footer";
import "../../App.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const UserPanel1 = () => {
    const navigate = useNavigate();

    const quotes = [
        {
            quote: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            quote: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            quote: "Believe you can and you're halfway there.",
            author: "Theodore Roosevelt"
        },
        // Add more quotes here
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 py-20 lg:py-32">
                <div className="flex flex-col items-center justify-center flex-grow p-6 text-center">
                    <main className="w-full max-w-2xl">
                        <h1 className="text-4xl font-bold mt-6 wave-heading">
                            Bridging Talent with Opportunity
                        </h1>

                        <p className="text-lg text-gray-600 mt-4">
                            "The right talent isn’t just found—it’s connected. A great hiring platform bridges skill with opportunity, making recruitment seamless and impactful."
                        </p>

                        <div className="mt-6 flex gap-4 justify-center">
                            <button
                                className="px-6 py-3 bg-blue-600 text-black font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-white hover:scale-105"
                                onClick={() => navigate("/ulogin")}
                            >
                                Create Your Profile
                            </button>
                            <button
                                className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
                                onClick={() => navigate("/Dashboard")}
                            >
                                DashBoard
                            </button>
                        </div>
                    </main>
                </div>
            </div>

            <div className="bg-white py-20 lg:py-32">
                <div className="container mx-auto px-4 lg:px-6">
                    <Carousel
                        showArrows={true}
                        showStatus={false}
                        showIndicators={true}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={5000} // Adjust interval as needed
                    >
                        {quotes.map((quote, index) => (
                            <div key={index} className="flex flex-col items-center justify-center h-full"> {/* Added h-full */}
                                <div className="text-center"> {/* Centered content */}
                                    <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                                        "{quote.quote}"
                                    </p>
                                    <p className="text-lg text-gray-600">
                                        - {quote.author}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserPanel1;