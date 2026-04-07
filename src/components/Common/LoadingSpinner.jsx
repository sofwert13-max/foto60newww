import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export const Skeleton = ({ width = '100%', height = '20px', count = 1 }) => {
  return (
    <div className="skeleton-container">
      {Array(count).fill(null).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ width, height, marginBottom: '10px' }}
        />
      ))}
    </div>
  );
};