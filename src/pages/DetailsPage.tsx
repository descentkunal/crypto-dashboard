import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCryptocurrencyDetails } from '../utils/api';
import { CryptoCurrency } from '../types';
import { Box, LinearProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './DetailsPage.scss';

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
    <Box className="details-page">
      {loading && <LinearProgress />}
      {crypto ? (
        <>
          <Typography className="details-page__header">{crypto.name}</Typography>
          <TableContainer component={Paper} className="details-page__table-container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="details-page__table-cell--bold">Symbol</TableCell>
                  <TableCell className="details-page__table-cell--bold">Name</TableCell>
                  <TableCell className="details-page__table-cell--bold">Price</TableCell>
                  <TableCell className="details-page__table-cell--bold">Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{crypto.symbol}</TableCell>
                  <TableCell>{crypto.name}</TableCell>
                  <TableCell>{crypto.priceUsd}</TableCell>
                  <TableCell>{crypto.marketCapUsd}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        !loading && <Typography variant="body1">No details available for this cryptocurrency.</Typography>
      )}
    </Box>
  );
};

export default DetailsPage;
