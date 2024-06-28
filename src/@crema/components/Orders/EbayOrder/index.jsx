import React, { useCallback, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import AppTableContainer from "@crema/components/AppTableContainer";
import AppLoader from "@crema/components/AppLoader";
import {
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox, TextField, FormControl, IconButton,
  Drawer, Button,
  Hidden, Box,
  MenuItem,
  Select,
} from "@mui/material";
import { useAuthUser } from "../../../hooks/AuthHooks";
import { getEbayOrderData } from "../orders.service";
import { getShopData } from "../../Shops/services/shop.service";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import noDataImage from '../../../../../public/assets/icon/no_data_found.jpg';
import { IoCloseSharp } from "react-icons/io5";
import AppsHeader from "@crema/components/AppsContainer/AppsHeader";
import AppsContent from "@crema/components/AppsContainer/AppsContent";
import AppsPagination from "@crema/components/AppsPagination";
import AppSearchBar from "@crema/components/AppSearchBar";
import FilterListIcon from "@mui/icons-material/FilterList";
import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
const EbayOrderTabel = () => {
  const { user } = useAuthUser();
  const [verificationState, setVerificationState] = useState(null);
  const [ebayOrderData, setEbayOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nodata, setnodata] = useState(true);

  const hasFetchedData = useRef(false);

  const fetchData = useCallback(async () => {
    if (hasFetchedData.current) return;

    hasFetchedData.current = true;
    try {
      const response = await getShopData(user.id);

      if (response.data) {
        const ebayShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === 'ebay'
        );

        if (ebayShops.length > 0) {
          setVerificationState(ebayShops[0].seller_info.verification_state);
        } else {
          toast.warning('No eBay shops found');
        }
      } else {
        toast.error('Error:', response.data ? response.data.message : 'No data');
      }
    } catch (error) {
      toast.error('Error fetching shop data:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  useEffect(() => {
    const fetchEbayData = async () => {
      if (!verificationState) return;
      try {
        const obj = {
          platform: 'ebay',
          userId: user.id,
          page: 1,
          state: verificationState
        };
        const response = await getEbayOrderData(obj);
        if (response) {
          if (response.data.length > 0) {
            setEbayOrderData(response.data);
            setLoading(false);
          } else {
            setnodata(true);
            setLoading(false);
          }
        } else {
          toast.warning("Error: No data received");
        }
      } catch (error) {
        toast.error("Error fetching ebay order data:", error);
        setLoading(false);
      }
    };

    fetchEbayData();
  }, [user.id, verificationState]);




  const { messages } = useIntl();
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
  const [displayProductCost, setDisplayProductCost] = useState(false);

  const onPageChange = (event, value) => {
    setPage(value);
  };
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
    console.log("Applied Filters:", filters);
  };
  return (
    <>
      <ToastContainer />

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
            <Box alignItems="right" >
              <label >
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
              <Button variant="contained" style={{ background: "#0A8FDC" }} >
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={10}
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
            overflowX: "auto",
          }}
        >

          {" "}
          <Typography
            display="block"
            style={{
              paddingBottom: "5px",
              fontSize: "14px",
              paddingLeft: "15px",
              fontWeight: "2000",
            }}
          >
            Ebay Orders
          </Typography>
          <AppTableContainer>
            {loading ? (
              <AppLoader />
            ) : ebayOrderData.data && ebayOrderData.data.length > 0 ? (
              <Table stickyHeader className='table'>
                <TableHead>
                  <TableHeading displayProductCost={displayProductCost} />
                </TableHead>

                <TableBody>
                  {Array.isArray(ebayOrderData.data) && ebayOrderData.data.map((data) => (
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
            rowsPerPage={10}
            page={page}
            onPageChange={onPageChange}
          />
        </Hidden>


        <Drawer anchor="right" open={isFilterOpen} onClose={toggleFilterDrawer}>
          <Box style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <IoCloseSharp style={{ fontSize: '38px', marginRight: '10px', }} onClick={toggleFilterDrawer} />
          </Box>
          <Box p={10}>
            <FormControl
              fullWidth
              sx={{
                paddingBottom: 5,
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Top Seller Product"
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Low Seller Products"
                />
              </FormGroup>
              <Select
                value={filters.product}
                onChange={handleFilterChange}
                name="product"
                displayEmpty
                fullWidth
                style={{ marginTop: "10px" }}
              >
                <MenuItem value="">Geographic Location</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Promotional Orders</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Price</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Con.Profit</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Con.Margin</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Order Status</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Ship Country</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Ship City</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Ship State</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
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
                <MenuItem value="">Ship Postal Code</MenuItem>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    id="standard-basic"
                    label="Min-Price"
                    variant="filled"
                  />
                  <TextField
                    id="standard-basic"
                    label="Max-Price"
                    variant="filled"
                  />
                </Box>
              </Select>
            </FormControl>
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
    </>
  );
};

export default EbayOrderTabel;