import React, { useState, useCallback, useEffect } from 'react';
import {
  Table, TableHead, TableBody, Typography, IconButton, Box,
  Button, Hidden, Drawer, Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Grid
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import noDataImage from '../../../../assets/icon/no_data_found.jpg'
import AppLoader from '@crema/components/AppLoader';
import AppTableContainer from '@crema/components/AppTableContainer';
import { useAuthUser } from '../../../hooks/AuthHooks';
import { getAmazonOrderData } from '../orders.service';
import { getShopData } from '../../Shops/services/shop.service';
import AppSearchBar from "@crema/components/AppSearchBar";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsPagination from "@crema/components/AppsPagination";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import { useJWTAuth } from '../../../services/auth';
import { IoCloseSharp } from 'react-icons/io5';
import { FormControl, MenuItem, Select } from '@mui/base';
import AddOrder from './AddOrder';

const AmazonOrderTable = () => {
  const { messages } = useIntl();
  const { user } = useJWTAuth();
  const [verificationState, setVerificationState] = useState(null);
  const [amazonOrderData, setAmazonOrderData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayProductCost, setDisplayProductCost] = useState(false);
  const [OpenAddOrder, setOpenAddOrder] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [formData, setFormData] = useState({
    ebayOrderId: '',
    customerName: '',
    customerAddress: '',
    productCost: '',
    purchaseDate: '',
    lastUpdatedDate: '',
    orderStatus: '',
    fulfillmentChannel: '',
    salesChannel: '',
    shipServiceLevel: '',
    productName: '',
    sku: '',
    itemStatus: '',
    quantity: '',
    currency: '',
    itemPrice: '',
    itemTax: '',
    shippingPrice: '',
    shippingTax: '',
    shipCity: '',
    shipState: '',
    shipPostalCode: '',
    shipCountry: '',
    isIba: '',
    sellingFees: '',
    fbaFees: '',
    shippingGroup: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await getShopData(user.id);
      if (response.data) {
        const amazonShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === 'amazon'
        );
        if (amazonShops.length > 0) {
          setVerificationState(amazonShops[0].seller_info.verification_state);
        } else {
          toast.warning('No Amazon shops found');
        }
      } else {
        console.error('Error:', response.data ? response.data.message : 'No data');
      }
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchAmazonData = useCallback(async () => {
    if (!verificationState) return;
    setLoading(true);
    try {
      const obj = {
        platform: 'amazon',
        userId: user.id,
        status: 'cancel',
      };
      const response = await getAmazonOrderData(obj);
      if (response && response.data) {
        setAmazonOrderData(response.data);
      } else {
        toast.warning('No data received');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order data:', error);
      setLoading(false);
    }
  }, [user.id, verificationState]);

  useEffect(() => {
    fetchAmazonData();
  }, [fetchAmazonData]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const onSearchOrder = (value) => {
    setSearchQuery(value);
    setPage(0);
    if (value) {
      const filteredData = amazonOrderData.data.filter(order =>
        Object.values(order).some(val =>
          String(val).toLowerCase().includes(value.toLowerCase())
        )
      );
      setAmazonOrderData({ ...amazonOrderData, data: filteredData });
    } else {
      fetchAmazonData();
    }
  };
  const handleDrawerClose = () => {
    setOpenAddOrder(false);
  }

  const openAddOrders = () => {
    setOpenAddOrder(true);
  }


  const handleFilterChange = (event) => {
    if (!event) return;
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilters = () => {
    console.log("Applied Filters:", filters);
  };

  const totalPages = Math.ceil(amazonOrderData.total / rowsPerPage);

  return (
    <>
      <AppsContainer fullView>
        <AppsHeader>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            width={1}
          >
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              onChange={(event) => onSearchOrder(event.target.value)}
              placeholder={messages["common.searchHere"]}
            />
            <Box alignItems="right">
              <label>
                <input
                  type="checkbox"
                  onChange={() => setDisplayProductCost(!displayProductCost)}
                />
                &nbsp;&nbsp;Display Product Cost
              </label>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="right" flex='auto'>
              <IconButton color="primary" onClick={toggleFilterDrawer}>
                <Button variant="contained" style={{ background: "#0A8FDC" }}>
                  <FilterListIcon />
                  &nbsp;Filters
                </Button>
              </IconButton>

              <Button variant="contained" style={{ background: "#0A8FDC" }} onClick={openAddOrders}>
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  count={amazonOrderData.total || 0}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </Hidden>
            </Box>
          </Box>
        </AppsHeader>

        <AppsContent
          sx={{
            paddingTop: 2.5,
            paddingBottom: 2.5,
            overflowX: "auto",
          }}
        >
          <ToastContainer />
          <Typography
            display="block"
            style={{
              paddingBottom: "5px",
              fontSize: "14px",
              paddingLeft: "15px",
              fontWeight: "2000",
            }}
          >
            Amazon Orders
          </Typography>
          <AppTableContainer>
            {loading ? (
              <AppLoader />
            ) : amazonOrderData.data && amazonOrderData.data.length > 0 ? (
              <Table stickyHeader className="table">
                <TableHead>
                  <TableHeading displayProductCost={displayProductCost} />
                </TableHead>
                <TableBody>
                  {amazonOrderData.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage).map((data) => (
                    <TableItem data={data} key={data.order_id} displayProductCost={displayProductCost} />
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <img src={noDataImage} alt="No data available" style={{ width: '100%', height: '500px', objectFit: 'contain', padding: '50px' }} />
                <Typography variant="h2" sx={{ marginBottom: '50px' }}>No Result Found</Typography>
              </div>
            )}
          </AppTableContainer>
        </AppsContent>

        <Hidden smUp>
          <AppsPagination
            rowsPerPage={rowsPerPage}
            page={page}
            count={amazonOrderData.total || 0}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </Hidden>


        <Drawer
          anchor="right"
          open={isFilterOpen}
          onClose={toggleFilterDrawer}
          PaperProps={{
            style: {
              width: 350,
            }
          }}
        >
          <Box style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <IoCloseSharp style={{ fontSize: '30px', marginRight: '10px', }} onClick={toggleFilterDrawer} />
          </Box>
          <Box p={10}>
            <FormControl fullWidth sx={{ paddingBottom: 5 }}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Top Seller Product"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Less Seller Product"
                />
              </FormGroup>
              <TextField
                label="Ebay Order Id"
                name="ebayOrderId"
                value={formData.ebayOrderId}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}

              />

              <TextField
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}

              />

              <TextField
                label="Customer Address"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}

              />
              <TextField
                label="Product Cost"
                name="productCost"
                value={formData.productCost}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Purchase Date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Last Updated Date"
                name="lastUpdatedDate"
                value={formData.lastUpdatedDate}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Order Status"
                name="orderStatus"
                value={formData.orderStatus}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Order Status</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
              </TextField>
              <TextField
                label="Fulfillment Channel"
                name="fulfillmentChannel"
                value={formData.fulfillmentChannel}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Fulfillment Channel</MenuItem>
                <MenuItem value="Channel 1">Channel 1</MenuItem>
                <MenuItem value="Channel 2">Channel 2</MenuItem>
              </TextField>
              <TextField
                label="Sales Channel"
                name="salesChannel"
                value={formData.salesChannel}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Sales Channel</MenuItem>
                <MenuItem value="Channel 1">Channel 1</MenuItem>
                <MenuItem value="Channel 2">Channel 2</MenuItem>
              </TextField>
              <TextField
                label="Ship Service Level"
                name="shipServiceLevel"
                value={formData.shipServiceLevel}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Product Name"
                name="productName"
                value={formData.productName}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Item Status"
                name="itemStatus"
                value={formData.itemStatus}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Item Status</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </TextField>
              <TextField
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Currency</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
              <TextField
                label="Item Price"
                name="itemPrice"
                value={formData.itemPrice}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Item Tax"
                name="itemTax"
                value={formData.itemTax}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Shipping Price"
                name="shippingPrice"
                value={formData.shippingPrice}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Shipping Tax"
                name="shippingTax"
                value={formData.shippingTax}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Ship City"
                name="shipCity"
                value={formData.shipCity}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Ship State"
                name="shipState"
                value={formData.shipState}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Ship Postal Code"
                name="shipPostalCode"
                value={formData.shipPostalCode}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Ship Country"
                name="shipCountry"
                value={formData.shipCountry}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="Is IBA"
                name="isIba"
                value={formData.isIba}
                onChange={handleFilterChange}
                select
                sx={{ width: 250, margin: 2 }}
              >
                <MenuItem value="">Select Is IBA</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </TextField>

              <TextField
                label="Selling Fees"
                name="sellingFees"
                value={formData.sellingFees}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <TextField
                label="FBA Fees"
                name="fbaFees"
                value={formData.fbaFees}
                onChange={handleFilterChange}
                sx={{ width: 250, margin: 2 }}
              />
              <Grid item xs={12}>
                <TextField
                  label="Shipping Group"
                  name="shippingGroup"
                  value={formData.shippingGroup}
                  onChange={handleFilterChange}
                  select
                  sx={{ width: 250, margin: 2 }}
                >
                  <MenuItem value="">Select Shipping Group</MenuItem>
                  <MenuItem value="Group 1">1</MenuItem>
                  <MenuItem value="Group 2">2</MenuItem>
                  <MenuItem value="Group 3">3</MenuItem>
                  <MenuItem value="Group 4">4</MenuItem>
                  <MenuItem value="Group 5">5</MenuItem>
                </TextField>
              </Grid>

              {/* Add similar FormControl for other filters as needed */}
              <Box sx={{display:'flex', justifyContent:'flex-end'}}>
              <Button onClick={applyFilters} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                Apply Filters
              </Button>
              </Box>
            </FormControl>
          </Box>
        </Drawer>
      </AppsContainer>
      <AddOrder
        open={OpenAddOrder}
        onClose={handleDrawerClose}
      />
    </>
  );
};

export default AmazonOrderTable;
