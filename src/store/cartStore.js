import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useCartStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        showCart: false,

        addToCart: (product) => {
          const { items } = get();
          const existingItem = items.find((item) => item.id === product.id);

          if (existingItem) {
            set({
              items: items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
              ),
            });
          } else {
            set({
              items: [...items, { ...product, quantity: 1 }],
            });
          }
        },

        removeFromCart: (productId) => {
          set({
            items: get().items.filter((item) => item.id !== productId),
          });
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeFromCart(productId);
            return;
          }
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            ),
          });
        },

        clearCart: () => set({ items: [] }),
        toggleCart: () => set((state) => ({ showCart: !state.showCart })),
        setShowCart: (show) => set({ showCart: show }),

        getTotalPrice: () => {
          return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        getTotalItems: () => {
          return get().items.reduce((sum, item) => sum + item.quantity, 0);
        },

        isInCart: (productId) => {
          return get().items.some((item) => item.id === productId);
        },
      }),
      { name: "cart-store" }
    )
  )
);