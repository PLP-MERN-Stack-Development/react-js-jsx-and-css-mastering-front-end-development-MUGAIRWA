import React, { useState, useEffect } from 'react';
import Button from './Button';

/**
 * APIData component for fetching and displaying data from JSONPlaceholder API
 */
const APIData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">API Data</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading posts...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">API Data</h2>
        <div className="text-center py-8">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">API Data - Posts</h2>

      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {currentPosts.length} of {filteredPosts.length} posts
        {searchTerm && ` (filtered from ${posts.length} total)`}
      </div>

      {/* Posts grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {currentPosts.map((post, index) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 dark:border-gray-700 dark:bg-gray-700 animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
              {post.body}
            </p>
            <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
              Post ID: {post.id} | User ID: {post.userId}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                // Show first page, last page, current page, and pages around current
                return page === 1 ||
                       page === totalPages ||
                       (page >= currentPage - 1 && page <= currentPage + 1);
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-gray-500">...</span>
                  )}
                  <Button
                    variant={currentPage === page ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                </React.Fragment>
              ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* No results */}
      {filteredPosts.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default APIData;
