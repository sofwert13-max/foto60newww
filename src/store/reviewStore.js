import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useReviewStore = create(
  devtools(
    persist(
      (set, get) => ({
        reviews: [],

        addReview: (review) => {
          set({
            reviews: [...get().reviews, { ...review, id: Date.now(), timestamp: new Date() }],
          });
        },

        getAverageRating: () => {
          const { reviews } = get();
          if (reviews.length === 0) return 4.7;
          const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
          return (sum / reviews.length).toFixed(1);
        },

        getReviews: () => {
          return get().reviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        },
      }),
      { name: "review-store" }
    )
  )
);