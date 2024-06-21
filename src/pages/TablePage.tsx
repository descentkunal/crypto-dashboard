import React, { useState, useEffect } from "react";
import { fetchCryptocurrencies } from "../utils/api";
import { CryptoCurrency } from "../types";
import useCryptoPrices from "../hooks/useCryptoPrices";
import TableComponent from "../components/TableComponent";

type SortKey = "symbol" | "name" | "priceUsd" | "marketCapUsd"; // Type for sortable keys
type Order = "asc" | "desc"; // Type for order direction

const TablePage: React.FC = () => {
  // State to hold the list of cryptocurrencies
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to manage sort order and sort key with values from local storage if available
  const [order, setOrder] = useState<Order>(
    (localStorage.getItem("order") as Order) || "asc"
  );
  const [orderBy, setOrderBy] = useState<SortKey>(
    (localStorage.getItem("orderBy") as SortKey) || "name"
  );
  // State to manage current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage favorites list with values from local storage if available
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const itemsPerPage = 10; // Number of items to show per page

  // Fetch cryptocurrency data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Fetch updated prices every 10 seconds
  const prices = useCryptoPrices(
    cryptos?.map((crypto) => ({
      id: crypto?.id,
      priceUsd: crypto?.priceUsd,
      marketCapUsd: crypto?.marketCapUsd,
    }))
  );

  // Handle sorting of the table
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(property);
    localStorage?.setItem("order", newOrder);
    localStorage?.setItem("orderBy", property);
  };

  // Memoized sorted cryptocurrencies list
  const sortedCryptos = React.useMemo(() => {
    return cryptos
      ?.map((crypto) => {
        const priceInfo = prices?.find((p) => p?.id === crypto?.id);
        return {
          ...crypto,
          priceUsd: priceInfo?.priceUsd ?? crypto.priceUsd,
          marketCapUsd: priceInfo?.marketCapUsd ?? crypto.marketCapUsd,
        };
      })
      .sort((a, b) => {
        if (orderBy === "priceUsd" || orderBy === "marketCapUsd") {
          return (
            (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1) *
            (order === "asc" ? 1 : -1)
          );
        } else {
          return (
            (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
          );
        }
      });
  }, [cryptos, prices, order, orderBy]);

  // Handle page change for pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  // Toggle favorite status of a cryptocurrency
  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites?.includes(id)
      ? favorites?.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    setTimeout(() => {
      localStorage?.setItem("favorites", JSON.stringify(updatedFavorites));
    }, 0);
  };

  return (
    <TableComponent
      cryptos={sortedCryptos}
      loading={loading}
      order={order}
      orderBy={orderBy}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      favorites={favorites}
      handleRequestSort={handleRequestSort}
      handlePageChange={handlePageChange}
      toggleFavorite={toggleFavorite}
      showFavorites={true}
      highlightOnHover={true}
    />
  );
};

export default TablePage;
