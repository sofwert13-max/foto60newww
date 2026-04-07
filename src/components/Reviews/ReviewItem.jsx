import React from 'react';
import './ReviewItem.css';

export const ReviewItem = ({ review }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-author">{review.name}</span>
        <span className="review-rating">
          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
        </span>
      </div>
      <p className="review-date">{formatDate(review.timestamp)}</p>
      <p className="review-text">{review.text}</p>
    </div>
  );
};