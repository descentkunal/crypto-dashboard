import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCryptocurrencies } from '../utils/api';
import { CryptoCurrency } from '../types';
import useCryptoPrices from '../hooks/useCryptoPrices';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, TableSortLabel, Pagination, Grid, Box
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type SortKey = 'symbol' | 'name' | 'priceUsd' | 'marketCapUsd';
type Order = 'asc' | 'desc';

const TablePage: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortKey>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCryptocurrencies();
      setCryptos(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const prices = useCryptoPrices(cryptos.map(crypto => ({
    id: crypto.id,
    priceUsd: crypto.priceUsd,
    marketCapUsd: crypto.marketCapUsd,
  })));

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: SortKey) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCryptos = React.useMemo(() => {
    return cryptos.map(crypto => {
      const priceInfo = prices.find(p => p.id === crypto.id);
      return {
        ...crypto,
        priceUsd: priceInfo?.priceUsd ?? crypto.priceUsd,
        marketCapUsd: priceInfo?.marketCapUsd ?? crypto.marketCapUsd,
      };
    }).sort((a, b) => {
      if (orderBy === 'priceUsd' || orderBy === 'marketCapUsd') {
        return (parseFloat(a[orderBy]) < parseFloat(b[orderBy]) ? -1 : 1) * (order === 'asc' ? 1 : -1);
      } else {
        return (a[orderBy] < b[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1);
      }
    });
  }, [cryptos, prices, order, orderBy]);

  const paginatedCryptos = sortedCryptos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id) ? favorites.filter(fav => fav !== id) : [...favorites, id];
    setFavorites(updatedFavorites);
    setTimeout(() => {
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }, 0);
  };

  const isFavorite = (id: string) => favorites.includes(id);

  if (loading) return <div>Loading...</div>;

  return (
    <Box padding={2}>
      <h1>Cryptocurrencies</h1>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="none" sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
                  <TableCell padding="none" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>#</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'symbol'}
                      direction={orderBy === 'symbol' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'symbol')}
                    >
                      Symbol
                      {orderBy === 'symbol' ? (
                        <span style={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'name')}
                    >
                      Name
                      {orderBy === 'name' ? (
                        <span style={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'priceUsd'}
                      direction={orderBy === 'priceUsd' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'priceUsd')}
                    >
                      Price
                      {orderBy === 'priceUsd' ? (
                        <span style={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    <TableSortLabel
                      active={orderBy === 'marketCapUsd'}
                      direction={orderBy === 'marketCapUsd' ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, 'marketCapUsd')}
                    >
                      Market Cap
                      {orderBy === 'marketCapUsd' ? (
                        <span style={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <TableCell padding="none">
                      <IconButton onClick={() => toggleFavorite(crypto.id)} color="primary">
                        {isFavorite(crypto.id) ? (
                          <StarIcon style={{ color: 'yellow' }} />
                        ) : (
                          <StarBorderIcon style={{ color: 'grey' }} />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell padding="none">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{crypto.symbol}</TableCell>
                    <TableCell 
                      onClick={() => navigate(`/details/${crypto.id}`)}
                      sx={{
                        '&:hover': {
                          color: 'lightgreen',
                          cursor: 'pointer'
                        },
                      }}
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
        <Grid item>
          <Pagination
            count={Math.ceil(sortedCryptos.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TablePage;
