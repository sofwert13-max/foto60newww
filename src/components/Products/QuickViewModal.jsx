 
import React from 'react';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { formatPrice } from '../../utils/formatting';
import './QuickViewModal.css';

export const QuickViewModal = ({ product, isOpen, onClose, currency }) => {
  const { addToCart } = useCartStore();
  const { favorites, toggleFavorite } = useUserStore();

  if (!product) return null;

  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Быстрый просмотр">
      <div className="quick-view-content">
        <div className="qv-image">{product.emoji}</div>
        <div className="qv-details">
          <h3>{product.title}</h3>
          <p className="qv-price">{formatPrice(product.price, currency)}</p>
          <p className="qv-rating">★ {product.rating} · ♥ {product.popularity}</p>
          <p className="qv-description">{product.description}</p>

          <div className="qv-actions">
            <Button
              variant="primary"
              size="md"
              onClick={handleAddToCart}
              style={{ flex: 1 }}
            >
              Добавить в корзину
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => toggleFavorite(product)}
            >
              {isFavorited ? '❤️ Убрать' : '♡ В избранное'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};