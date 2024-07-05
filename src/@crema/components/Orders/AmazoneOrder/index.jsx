import React, { useState, useCallback, useEffect } from 'react';
import {
  Table, TableHead, TableBody, Typography, IconButton, Box,
  Button, Hidden, Drawer, Checkbox
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import noDataImage from '../../../../../public/assets/icon/no_data_found.jpg';
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

const AmazonOrderTable = () => {
  const { messages } = useIntl();
  const { user } = useJWTAuth();
  const [verificationState, setVerificationState] = useState(null);
  const [amazonOrderData, setAmazonOrderData] = useState({ data: [], total: 0 }); // Initialize with empty data and total count
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7); // Set rows per page to 10
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayProductCost, setDisplayProductCost] = useState(false);

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
        console.error('Error:', response.data? response.data.message : 'No data');
      }
    } catch (error) {
      console.error('Error fetching shop data:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchAmazonData = async () => {
      if (!verificationState) return;
      setLoading(true); // Start loading when fetching data
      try {
        const obj = {
          platform: 'amazon',
          userId: user.id,
          // Remove page and rowsPerPage from the request
          status: 'cancel',
        };
        const response = await getAmazonOrderData(obj);
        if (response && response.data) {
          setAmazonOrderData(response.data);
        } else {
          toast.warning('No data received');
        }
        setLoading(false); // End loading after data fetch
      } catch (error) {
        console.error('Error fetching order data:', error);
        setLoading(false); // End loading on error
      }
    };
    fetchAmazonData();
  }, [user.id, verificationState]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 7));
    setPage(0);
  };

  const onSearchOrder = (value) => {
    setSearchQuery(value);
    setPage(0); // Reset to first page when a new search is performed
  };

  const toggleFilterDrawer = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Calculate the number of pages based on the total count and rows per page
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
              <Button variant="contained" style={{ background: "#0A8FDC" }}>
                Add Order
              </Button>

              <Hidden smDown>
                <AppsPagination
                  rowsPerPage={rowsPerPage}
                  page={page}
                  count={amazonOrderData.total || 0} // Total count from API response
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
            {loading? (
              <AppLoader />
            ) : amazonOrderData.data && amazonOrderData.data.length > 0? (
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
      </AppsContainer>
    </>
  );
};

export default AmazonOrderTable;