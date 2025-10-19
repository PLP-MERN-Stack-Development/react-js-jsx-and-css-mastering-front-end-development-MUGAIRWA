import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that includes the Navbar and Footer
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content to be wrapped
 * @param {string} props.navbarTitle - Title for the navbar
 * @param {Array} props.navbarLinks - Links for the navbar
 * @param {string} props.footerCopyright - Copyright text for footer
 * @param {Array} props.footerLinks - Links for the footer
 * @param {string} props.className - Additional CSS classes for the layout
 * @returns {JSX.Element} - Layout component
 */
const Layout = ({
  children,
  navbarTitle,
  navbarLinks,
  footerCopyright,
  footerLinks,
  className = '',
  ...rest
}) => {
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col ${className}`} {...rest}>
      <Navbar title={navbarTitle} links={navbarLinks} />
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        {children}
      </main>
      <Footer copyright={footerCopyright} links={footerLinks} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navbarTitle: PropTypes.string,
  navbarLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  footerCopyright: PropTypes.string,
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

export default Layout;
