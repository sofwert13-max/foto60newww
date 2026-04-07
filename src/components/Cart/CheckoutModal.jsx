import React, { useState } from 'react';
import { Modal } from '../Common/Modal';
import { Button } from '../Common/Button';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { formatPrice } from '../../utils/formatting';
import { toast } from 'react-hot-toast';
import './CheckoutModal.css';

export const CheckoutModal = ({ isOpen, onClose, currency }) => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useUserStore();
  const { trackEvent } = useAnalytics();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = getTotalPrice();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const order = {
        id: Date.now(),
        customer: formData,
        items: items,
        total: total,
        currency: currency,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      addOrder(order);
      
      trackEvent('purchase', {
        transaction_id: order.id,
        value: total,
        currency: currency,
        items: items.map(item => ({
          id: item.id,
          name: item.title,
          quantity: item.quantity,
          price: item.price
        }))
      });

      toast.success('✅ Заказ успешно оформлен!');
      clearCart();
      onClose();
      setFormData({ fullName: '', email: '', phone: '', address: '', city: '' });
    } catch (error) {
      toast.error('Ошибка при оформлении заказа');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="💳 Оформление заказа" maxWidth="500px">
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="fullName">Полное имя</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Иван Петров"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ivan@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+7 (999) 999-99-99"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Адрес доставки</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="ул. Примера, д. 1, кв. 1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">Город</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Москва"
            required
          />
        </div>

        <div className="checkout-summary">
          <div className="summary-row">
            <span>Товаров:</span>
            <strong>{items.length}</strong>
          </div>
          <div className="summary-row">
            <span>Количество:</span>
            <strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
          </div>
          <div className="summary-row total">
            <span>Всего к оплате:</span>
            <strong>{formatPrice(total, currency)}</strong>
          </div>
          <p className="shipping-info">Доставка: Бесплатная</p>
        </div>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Обработка...' : 'Подтвердить заказ'}
        </Button>
      </form>
    </Modal>
  );
};