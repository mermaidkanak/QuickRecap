import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="py-4 px-6 md:px-12 flex justify-between items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <motion.div 
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="mr-3"
        >
          <img 
            src="/logo.svg" 
            alt="QuickRecap Logo" 
            className="h-10 w-10" 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHJ4PSIyMCIgZmlsbD0iI2UxM2M3MyIvPjxwYXRoIGQ9Ik0xNSAyOFYxMkwyOSAyMEwxNSAyOFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+";
            }}
          />
        </motion.div>
        <h1 className="text-xl md:text-2xl font-display font-bold bg-gradient-to-r from-primary-500 to-pastel-lavender bg-clip-text text-transparent">
          QuickRecap
        </h1>
      </motion.div>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-white dark:bg-dark-card shadow-soft"
        aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5 text-pastel-yellow" />
        ) : (
          <MoonIcon className="h-5 w-5 text-pastel-lavender" />
        )}
      </motion.button>
    </header>
  );
};

export default Header; 