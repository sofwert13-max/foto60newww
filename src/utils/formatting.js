const CURRENCIES = {
  RUB: { symbol: '₽', rate: 1, name: 'Рубль' },
  USD: { symbol: '$', rate: 0.011, name: 'Доллар' },
  EUR: { symbol: '€', rate: 0.01, name: 'Евро' },
};

export const formatPrice = (price, currency = 'RUB') => {
  const currencyData = CURRENCIES[currency];
  const converted = Math.round(price * currencyData.rate);
  return `${converted}${currencyData.symbol}`;
};

export const getCurrencies = () => Object.keys(CURRENCIES);

export const getCurrencyName = (currency) => CURRENCIES[currency]?.name || currency;

export const escapeHtml = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

export const truncate = (str, length = 50) => {
  return str.length > length ? str.substring(0, length) + '...' : str;
}; 
