 
import React, { useState, useRef } from 'react';
import { Button } from '../Common/Button';
import { useCartStore } from '../../store/cartStore';
import { useAnalytics } from '../../hooks/useAnalytics';
import { PosterPreview } from './PosterPreview';
import { toast } from 'react-hot-toast';
import './PosterBuilder.css';

export const PosterBuilder = () => {
  const fileInputRef = useRef(null);
  const { addToCart } = useCartStore();
  const { trackEvent } = useAnalytics();

  const [posterData, setPosterData] = useState({
    text: '',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    fontSize: 48,
    backgroundImage: null
  });

  const handleTextChange = (e) => {
    setPosterData((prev) => ({
      ...prev,
      text: e.target.value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPosterData((prev) => ({
          ...prev,
          backgroundImage: event.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customPoster = {
      id: `custom-${Date.now()}`,
      title: posterData.text || 'Custom Poster',
      price: 299,
      emoji: '🖼️',
      category: 'Personalized',
      rating: 5,
      popularity: 0,
      isCustom: true,
      customData: posterData
    };

    addToCart(customPoster);
    toast.success('✅ Постер добавлен в корзину!');
    trackEvent('add_custom_poster_to_cart');
  };

  return (
    <section className="poster-builder">
      <h2>🎨 Создай свой постер</h2>

      <div className="builder-container">
        <div className="builder-controls">
          <div className="control-group">
            <label>Текст</label>
            <textarea
              value={posterData.text}
              onChange={handleTextChange}
              placeholder="Введите текст для постера..."
              rows="4"
            />
          </div>

          <div className="control-group">
            <label>Размер шрифта</label>
            <input
              type="range"
              min="24"
              max="96"
              step="4"
              value={posterData.fontSize}
              onChange={(e) => setPosterData((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
            />
            <span className="size-display">{posterData.fontSize}px</span>
          </div>

          <div className="control-group">
            <label>Цвет фона</label>
            <input
              type="color"
              value={posterData.backgroundColor}
              onChange={(e) => setPosterData((prev) => ({ ...prev, backgroundColor: e.target.value }))}
            />
          </div>

          <div className="control-group">
            <label>Цвет текста</label>
            <input
              type="color"
              value={posterData.textColor}
              onChange={(e) => setPosterData((prev) => ({ ...prev, textColor: e.target.value }))}
            />
          </div>

          <div className="control-group">
            <label>Загрузить фон</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="upload-btn"
            >
              📤 Выбрать изображение
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>

          <Button
            variant="primary"
            onClick={handleAddToCart}
            style={{ width: '100%', marginTop: '20px' }}
          >
            Добавить в корзину (299₽)
          </Button>
        </div>

        <div className="builder-preview">
          <PosterPreview data={posterData} />
        </div>
      </div>
    </section>
  );
};