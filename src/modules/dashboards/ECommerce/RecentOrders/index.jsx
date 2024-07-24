import React, { useState, useEffect } from "react";
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

const RecentOrders = ({ listings }) => {
  const [sortBy, setSortBy] = useState("revenue");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  // const [timeframe, setTimeframe] = useState(7); 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const parsedListings = listings.map(listing => ({
    ...listing,
    date: new Date(listing.date.trim())
  }));
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };
  const handleReverseSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredListings = parsedListings.filter(listing =>
    selectedPlatform === "All" || listing.platform === selectedPlatform
  );
  const sortedListings = filteredListings.sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc" ? a.date - b.date : b.date - a.date;
    } else {
      return sortOrder === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }
  });
  const paginatedListings = sortedListings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <Paper elevation={1} style={{ borderRadius: 20 }}>
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow>
              <TableCell sx={{ padding: 7 }}>
                <FormControl fullWidth>
                  <InputLabel id="platform-label" sx={{ margin: -2 }}>Platform:-</InputLabel>
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
              {/* <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="timeframe-label" sx={{ margin: -2 }}>Timeframe:-</InputLabel>
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
              </TableCell> */}
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="sort-label" sx={{ margin: -2 }}>Sort By:-</InputLabel>
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
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Profit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.name}</TableCell>
                <TableCell>{listing.platform}</TableCell>
                <TableCell>{listing.revenue}</TableCell>
                <TableCell>{listing.quantity}</TableCell>
                <TableCell>{listing.profit}</TableCell>
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