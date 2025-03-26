import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: "Job Posting",
      icon: "📋",
      links: [
        { name: "Post Job", path: "/Dashboard/job-posting" },
        { name: "Status", path: "/Dashboard/job-view" },
        { name: "Edit Job", path: "/Dashboard/edit-job" }
      ]
    },
    {
      title: "Applications",
      icon: "📄",
      links: [
        { name: "View Applications", path: "/Dashboard/view-application" },
        { name: "Shortlisted", path: "/Dashboard/shortlisted-candidates" }
      ]
    },
    {
      title: "Interviews",
      icon: "🎯",
      links: [
        { name: "Schedule", path: "/Dashboard/schedule-interviews" },
        // { name: "Feedback", path: "/Dashboard/manage-feedback" }
      ]
    },
    {
      title: "Settings",
      icon: "⚙️",
      links: [
        { name: "Company Profile", path: "/Dashboard/company-profile" },
        { name: "Account", path: "/Dashboard/account-settings" }
      ]
    }
  ];

  useEffect(() => {
    // On initial load, if path is /Dashboard, redirect to job-posting
    if (location.pathname === "/Dashboard") {
      navigate("/Dashboard/job-posting");
    }
    
    // Auto-open parent menu if child is active
    const activeMenu = menuItems.find(menu => 
      menu.links.some(link => link.path === location.pathname)
    );
    if (activeMenu && !openMenus.includes(activeMenu.title)) {
      setOpenMenus([...openMenus, activeMenu.title]);
    }
  }, [location.pathname]);

  const toggleMenu = (menuTitle) => {
    setOpenMenus(prev => 
      prev.includes(menuTitle) 
        ? prev.filter(m => m !== menuTitle) 
        : [...prev, menuTitle]
    );
  };

  const isMenuOpen = (menuTitle) => openMenus.includes(menuTitle);
  const isLinkActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden p-3 fixed top-4 left-4 bg-white text-blue-600 rounded-lg z-50 shadow-md border border-blue-100"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-gradient-to-b from-blue-100 to-blue-200 text-gray-800 p-4 h-full min-h-screen transition-transform duration-300 border-r border-blue-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="h-full flex flex-col">
          <div className="mb-8 p-2">
            <h2 className="text-xl font-semibold text-blue-800">Dashboard</h2>
          </div>
          
          <nav className="flex-1 space-y-1">
            {menuItems.map((menu) => (
              <div key={menu.title} className="mb-1">
                <button
                  onClick={() => toggleMenu(menu.title)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    menu.links.some(link => isLinkActive(link.path)) 
                      ? "bg-blue-300/30 text-blue-800" 
                      : "hover:bg-blue-200/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{menu.icon}</span>
                    <span className="font-medium">{menu.title}</span>
                  </div>
                  {isMenuOpen(menu.title) ? (
                    <FiChevronDown className="text-blue-600" />
                  ) : (
                    <FiChevronRight className="text-blue-600" />
                  )}
                </button>

                {isMenuOpen(menu.title) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-10 space-y-1 mt-1"
                  >
                    {menu.links.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        className={`w-full text-left p-2 pl-3 rounded-md transition-all flex items-center ${
                          isLinkActive(link.path)
                            ? "bg-blue-400/20 text-blue-800 font-medium border-l-2 border-blue-500"
                            : "hover:bg-blue-200/30 text-gray-700"
                        }`}
                      >
                        <span 
                          className={`w-1.5 h-1.5 rounded-full mr-3 ${
                            isLinkActive(link.path) ? "bg-blue-600" : "bg-blue-400/50"
                          }`}
                        />
                        {link.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-auto p-3 border-t border-blue-200/50">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-200/30 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-300/40 flex items-center justify-center text-blue-700">
                <span className="text-sm">👤</span>
              </div>
              <span className="text-sm font-medium text-blue-800">User Account</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 