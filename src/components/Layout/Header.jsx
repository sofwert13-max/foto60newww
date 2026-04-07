 
import React, { useState, useCallback } from 'react';
import { Search, ShoppingCart, Heart, Sun, Moon, LogOut, User } from 'lucide-react';
import { useProductStore } from '../../store/productStore';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from '../Common/Button';
import './Header.css';

export const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);

  const { setSearchQuery, setCurrency, currency } = useProductStore();
  const { getTotalItems, toggleCart } = useCartStore();
  const { user, logout, theme, toggleTheme } = useUserStore();

  const cartItems = getTotalItems();

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, [setSearchQuery]);

  React.useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/">
              foto60 <span>— poster shop</span>
            </a>
          </div>

          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="header-actions">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-selector"
            >
              <option value="RUB">RUB</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button className="icon-btn" aria-label="Favorites">
              <Heart size={20} />
            </button>

            <button
              className="icon-btn cart-btn"
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={20} />
              {cartItems > 0 && <span className="cart-badge">{cartItems}</span>}
            </button>

            <div className="user-menu">
              <button
                className="icon-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-label="User menu"
              >
                <User size={20} />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <div className="user-info">
                        <p>{user.name}</p>
                        <small>{user.email}</small>
                      </div>
                      <hr />
                      <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={16} />
                        Выход
                      </button>
                    </>
                  ) : (
                    <p>Вход в аккаунт</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};