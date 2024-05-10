import React, { useEffect, useState } from "react";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import {
  Button,
  Hidden,
  Box,
  IconButton,
  Drawer,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from "@mui/material";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsPagination from "@crema/components/AppsPagination";
import AppSearchBar from "@crema/components/AppSearchBar";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import OrderTable from "./OrderTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import { display } from "@mui/system";

const Orders = () => {
  const { messages } = useIntl();
  const [{ apiData, loading }, { setQueryParams }] = useGetDataApi(
    "/api/ecommerce/orders",
    {},
    {},
    false
  );
  const [page, setPage] = useState(0);
  const [search, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    product: "",
    vendor: "",
    financial: "",
    fulfillment: "",
    countries: "",
    price: "",
    cogs: "",
    shipping: "",
    physicalLocation: "",
    items: "",
    status: "",
    salesChannel: "",
    discountCode: "",
    marketingSource: "",
    utmSource: "",
    utmMedium: "",
    utmContent: "",
    utmTerm: "",
    utmCampaign: "",
    paymentGateways: "",
    orderSource: "",
  });

  const onPageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    // Check if search query is empty
    const queryParams = search ? { search, page } : { page };
    setQueryParams(queryParams);
  }, [search, page]);

  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const onSearchOrder = (value) => {
    setSearchQuery(value);
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const applyFilters = () => {
    // Apply filters to the table data
    // You can filter the data based on the selected filter options
    console.log("Applied Filters:", filters);
  };

  return (
    <AppsContainer title={messages["eCommerce.recentOrders"]} fullView>
      <AppsHeader>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          width={1}
          justifyContent="space-between"
        >
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            onChange={(event) => onSearchOrder(event.target.value)}
            placeholder={messages["common.searchHere"]}
          />

          <Box display="flex" flexDirection="row" alignItems="center">
            <IconButton color="primary" onClick={toggleFilterDrawer}>
              <Button variant="contained" style={{ background: "#0A8FDC" }}>
                <FilterListIcon />
                &nbsp;Filters
              </Button>
            </IconButton>
            <Button variant="contained" style={{ background: "#0A8FDC" }}>
              Add Order
            </Button>

            <Hidden smDown>
              <AppsPagination
                rowsPerPage={10}
                count={apiData?.count}
                page={page}
                onPageChange={onPageChange}
              />
            </Hidden>
          </Box>
        </Box>
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <OrderTable
          orderData={apiData?.data || []}
          loading={loading}
          filters={filters}
        />
      </AppsContent>

      <Hidden smUp>
        <AppsPagination
          rowsPerPage={10}
          count={apiData?.count}
          page={page}
          onPageChange={onPageChange}
        />
      </Hidden>

      <Drawer anchor="right" open={isFilterOpen} onClose={toggleFilterDrawer}>
        <Box p={10}>
          <FormControl
            fullWidth
            sx={{
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
             
            >
              <MenuItem value="">Price</MenuItem>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField id="standard-basic" label="Min-Price" variant="filled" />
                <TextField id="standard-basic" label="Max-Price" variant="filled"/>
              </Box>
            </Select>



            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Vendor</MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Financial </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Fulfillment </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Countries </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Price </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">COGS </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Shipping </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Physical Location (POS) </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value=""># Items </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Status </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Sales Channel </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Discount Code </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Marketing Source </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">UTM Source </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">UTM Medium </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">UTM Content </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">UTM Term </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">UTM Campaign </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Payment Gateways </MenuItem>
            </Select>
            <Select
              value={filters.product}
              onChange={handleFilterChange}
              name="product"
              displayEmpty
              fullWidth
              style={{ marginTop: "10px" }}
            >
              <MenuItem value="">Order Source </MenuItem>
            </Select>
          </FormControl>
          {/* Add more filter options */}
          <Button
            onClick={applyFilters}
            variant="contained"
            color="primary"
            fullWidth
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </AppsContainer>
  );
};

export default Orders;
