// src/hooks/useCryptoPrices.ts

import { useState, useEffect } from 'react';
import { fetchCryptocurrencyPrices } from '../utils/api';
import { CryptoCurrency } from '../types';

const useCryptoPrices = (initialPrices: Partial<CryptoCurrency>[]) => {
  const [prices, setPrices] = useState<Partial<CryptoCurrency>[]>(initialPrices);

  useEffect(() => {
    const fetchPrices = async () => {
      const updatedPrices = await fetchCryptocurrencyPrices();
      setPrices(updatedPrices);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  return prices;
};

export default useCryptoPrices;
