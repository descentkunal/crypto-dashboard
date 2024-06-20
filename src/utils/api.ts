// src/utils/api.ts

import axios from 'axios';
import { CryptoCurrency } from '../types';

const API_URL = 'https://api.coincap.io/v2/assets';

export const fetchCryptocurrencies = async (): Promise<CryptoCurrency[]> => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const fetchCryptocurrencyPrices = async (): Promise<Partial<CryptoCurrency>[]> => {
  const response = await axios.get(API_URL);
  return response.data.data.map((crypto: CryptoCurrency) => ({
    id: crypto.id,
    priceUsd: crypto.priceUsd,
    marketCapUsd: crypto.marketCapUsd,
  }));
};

export const fetchCryptocurrencyDetails = async (id: string): Promise<CryptoCurrency> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

