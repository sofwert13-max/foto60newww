export const useAnalytics = () => {
  const trackEvent = (eventName, eventData = {}) => {
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
      gtag('event', eventName, eventData);
    }
    console.log('📊 Analytics Event:', eventName, eventData);
  };

  return { trackEvent };
}; 
