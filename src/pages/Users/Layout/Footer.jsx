import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/logo.webp"; // Make sure the path matches your project

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start">

        {/* Left Side: Social Media + Copyright */}
        <div className="flex flex-col space-y-6 w-full md:w-2/3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm font-medium">

            {/* LinkedIn */}
            <div className="flex flex-col w-full">
              <hr className="w-full border-gray-600 mb-2" />
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center hover:text-blue-400 transition-colors duration-300"
              >
                <span>LinkedIn</span>
                <FaLinkedinIn size={20} />
              </a>
            </div>

            {/* Facebook */}
            <div className="flex flex-col w-full">
              <hr className="w-full border-gray-600 mb-2" />
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center hover:text-blue-600 transition-colors duration-300"
              >
                <span>Facebook</span>
                <FaFacebookF size={20} />
              </a>
            </div>

            {/* Instagram */}
            <div className="flex flex-col w-full">
              <hr className="w-full border-gray-600 mb-2" />
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center hover:text-pink-500 transition-colors duration-300"
              >
                <span>Instagram</span>
                <FaInstagram size={20} />
              </a>
            </div>

            {/* YouTube */}
            <div className="flex flex-col w-full">
              <hr className="w-full border-gray-600 mb-2" />
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center hover:text-red-500 transition-colors duration-300"
              >
                <span>YouTube</span>
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 mt-6">© 2025 Core Cognitics. All rights reserved.</p>
        </div>

        {/* Right Side: Logo */}
        <div className="mt-10 md:mt-0">
          <img src={logo} alt="Core Cognitics Logo" className="h-16 object-contain" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

