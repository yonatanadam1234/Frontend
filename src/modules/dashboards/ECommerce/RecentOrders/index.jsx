import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const RecentOrders = () => {
  // Sample data with date property
  const listings = [
    {
      id: 1,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 2,
      name: "Product B",
      platform: "eBay",
      revenue: 4000,
      quantity: 40,
      profit: 2500,
      date: new Date("2023-10-15"),
    },
    {
      id: 3,
      name: "Product C",
      platform: "Magento",
      revenue: 67755,
      quantity: 60,
      profit: 3500,
      date: new Date("2023-10-20"),
    },
    {
      id: 4,
      name: "Product C",
      platform: "eBay",
      revenue: 8788,
      quantity: 23,
      profit: 600,
      date: new Date("2023-10-20"),
    },
    {
      id: 5,
      name: "Product C",
      platform: "Amazon",
      revenue: 5767,
      quantity: 60,
      profit: 34000,
      date: new Date("2024-03-16"),
    },
    {
      id: 6,
      name: "Product C",
      platform: "Magento",
      revenue: 4555,
      quantity: 67,
      profit: 2500,
      date: new Date("2023-10-20"),
    },
    {
      id: 7,
      name: "Product C",
      platform: "Shopify",
      revenue: 6000,
      quantity: 4,
      profit: 3500,
      date: new Date("2023-10-20"),
    },
    {
      id: 8,
      name: "Product C",
      platform: "eBay",
      revenue: 456,
      quantity: 3,
      profit: 3500,
      date: new Date("2024-05-16"),
    },
    {
      id: 9,
      name: "Product C",
      platform: "Amazon",
      revenue: 565,
      quantity: 89,
      profit: 3500,
      date: new Date("2023-10-20"),
    },
    {
      id: 10,
      name: "Product C",
      platform: "eBay",
      revenue: 878,
      quantity: 23,
      profit: 500,
      date: new Date("2023-10-20"),
    },
    {
      id: 11,
      name: "Product C",
      platform: "Amazon",
      revenue: 6000,
      quantity: 56,
      profit: 3500,
      date: new Date("2024-05-16"),
    },
    {
      id: 12,
      name: "Product C",
      platform: "Shopify",
      revenue: 8887,
      quantity: 89,
      profit: 900,
      date: new Date("2023-10-20"),
    },
    {
      id: 13,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 14,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 15,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 16,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 17,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 18,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 19,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 20,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },
    {
      id: 21,
      name: "Product A",
      platform: "Amazon",
      revenue: 5000,
      quantity: 34,
      profit: 3000,
      date: new Date("2023-10-10"),
    },

    // Additional sample listings...
  ];

  // State for sorting options
  const [sortBy, setSortBy] = useState("revenue");
  const [sortOrder, setSortOrder] = useState("desc");

  // State for platform selection
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  // State for timeframe selection
  const [timeframe, setTimeframe] = useState(7); // Default: 7 days

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8); // Display 8 rows per page

  // Function to handle sorting
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to handle platform selection
  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  // Function to handle reverse sorting
  const handleReverseSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to handle timeframe selection
  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  // Function to handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter listings based on selected platform and timeframe
  const filteredListings =
    selectedPlatform === "All"
      ? listings
      : listings.filter((listing) => listing.platform === selectedPlatform);

  // Filter listings based on selected timeframe
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  const filteredByTimeframeListings = filteredListings.filter(
    (listing) => listing.date >= startDate
  );

  // Sort listings based on selected sorting option and order
  const sortedListings = filteredByTimeframeListings.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Pagination calculations
  const lastIndex = page * rowsPerPage + rowsPerPage;
  const firstIndex = page * rowsPerPage;

  return (
    <Paper elevation={1} style={{ borderRadius: 20 }}>
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell sx={{padding:7}}>
                <FormControl fullWidth>
                  <InputLabel id="platform-label" sx={{margin:-2}}>Platform:-</InputLabel>
                  <Select
                    labelId="platform-label"
                    value={selectedPlatform}
                    onChange={handlePlatformChange}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Amazon">Amazon</MenuItem>
                    <MenuItem value="eBay">eBay</MenuItem>
                    <MenuItem value="Shopify">Shopify</MenuItem>
                    <MenuItem value="Magento">Magento</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="timeframe-label" sx={{margin:-2}}>Timeframe:-</InputLabel>
                  <Select
                    labelId="timeframe-label"
                    value={timeframe}
                    onChange={handleTimeframeChange}
                  >
                    <MenuItem value={7}>7 days</MenuItem>
                    <MenuItem value={30}>30 days</MenuItem>
                    <MenuItem value={90}>90 days</MenuItem>
                    <MenuItem value={360}>360 days</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="sort-label" sx={{margin:-2}}>Sort By:-</InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <MenuItem value="revenue">Revenue</MenuItem>
                    <MenuItem value="quantity">Quantity</MenuItem>
                    <MenuItem value="profit">Profit</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={sortOrder === "desc"}
                        onChange={handleReverseSortChange}
                      />
                    }
                    label="Reverse Sort"
                  />
                </FormGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedListings.slice(firstIndex, lastIndex).map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.name}</TableCell>
                <TableCell>{listing.platform}</TableCell>
                <TableCell align="right">${listing.revenue}</TableCell>
                <TableCell align="right">{listing.quantity}</TableCell>
                <TableCell align="right">${listing.profit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 16, 24]}
        component="div"
        count={sortedListings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RecentOrders;
