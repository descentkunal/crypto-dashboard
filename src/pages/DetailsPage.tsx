import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCryptocurrencyDetails } from "../utils/api";
import { CryptoCurrency } from "../types";
import TableComponent from "../components/TableComponent";

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

  return (
    <TableComponent
      cryptos={crypto ? [crypto] : []}
      loading={loading}
      order="asc"
      orderBy="name"
      currentPage={1}
      itemsPerPage={1}
      handlePageChange={() => {}}
      showFavorites={false} // Set showFavorites to false
      highlightOnHover={false} // Set highlightOnHover to false
    />
  );
};

export default DetailsPage;
