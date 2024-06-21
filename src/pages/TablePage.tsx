import React, { useState, useEffect } from "react";
import { fetchCryptocurrencies } from "../utils/api";
import { CryptoCurrency } from "../types";
import useCryptoPrices from "../hooks/useCryptoPrices";
import TableComponent from "../components/TableComponent";

type SortKey = "symbol" | "name" | "priceUsd" | "marketCapUsd";
type Order = "asc" | "desc";

const TablePage: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<Order>(
    (localStorage.getItem("order") as Order) || "asc"
  );
  const [orderBy, setOrderBy] = useState<SortKey>(
    (localStorage.getItem("orderBy") as SortKey) || "name"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const prices = useCryptoPrices(
    cryptos.map((crypto) => ({
      id: crypto.id,
      priceUsd: crypto.priceUsd,
      marketCapUsd: crypto.marketCapUsd,
    }))
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SortKey
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    setOrder(newOrder);
    setOrderBy(property);
    localStorage.setItem("order", newOrder);
    localStorage.setItem("orderBy", property);
  };

  const sortedCryptos = React.useMemo(() => {
    return cryptos
      .map((crypto) => {
        const priceInfo = prices.find((p) => p.id === crypto.id);
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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
    setTimeout(() => {
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
