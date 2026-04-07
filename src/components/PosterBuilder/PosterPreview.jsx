import React from 'react';
import './PosterPreview.css';

export const PosterPreview = ({ data }) => {
  return (
    <div
      className="poster-preview"
      style={{
        backgroundColor: data.backgroundColor,
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="poster-text"
        style={{
          color: data.textColor,
          fontSize: `${data.fontSize}px`
        }}
      >
        {data.text || 'Ваш текст здесь'}
      </div>
    </div>
  );
};