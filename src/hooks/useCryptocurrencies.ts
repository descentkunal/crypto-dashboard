import { useState, useEffect } from "react";
import { fetchCryptocurrencies } from "../utils/api";
import { CryptoCurrency } from "../types";

// Custom hook to fetch and update the list of cryptocurrencies at regular intervals
const useCryptocurrencies = () => {
  // State to hold the list of cryptocurrencies
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Function to fetch cryptocurrency data
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };

    fetchData(); // Fetch data when the component mounts
    const interval = setInterval(fetchData, 10000); // Set an interval to fetch data every 10 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, []);

  return { cryptos, loading }; // Return the list of cryptocurrencies and the loading state
};

export default useCryptocurrencies;
