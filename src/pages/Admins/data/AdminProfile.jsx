import { useState } from "react";
import img from "../../../assets/Admin_logo.jpg"; 

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-md"
        >
          <img
            alt="User Profile"
            src={img}
            className="h-10 w-10 rounded-full object-cover" 
          />
          <div className="flex flex-col items-start">
            <span className="text-zinc-800 font-medium">Pranav K Manoj</span>
            <span className="text-green-500 text-xs">• Admin</span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              My Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              Settings
            </a>
            <a
              href="#"
              className=" px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 flex justify-between items-center"
            >
              <span>Billing</span>
              <span className="bg-red-500 text-white rounded-full px-2 text-xs">4</span>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
            >
              FAQ
            </a>
          </div>
          <div className="border-t border-zinc-200">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
