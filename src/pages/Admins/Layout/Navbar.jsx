import img from "../../../assets/logo.jpg";
import Profile from "../data/AdminProfile"; 


const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold flex items-center">
        <img src={img} alt="Logo" className="h-8 w-8 mr-2" />
        ERM
      </div>
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341A6.002 6.002 0 006 11v3c0 .386-.149.752-.405 1.045L4 17h5m6 0a3 3 0 11-6 0"
            ></path>
          </svg>
          <span>Notification</span>
        </div>

        {/* Profile */}
        <Profile />
      </div>
    </header>
  );
};

export default Navbar;
