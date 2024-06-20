import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptocurrencyDetails } from '../utils/api';
import { CryptoCurrency } from '../types';

const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [crypto, setCrypto] = useState<CryptoCurrency | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }
      setLoading(true);
      try {
        const data = await fetchCryptocurrencyDetails(id);
        setCrypto(data);
      } catch (error) {
        console.error("Error fetching cryptocurrency details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {crypto ? (
        <>
          <h1>{crypto.name}</h1>
          <p>Symbol: {crypto.symbol}</p>
          <p>Price: {crypto.priceUsd}</p>
          <p>Market Cap: {crypto.marketCapUsd}</p>
        </>
      ) : (
        <p>No details available for this cryptocurrency.</p>
      )}
    </div>
  );
};

export default DetailsPage;
