import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show navbar on landing page
  

  const years = [
    { id: 1, name: '1st Year' },
    { id: 2, name: '2nd Year' },
    { id: 3, name: '3rd Year' },
    { id: 4, name: '4th Year' },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10 },
    open: { opacity: 1, scale: 1, y: 0 }
  };
  //bg-indigo-900/95 backdrop-blur-sm

  return ( 
    <nav className="  text-white shadow-lg sticky top-0 z-50">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:text-blue-300 transition-colors duration-300">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Rocket className="h-8 w-8" />
              </motion.div>
              <span className="text-xl font-bold">AeroStudy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {years.map((year) => (
              <motion.div
                key={year.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/year/${year.id}`}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors duration-300"
                >
                  {year.name}
                </Link>
              </motion.div>
            ))}
            {isAuthenticated && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/bookmarks" className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-800">
                    <Bookmark className="h-4 w-4" />
                    <span>Bookmarks</span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-indigo-800 transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-indigo-900/95 backdrop-blur-sm"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {years.map((year) => (
                <motion.div
                  key={year.id}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={`/year/${year.id}`}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {year.name}
                  </Link>
                </motion.div>
              ))}
              {isAuthenticated && (
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/bookmarks"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bookmark className="h-5 w-5" />
                    <span>Bookmarks</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;