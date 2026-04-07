import React, { useMemo } from 'react';
import { useReviewStore } from '../../store/reviewStore';
import { ReviewForm } from './ReviewForm';
import { ReviewItem } from './ReviewItem';
import './ReviewSection.css';

export const ReviewSection = () => {
  const { reviews, getAverageRating } = useReviewStore();
  const avgRating = useMemo(() => getAverageRating(), [getAverageRating]);
  const sortedReviews = useMemo(
    () => reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
    [reviews]
  );

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h2>Отзывы покупателей</h2>
        <div className="avg-rating">
          <div className="rating-number">{avgRating}</div>
          <div className="rating-stars">
            {'★'.repeat(Math.round(avgRating))}
            {'☆'.repeat(5 - Math.round(avgRating))}
          </div>
        </div>
      </div>

      <ReviewForm />

      <div className="reviews-list">
        {sortedReviews.length === 0 ? (
          <p className="no-reviews">Еще нет отзывов. Будьте первым!</p>
        ) : (
          sortedReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        )}
      </div>
    </section>
  );
};