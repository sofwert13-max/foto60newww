import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const INITIAL_PRODUCTS = [
  { id: 1, title: "Бабочки и радость", category: "Детские праздники", price: 240, rating: 4.8, popularity: 92, emoji: "🦋", description: "Яркий и вдохновляющий постер с красивыми бабочками" },
  { id: 2, title: "Золотой юбилей", category: "Годовщины", price: 450, rating: 4.9, popularity: 156, emoji: "✨", description: "Роскошный постер для отпраздновать юбилей" },
  { id: 3, title: "Вечнозелёные клятвы", category: "Свадьбы", price: 620, rating: 5.0, popularity: 243, emoji: "🌿", description: "Элегантный постер для свадебного торжества" },
  { id: 4, title: "Полароидные воспоминания", category: "Фотоподарки", price: 180, rating: 4.5, popularity: 88, emoji: "📸", description: "Уникальный постер из ваших личных фотографий" },
  { id: 5, title: "Календарь на 2026", category: "Календари", price: 190, rating: 4.6, popularity: 112, emoji: "📅", description: "Красивый настенный календарь на весь год" },
  { id: 6, title: "Винтажные открытки", category: "Разное", price: 50, rating: 4.3, popularity: 64, emoji: "✉️", description: "Набор винтажных открыток в ретро стиле" },
  { id: 7, title: "Радужный парад", category: "Детские праздники", price: 280, rating: 4.7, popularity: 103, emoji: "🌈", description: "Весёлый и красочный постер для детской комнаты" },
  { id: 8, title: "Бриллиант 50 лет", category: "Годовщины", price: 580, rating: 4.9, popularity: 187, emoji: "💎", description: "Премиальный постер для блестящего торжества" },
  { id: 9, title: "Деревенская любовь", category: "Свадьбы", price: 740, rating: 4.8, popularity: 209, emoji: "🤍", description: "Романтичный постер в стиле рустик" },
  { id: 10, title: "Персональная печать", category: "Фотоподарки", price: 320, rating: 4.8, popularity: 144, emoji: "🖼️", description: "Постер с вашим уникальным дизайном" },
  { id: 11, title: "Настольный календарь", category: "Календари", price: 150, rating: 4.4, popularity: 96, emoji: "🗓️", description: "Компактный календарь для рабочего стола" },
  { id: 12, title: "Деревянный набор", category: "Разное", price: 2500, rating: 4.5, popularity: 71, emoji: "⚫", description: "Премиум набор деревянных панелей с постерами" },
  { id: 13, title: "Весёлые пузыри", category: "Детские праздники", price: 1666, rating: 4.6, popularity: 79, emoji: "🎈", description: "Постер с воздушными шариками для праздника" },
  { id: 14, title: "Серебряная годовщина", category: "Годовщины", price: 499, rating: 4.7, popularity: 128, emoji: "🥈", description: "Изящный серебристый постер" },
  { id: 15, title: "Ботаническая свадьба", category: "Свадьбы", price: 699, rating: 4.9, popularity: 198, emoji: "🌸", description: "Нежный цветочный постер для свадьбы" },
  { id: 16, title: "Кружка с фото", category: "Фотоподарки", price: 210, rating: 4.5, popularity: 101, emoji: "☕", description: "Персонализированная кружка с вашим фото" }
];

export const useProductStore = create(
  devtools(
    persist(
      (set, get) => ({
        products: INITIAL_PRODUCTS,
        categories: ["Все", "Детские праздники", "Годовщины", "Свадьбы", "Фотоподарки", "Календари", "Разное"],
        activeCategory: "Все",
        searchQuery: "",
        sortBy: "default",
        currency: "RUB",

        setActiveCategory: (category) => set({ activeCategory: category }),
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSortBy: (sort) => set({ sortBy: sort }),
        setCurrency: (currency) => set({ currency }),

        getFilteredProducts: () => {
          const { products, activeCategory, searchQuery, sortBy } = get();
          
          let filtered = products.filter((p) => {
            const matchCategory = activeCategory === "Все" || p.category === activeCategory;
            const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
          });

          // Apply sorting
          if (sortBy === "price_asc") {
            filtered.sort((a, b) => a.price - b.price);
          } else if (sortBy === "price_desc") {
            filtered.sort((a, b) => b.price - a.price);
          } else if (sortBy === "rating_desc") {
            filtered.sort((a, b) => b.rating - a.rating);
          } else if (sortBy === "popularity_desc") {
            filtered.sort((a, b) => b.popularity - a.popularity);
          }

          return filtered;
        },
      }),
      { name: "product-store" }
    )
  )
);