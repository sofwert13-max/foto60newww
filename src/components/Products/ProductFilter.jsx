import React, { useCallback } from 'react';
import { useProductStore } from '../../store/productStore';
import { SORT_OPTIONS } from '../../utils/constants';
import './ProductFilter.css';

export const ProductFilter = () => {
  const { categories, activeCategory, setActiveCategory, setSortBy, sortBy } = useProductStore();

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, [setActiveCategory]);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, [setSortBy]);

  return (
    <div className="product-filter">
      <div className="filter-section">
        <h4>Категории</h4>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label htmlFor="sortSelect">Сортировка</label>
        <select
          id="sortSelect"
          value={sortBy}
          onChange={handleSortChange}
          className="sort-select"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};