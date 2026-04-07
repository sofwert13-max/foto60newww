 
import React, { useState, useCallback } from 'react';
import { useProductStore } from '../store/productStore';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';
import { Layout } from '../components/Layout/Layout';
import { ProductFilter } from '../components/Products/ProductFilter';
import { ProductGrid } from '../components/Products/ProductGrid';
import { QuickViewModal } from '../components/Products/QuickViewModal';
import { CartPanel } from '../components/Cart/CartPanel';
import { CheckoutModal } from '../components/Cart/CheckoutModal';
import { FavoritesPanel } from '../components/Favorites/FavoritesPanel';
import { ReviewSection } from '../components/Reviews/ReviewSection';
import { PosterBuilder } from '../components/PosterBuilder/PosterBuilder';

export const HomePage = () => {
  const { currency } = useProductStore();
  const { showCart, setShowCart } = useCartStore();
  const { showFavorites, setShowFavorites } = useUserStore();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showFavPanel, setShowFavPanel] = useState(false);

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  }, []);

  const handleCheckout = useCallback(() => {
    setShowCart(false);
    setIsCheckoutOpen(true);
  }, [setShowCart]);

  return (
    <Layout>
      <ProductFilter />
      <ProductGrid onQuickView={handleQuickView} currency={currency} />
      <PosterBuilder />
      <ReviewSection />

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        currency={currency}
      />

      <CartPanel
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        currency={currency}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        currency={currency}
      />

      <FavoritesPanel
        isOpen={showFavPanel}
        onClose={() => setShowFavPanel(false)}
        currency={currency}
      />
    </Layout>
  );
};