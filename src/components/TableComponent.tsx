import React from "react";
import { useNavigate } from "react-router-dom";
import { CryptoCurrency } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TableSortLabel,
  Pagination,
  Grid,
  Box,
  LinearProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { visuallyHidden } from "@mui/utils";
import "./TableComponent.scss";

type SortKey = "symbol" | "name" | "priceUsd" | "marketCapUsd";
type Order = "asc" | "desc";

interface TableComponentProps {
  cryptos: CryptoCurrency[];
  loading: boolean;
  order: Order;
  orderBy: SortKey;
  currentPage: number;
  itemsPerPage: number;
  favorites?: string[];
  handleRequestSort?: (
    event: React.MouseEvent<unknown>,
    property: SortKey
  ) => void;
  handlePageChange: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
  toggleFavorite?: (id: string) => void;
  showFavorites?: boolean;
  highlightOnHover?: boolean;
  showSerialNumber?: boolean; // New prop to control the visibility of the serial number column
}

const TableComponent: React.FC<TableComponentProps> = ({
  cryptos,
  loading,
  order,
  orderBy,
  currentPage,
  itemsPerPage,
  favorites = [],
  handleRequestSort = () => {},
  handlePageChange,
  toggleFavorite = () => {},
  showFavorites = true,
  highlightOnHover = true, // Default to true
  showSerialNumber = true, // Default to true
}) => {
  const navigate = useNavigate();

  // Paginate the cryptocurrencies to show only items for the current page
  const paginatedCryptos = cryptos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Check if a cryptocurrency is in the favorites list
  const isFavorite = (id: string) => favorites.includes(id);

  return (
    <Box className="table-page">
      <h1 className="table-page__header">
        Today's Cryptocurrency Prices by Market Cap
      </h1>
      {loading && <LinearProgress />}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TableContainer
            component={Paper}
            className="table-page__table-container"
          >
            <Table>
              <TableHead>
                <TableRow>
                  {showFavorites && (
                    <TableCell
                      padding="none"
                      className="table-page__table-cell--bold"
                    />
                  )}
                  {showSerialNumber && (
                    <TableCell
                      padding="none"
                      className="table-page__table-cell--bold"
                    >
                      #
                    </TableCell>
                  )}
                  <TableCell className="table-page__table-cell--bold">
                    <TableSortLabel
                      active={orderBy === "symbol"}
                      direction={orderBy === "symbol" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "symbol")}
                    >
                      Symbol
                      {orderBy === "symbol" ? (
                        <span style={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="table-page__table-cell--bold">
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "name")}
                    >
                      Name
                      {orderBy === "name" ? (
                        <span style={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="table-page__table-cell--bold">
                    <TableSortLabel
                      active={orderBy === "priceUsd"}
                      direction={orderBy === "priceUsd" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "priceUsd")}
                    >
                      Price
                      {orderBy === "priceUsd" ? (
                        <span style={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell className="table-page__table-cell--bold">
                    <TableSortLabel
                      active={orderBy === "marketCapUsd"}
                      direction={orderBy === "marketCapUsd" ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, "marketCapUsd")
                      }
                    >
                      Market Cap
                      {orderBy === "marketCapUsd" ? (
                        <span style={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCryptos.map((crypto, index) => (
                  <TableRow
                    key={crypto.id}
                    className="table-page__table-row--hover"
                  >
                    {showFavorites && (
                      <TableCell padding="none">
                        <IconButton
                          onClick={() => toggleFavorite(crypto.id)}
                          color="primary"
                        >
                          {isFavorite(crypto.id) ? (
                            <StarIcon style={{ color: "yellow" }} />
                          ) : (
                            <StarBorderIcon style={{ color: "grey" }} />
                          )}
                        </IconButton>
                      </TableCell>
                    )}
                    {showSerialNumber && (
                      <TableCell padding="none">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </TableCell>
                    )}
                    <TableCell>{crypto.symbol}</TableCell>
                    <TableCell
                      onClick={() =>
                        navigate(`/crypto-dashboard/details/${crypto.id}`)
                      }
                      className={
                        highlightOnHover
                          ? "table-page__table-cell--hoverable"
                          : ""
                      }
                    >
                      {crypto.name}
                    </TableCell>
                    <TableCell>{crypto.priceUsd}</TableCell>
                    <TableCell>{crypto.marketCapUsd}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {itemsPerPage > 1 && (
          <Grid item>
            <Pagination
              count={Math.ceil(cryptos.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TableComponent;
