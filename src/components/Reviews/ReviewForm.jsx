 
import React, { useState } from 'react';
import { useReviewStore } from '../../store/reviewStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Button } from '../Common/Button';
import { toast } from 'react-hot-toast';
import './ReviewForm.css';

export const ReviewForm = () => {
  const { addReview } = useReviewStore();
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    text: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.rating || !formData.text) {
      toast.error('Пожалуйста, заполните все поля');
      return;
    }

    addReview(formData);
    toast.success('✅ Спасибо за отзыв!');
    trackEvent('submit_review', {
      rating: formData.rating
    });

    setFormData({ name: '', rating: 0, text: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3>Оставить отзыв</h3>

      <div className="form-group">
        <label htmlFor="reviewName">Ваше имя</label>
        <input
          type="text"
          id="reviewName"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Иван Петров"
        />
      </div>

      <div className="form-group">
        <label>Оценка</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`star-btn ${formData.rating >= star ? 'active' : ''}`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="reviewText">Ваш отзыв</label>
        <textarea
          id="reviewText"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Поделитесь вашим мнением..."
          rows="4"
        />
      </div>

      <Button variant="primary" type="submit" style={{ width: '100%' }}>
        Отправить отзыв
      </Button>
    </form>
  );
};