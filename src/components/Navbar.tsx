import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to get the current location

  // Function to handle the Home button click
  const handleHomeClick = () => {
    navigate("/crypto-dashboard");
  };

  // Function to handle the Back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Back button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={handleBackClick}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Home button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          onClick={handleHomeClick}
          sx={{ ml: 1 }}
        >
          <HomeIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          CryptoTracker
        </Typography>

        {/* Currency selector */}
        <FormControl
          variant="outlined"
          sx={{
            minWidth: 100,
            mt: 2,
            mb: 2,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              fontSize: "0.875rem",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
            },
            "& .MuiSvgIcon-root": { color: "white" },
          }}
        >
          <InputLabel id="currency-select-label">Currency</InputLabel>
          <Select
            labelId="currency-select-label"
            id="currency-select"
            value="USD"
            label="Currency"
          >
            <MenuItem value="USD">USD</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
