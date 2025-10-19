import React from 'react';
import PropTypes from 'prop-types';

/**
 * Footer component with links and copyright information
 * @param {Object} props - Component props
 * @param {string} props.copyright - Copyright text
 * @param {Array} props.links - Array of footer links
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Footer component
 */
const Footer = ({
  copyright = `© ${new Date().getFullYear()} PLP Task Manager. All rights reserved.`,
  links = [],
  className = '',
  ...rest
}) => {
  return (
    <footer className={`bg-white dark:bg-gray-800 shadow mt-auto ${className}`} {...rest}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            {copyright}
          </p>
          <nav className="flex space-x-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  copyright: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Footer;
