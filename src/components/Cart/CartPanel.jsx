 
import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../utils/formatting';
import { CartItem } from './CartItem';
import { Button } from '../Common/Button';
import './CartPanel.css';

export const CartPanel = ({ isOpen, onClose, currency, onCheckout }) => {
  const { items, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  if (!isOpen) return null;

  return (
    <aside className="cart-panel">
      <div className="cart-header">
        <h3>🛒 Корзина</h3>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Ваша корзина пуста</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItem key={item.id} item={item} currency={currency} />
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Всего:</span>
              <span className="total-price">{formatPrice(total, currency)}</span>
            </div>
            <Button
              variant="primary"
              onClick={onCheckout}
              style={{ width: '100%' }}
            >
              Оформить заказ
            </Button>
          </div>
        </>
      )}
    </aside>
  );
};