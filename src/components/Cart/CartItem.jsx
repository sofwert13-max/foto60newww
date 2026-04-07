 
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatting';
import './CartItem.css';

export const CartItem = ({ item, currency }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p className="cart-item-price">{formatPrice(item.price, currency)}</p>
      </div>

      <div className="cart-item-controls">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="qty-btn"
        >
          <Minus size={14} />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
          className="qty-input"
        />
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="qty-btn"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="cart-item-total">
        {formatPrice(item.price * item.quantity, currency)}
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className="remove-btn"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};