import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        theme: "light",
        orders: [],
        favorites: [],

        setUser: (user) => set({ user }),
        logout: () => set({ user: null }),

        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),

        setTheme: (theme) => set({ theme }),

        addFavorite: (product) => {
          set((state) => ({
            favorites: state.favorites.some((fav) => fav.id === product.id)
              ? state.favorites
              : [...state.favorites, product],
          }));
        },

        removeFavorite: (productId) => {
          set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id !== productId),
          }));
        },

        toggleFavorite: (product) => {
          set((state) => {
            const isFavorited = state.favorites.some((fav) => fav.id === product.id);
            return {
              favorites: isFavorited
                ? state.favorites.filter((fav) => fav.id !== product.id)
                : [...state.favorites, product],
            };
          });
        },

        isFavorited: (productId) => {
          return get().favorites.some((fav) => fav.id === productId);
        },

        addOrder: (order) => {
          set((state) => ({
            orders: [...state.orders, { ...order, id: Date.now(), date: new Date() }],
          }));
        },
      }),
      { name: "user-store" }
    )
  )
);