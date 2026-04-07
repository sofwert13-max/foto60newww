import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './store/userStore';
import { ErrorBoundary } from './components/Common/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import './styles/globals.css';
import './styles/animations.css';
import './App.css';

function App() {
  const { theme, setTheme } = useUserStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <HomePage />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'var(--card-bg)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
            }
          }}
        />
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;