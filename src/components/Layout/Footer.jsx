 
import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>foto60</h4>
            <p>Минималистичный магазин премиальных постеров</p>
          </div>

          <div className="footer-section">
            <h4>Навигация</h4>
            <ul>
              <li><a href="#/">Главная</a></li>
              <li><a href="#/favorites">Избранное</a></li>
              <li><a href="#/cart">Корзина</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Контакты</h4>
            <ul>
              <li><a href="mailto:info@foto60.ru">info@foto60.ru</a></li>
              <li><a href="tel:+79999999999">+7 (999) 999-99-99</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Социальные сети</h4>
            <div className="social-links">
              <a href="#/" aria-label="Instagram">📱</a>
              <a href="#/" aria-label="Telegram">✈️</a>
              <a href="#/" aria-label="Facebook">👍</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 foto60. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};