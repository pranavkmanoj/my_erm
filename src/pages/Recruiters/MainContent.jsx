import { useState } from "react";
import { Menu, User } from "lucide-react";
import logo from "../../assets/logo.jpg";

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState("Home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const sections = [
    { title: "Job Posting", subtitles: ["Post Jobs", "Status", "Reports"] },
    { title: "Users", subtitles: ["List", "Add User", "Roles"] },
    // { title: "Settings", subtitles: ["Profile", "Security", "Preferences"] },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white h-full p-4 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"
          } shadow-lg`}
      >
        <button
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            setIsContentVisible(!isContentVisible);
          }}
          className="mb-4 p-2 rounded bg-gray-200"
        >
          <Menu size={24} />
        </button>
        {isContentVisible && (
          <ul>
            {sections.map((section, index) => (
              <li key={index} className="mb-4">
                <h3 className="font-semibold">{section.title}</h3>
                <ul className="ml-4 mt-2">
                  {section.subtitles.map((subtitle, subIndex) => (
                    <li
                      key={subIndex}
                      className={`cursor-pointer p-2 rounded hover:bg-gray-300 ${activeContent === subtitle ? "bg-gray-300" : ""
                        }`}
                      onClick={() => setActiveContent(subtitle)}
                    >
                      {subtitle}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-8 ml-2" alt="ERM Logo" />
            <span className="text-xl font-semibold">ERM</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={24} />
            <span>Profile</span>
          </div>
        </nav>
        {/* Content */}
        <div className="p-6">{activeContent}</div>
      </div>
    </div>
  );
};

export default Dashboard;
