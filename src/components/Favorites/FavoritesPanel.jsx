 
import React from 'react';
import { useUserStore } from '../../store/userStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatPrice } from '../../utils/formatting';
import { Button } from '../Common/Button';
import { X } from 'lucide-react';
import './FavoritesPanel.css';

export const FavoritesPanel = ({ isOpen, onClose, currency }) => {
  const { favorites, removeFavorite } = useUserStore();
  const { trackEvent } = useAnalytics();

  const handleRemove = (productId) => {
    removeFavorite(productId);
    trackEvent('remove_from_wishlist', { product_id: productId });
  };

  if (!isOpen) return null;

  return (
    <aside className="favorites-panel">
      <div className="favorites-header">
        <h3>♡ Избранное ({favorites.length})</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>Список пуст. Выберите постеры.</p>
        </div>
      ) : (
        <div className="favorites-list">
          {favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <div className="favorite-info">
                <h4>{item.title}</h4>
                <p>{formatPrice(item.price, currency)}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="remove-favorite"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};