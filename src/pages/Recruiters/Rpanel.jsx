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
            quote: "Time spent on hiring is time well spent.",
            author: "Robert Half"
        },
        {
            quote: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            quote: "Great vision without great people is irrelevant.",
            author: "Jim Collins"
        },
        {
            quote: "Acquiring the right talent is the most important key to growth. Hiring was — and still is — the most important thing we do.",
            author: "Marc Benioff"
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            {/* Main content with padding to avoid navbar overlap */}
            <main className="flex-1 pt-16">
                {/* Hero Section */}
                <div className="flex flex-col bg-gradient-to-b from-[#EA033F] to-[#140000] py-16 lg:py-24 text-center">
                    <div className="w-full max-w-3xl mx-auto px-6">
                        <h1 className="text-4xl sm:text-5xl font-bold text-[#f7f7f7] leading-tight wave-heading whitespace-nowrap">
                            Bridging Talent with Opportunity
                        </h1>

                        <p className="text-md sm:text-lg text-[#f7f7f7] mt-4">
                            The right talent isn’t just found—it’s connected.
                            A great hiring platform bridges skill with opportunity, making recruitment seamless and impactful.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <button
                                className="w-full sm:w-auto px-6 py-3 bg-[#EA033F] text-[#f7f7f7] font-semibold rounded-lg shadow-md hover:bg-[#FB5607] transition-colors"
                                onClick={() => navigate("/ulogin")}
                            >
                                Create Your Profile
                            </button>
                            <button
                                className="w-full sm:w-auto px-6 py-3 bg-[#f7f7f7] text-[#140000] font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                                onClick={() => navigate("/Dashboard")}
                            >
                                DashBoard
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-black py-20 lg:py-32">
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
                                        <p className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                            "{quote.quote}"
                                        </p>
                                        <p className="text-lg text-white">
                                            - {quote.author}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default UserPanel1;