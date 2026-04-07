import React, { useCallback } from 'react';
import { Heart, Eye } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatPrice } from '../../utils/formatting';
import { Button } from '../Common/Button';
import './ProductCard.css';

export const ProductCard = React.memo(({
  product,
  onQuickView,
  currency
}) => {
  const { addToCart, isInCart } = useCartStore();
  const { favorites, toggleFavorite } = useUserStore();
  const { trackEvent } = useAnalytics();

  const isFavorited = favorites.some(fav => fav.id === product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = useCallback(() => {
    addToCart(product);
    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.title,
      price: product.price
    });
  }, [addToCart, product, trackEvent]);

  const handleFavorite = useCallback(() => {
    toggleFavorite(product);
    trackEvent(isFavorited ? 'remove_from_wishlist' : 'add_to_wishlist', {
      product_id: product.id,
      product_name: product.title
    });
  }, [toggleFavorite, product, isFavorited, trackEvent]);

  return (
    <article className={`product-card ${inCart ? 'in-cart' : ''}`}>
      <div className="product-image">
        <div className="product-emoji">{product.emoji}</div>
        {product.rating && (
          <div className="product-rating-badge">
            ★ {product.rating}
          </div>
        )}
        {inCart && <div className="in-cart-badge">✓ В корзине</div>}
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        {product.popularity && (
          <p className="product-meta">♥ {product.popularity}</p>
        )}

        <div className="product-price">
          {formatPrice(product.price, currency)}
        </div>

        <div className="product-actions">
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="add-to-cart-btn"
          >
            🛒 Купить
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFavorite}
            className={`favorite-btn ${isFavorited ? 'active' : ''}`}
          >
            {isFavorited ? '❤️' : '♡'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuickView(product)}
            className="quick-view-btn"
          >
            <Eye size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';