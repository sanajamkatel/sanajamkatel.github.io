import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const location = useLocation();

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.projects-dropdown')) {
        setIsProjectsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add delay before closing dropdown on mouse leave
  const [closeTimeout, setCloseTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsProjectsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProjectsDropdownOpen(false);
    }, 150); // 150ms delay
    setCloseTimeout(timeout);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects', hasDropdown: true },
    { name: 'Interests', path: '/interests' },
    { name: 'Contact', path: '/contact' },
  ];

  const projectDropdownItems = [
    { name: 'Main Projects', path: '/projects' },
    { name: 'Fun Projects', path: '/fun-projects', external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer -ml-10"
          >
            <Link to="/">
              <img 
                src="/avacado.png" 
                alt="Sana Portfolio Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="projects-dropdown relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                      className="text-gray-700 hover:text-primary transition-colors duration-300 font-medium flex items-center space-x-1"
                    >
                      <span>{item.name}</span>
                      <ChevronDown size={16} />
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    {isProjectsDropdownOpen && (
                      <>
                        {/* Invisible bridge to prevent dropdown from closing */}
                        <div className="absolute top-full left-0 w-48 h-1 bg-transparent"></div>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                        >
                        {projectDropdownItems.map((dropdownItem) => (
                          dropdownItem.external ? (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {dropdownItem.name}
                            </a>
                          ) : (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
                              onClick={() => setIsProjectsDropdownOpen(false)}
                            >
                              {dropdownItem.name}
                            </Link>
                          )
                        ))}
                        </motion.div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link to={item.path}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`transition-colors duration-300 font-medium ${
                        location.pathname === item.path
                          ? 'text-primary'
                          : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
                        className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300 flex items-center justify-between"
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className={`transform transition-transform ${isProjectsDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isProjectsDropdownOpen && (
                        <div className="ml-4 space-y-1">
                          {projectDropdownItems.map((dropdownItem) => (
                            dropdownItem.external ? (
                              <a
                                key={dropdownItem.name}
                                href={dropdownItem.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300 text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {dropdownItem.name}
                              </a>
                            ) : (
                              <Link
                                key={dropdownItem.name}
                                to={dropdownItem.path}
                                className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300 text-sm"
                                onClick={() => setIsOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 