import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

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
      ]
    }
  ];

  useEffect(() => {
    if (location.pathname === "/Dashboard") {
      navigate("/Dashboard/job-posting");
    }
    const activeMenu = menuItems.find(menu =>
      menu.links.some(link => link.path === location.pathname)
    );
    if (activeMenu && !openMenus.includes(activeMenu.title)) {
      setOpenMenus([...openMenus, activeMenu.title]);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {isMobile && (
        <button
          className="lg:hidden p-3 fixed top-4 left-4 bg-black text-white rounded-lg z-50 shadow-md border border-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      )}

      {/* Sidebar */}
      {(!isMobile || isSidebarOpen) && (
        <>
          {/* Overlay for mobile */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <aside
            className={`fixed top-0 left-0 w-64 bg-gradient-to-b from-[#EA033F] to-[#140000] text-white p-4 h-full min-h-screen transition-transform duration-300 border-r border-blue-200 z-50 lg:z-auto ${isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"
              } lg:translate-x-0 lg:static`}
          >
            <div className="h-full flex flex-col">
              <div className="mb-8 p-2">
                <h2 className="text-xl font-semibold text-white">Dashboard</h2>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {menuItems.map((menu) => (
                  <div key={menu.title} className="mb-1">
                    <button
                      onClick={() => toggleMenu(menu.title)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${menu.links.some(link => isLinkActive(link.path))
                        ? "bg-blue-300/30 text-white"
                        : "hover:bg-blue-200/50"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{menu.icon}</span>
                        <span className="font-medium">{menu.title}</span>
                      </div>
                      {isMenuOpen(menu.title) ? (
                        <FiChevronDown className="text-white" />
                      ) : (
                        <FiChevronRight className="text-white" />
                      )}
                    </button>

                    <AnimatePresence>
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
                              onClick={() => {
                                navigate(link.path);
                                if (isMobile) setIsSidebarOpen(false);
                              }}
                              className={`w-full text-left p-2 pl-3 rounded-md transition-all flex items-center ${isLinkActive(link.path)
                                ? "bg-blue-400/20 text-white font-medium border-l-2 border-black"
                                : "hover:bg-blue-200/30 text-white"
                                }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-3 ${isLinkActive(link.path) ? "bg-black" : "bg-blue-400/50"
                                  }`}
                              />
                              {link.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;