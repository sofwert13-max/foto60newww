// src/store/productStore.js
import create from 'zustand';

const useProductStore = create((set) => ({
  products: [],
  categories: [],
  searchQuery: '',
  sortOption: 'default',
  currency: 'USD',

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortOption: (option) => set({ sortOption: option }),
  setCurrency: (currency) => set({ currency }),
}));

export default useProductStore;