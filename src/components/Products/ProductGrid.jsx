import React, { useMemo } from 'react';
import { useProductStore } from '../../store/productStore';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ onQuickView, currency }) => {
  const { getFilteredProducts } = useProductStore();
  const products = useMemo(() => getFilteredProducts(), [getFilteredProducts]);

  if (products.length === 0) {
    return (
      <div className="no-results">
        <p>Ничего не найдено. Измените параметры поиска.</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          currency={currency}
        />
      ))}
    </div>
  );
};