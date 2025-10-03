import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <span className="loading-text">Loading products...</span>
    </div>
  );
};

export default LoadingSpinner;