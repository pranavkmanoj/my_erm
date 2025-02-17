import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

export default function JobListing() {
    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h2 className="text-xl font-semibold">Software Developer</h2>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                        <span className="text-blue-500">Tech Solutions Inc.</span>
                        <FaStar className="text-yellow-500 mx-1" />
                        <span>4.5</span>
                        <FaMapMarkerAlt className="ml-2" />
                        <span>Bangalore, India</span>
                    </div>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Apply now</button>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Job details</h3>
                <div className="mt-2">
                    <p className="text-gray-700"><strong>Pay:</strong> ₹50,000 - ₹80,000 a month</p>
                    <p className="text-gray-700"><strong>Job type:</strong> Full-time</p>
                    <p className="text-gray-700"><strong>Work mode:</strong></p>
                    <div className="flex gap-2 mt-1">
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Remote</span>
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">Hybrid</span>
                        <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded">On-site</span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Location</h3>
                <p className="text-gray-700 flex items-center"><FaMapMarkerAlt className="mr-1" /> Bangalore, India</p>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Benefits</h3>
                <p className="text-gray-700">• Health insurance</p>
                <p className="text-gray-700">• Flexible work hours</p>
                <p className="text-gray-700">• Work from home options</p>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Full job description</h3>
                <p className="text-gray-700 mt-2">
                    We are looking for an experienced Software Developer to join our dynamic team.
                    You will be responsible for developing high-quality applications and collaborating
                    with cross-functional teams to define, design, and ship new features.
                    Experience in full-stack development is preferred. Apply now to be a part of our growing tech family!
                </p>
            </div>
        </div>
    );
}