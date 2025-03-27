import { Link, useLocation } from "@remix-run/react";
import { Company } from "Constant";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  Home,
  Mail,
  Menu,
  PhoneCall,
  User2,
  X,
} from "lucide-react";
import { useState } from "react";
import { ImWhatsapp } from "react-icons/im";
import "@fontsource/poppins";
// Replace the existing navItems array with this enhanced version that includes submenus
const navItems = [
  { name: "Home", url: "/" },
  {
    name: "Medical Centers",
    url: "/medical-centers",
  },
  {
    name: "Medical Report Check",
    url: "/medical-report-check-online",
  },
{
    name: "Blogs",
    url: "/blogs",
  },

  // {
  //   name: "Medical Centers",
  //   url: "#",
  //   submenu: [
  //     { name: "Gujranwala Center List", url: "/medical-centers/gujranwala" },
  //     { name: "Islamabad Center List", url: "/medical-centers/islamabad" },
  //     { name: "Karachi Center List", url: "/medical-centers/karachi" },
  //     { name: "Lahore Center List", url: "/medical-centers/lahore" },
  //   ],
  // },
  { name: "Contact", url: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [mobileActiveSubmenus, setMobileActiveSubmenus] = useState({});
  const location = useLocation();
  const isCurrent = (url: string) => {
    return location.pathname === url;
  };

  const toggleMobileSubmenu = (name) => {
    setMobileActiveSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex justify-around items-center h-12 bg-blue-700 text-white text-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-row justify-between items-center gap-2">
            <Mail />
            {Company.email}
          </div>
          <div className="flex justify-between items-center gap-2">
            <PhoneCall />
            {Company.whatsApp}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* Book Appointment Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Link to="/appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Book Appointment
              </motion.button>
            </Link>
          </motion.div>
          {/* whatsapp Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block"
          >
            <Link to={`https://wa.me/${Company.whatsApp}`} target="_blank">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Appointment On WhatsApp <span> <ImWhatsapp /></span>               
              </motion.button>
             
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      style={{
        fontFamily : "Poppins"
      }}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link to="/" className="flex items-center">
              <div className="flex justify-between items-center space-x-2">
                <div>
                  <img src={Company.logo} alt="Logo" className="h-14 w-auto" />
                </div>
                <div>
                  <h1 className="font-extrabold text-lg">{Company.name}</h1>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
                onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu("")}
              >
                <Link
                  to={item.url}
                  className={`text-gray-600 hover:text-primary font-medium transition-colors duration-300 relative group flex items-center`}
                >
                  {item.name}
                  {item.submenu && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1 transition-transform duration-200 ease-in-out"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{
                        transform:
                          activeSubmenu === item.name
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                  <span
                    className={`${
                      isCurrent(item.url) && "w-full"
                    } absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full`}
                  />
                </Link>
                {item.submenu && (
                  <DesktopSubmenu
                    items={item.submenu}
                    isOpen={activeSubmenu === item.name}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col">
                    <div
                      className="flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
                      onClick={() => {
                        if (item.submenu) {
                          toggleMobileSubmenu(item.name);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Link
                        to={item.url}
                        className="flex-grow"
                        onClick={(e) => {
                          if (item.submenu) {
                            e.preventDefault();
                          } else {
                            setIsOpen(false);
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <motion.div
                          animate={{
                            rotate: mobileActiveSubmenus[item.name] ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    {item.submenu && (
                      <MobileSubmenu
                        items={item.submenu}
                        isOpen={mobileActiveSubmenus[item.name]}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                className="mt-4 px-3 py-2"
              >
                <Link to="/appointment">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Appointment
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Add this new component for desktop submenu
function DesktopSubmenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <Link
                to={item.url}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Add this new component for mobile submenu
function MobileSubmenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="pl-4"
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
            >
              <Link
                to={item.url}
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
