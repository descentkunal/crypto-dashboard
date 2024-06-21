import { useState, useEffect } from "react";
import { fetchCryptocurrencies } from "../utils/api";
import { CryptoCurrency } from "../types";

const useCryptocurrencies = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { cryptos, loading };
};

export default useCryptocurrencies;
