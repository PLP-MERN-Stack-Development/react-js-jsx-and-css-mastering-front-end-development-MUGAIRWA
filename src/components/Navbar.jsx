import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

/**
 * Navbar component for site navigation
 * @param {Object} props - Component props
 * @param {string} props.title - Site title
 * @param {Array} props.links - Array of navigation links
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Navbar component
 */
const Navbar = ({ title = 'PLP Task Manager', links = [], className = '', ...rest }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`bg-white dark:bg-gray-800 shadow ${className}`} {...rest}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Navbar;
