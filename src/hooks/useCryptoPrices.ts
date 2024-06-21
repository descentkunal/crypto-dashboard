// src/hooks/useCryptoPrices.ts

import { useState, useEffect } from "react";
import { fetchCryptocurrencyPrices } from "../utils/api";
import { CryptoCurrency } from "../types";

// Custom hook to fetch and update cryptocurrency prices at regular intervals
const useCryptoPrices = (initialPrices: Partial<CryptoCurrency>[]) => {
  // State to hold the cryptocurrency prices
  const [prices, setPrices] = useState<Partial<CryptoCurrency>[]>(initialPrices);

  useEffect(() => {
    // Function to fetch the updated prices
    const fetchPrices = async () => {
      const updatedPrices = await fetchCryptocurrencyPrices();
      setPrices(updatedPrices);
    };

    fetchPrices(); // Fetch prices when the component mounts
    const interval = setInterval(fetchPrices, 10000); // Set an interval to fetch prices every 10 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return prices; // Return the updated prices
};

export default useCryptoPrices;
