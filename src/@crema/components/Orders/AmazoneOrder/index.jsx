import React, { useState, useCallback, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppLoader from '@crema/components/AppLoader';
import { Typography } from '@mui/material';
import { useAuthUser } from '../../../hooks/AuthHooks';
import { getAmazonOrderData } from '../orders.service';
import { getShopData } from '../../Shops/services/shop.service';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import noDataImage from '../../../../../public/assets/icon/no_data_found.jpg';



const AmazoneOrderTable = ({ displayProductCost }) => {
  const [verificationState, setVerificationState] = useState(null);
  const [AmazonOrderData, setAmazonOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthUser();
  const check = [];
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

  useEffect(() => {
    const fetchAmazonData = async () => {
      if (!verificationState) return;
      try {
        const obj = {
          platform: 'amazon',
          userId: user.id,
          page: 1,
          state: verificationState
        };
        const response = await getAmazonOrderData(obj);
        if (response && response.data) {
          setAmazonOrderData(response.data);
        } else {
          toast.warning('No data received');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order order data:', error);
        setLoading(false);
      }
    };
    fetchAmazonData();
  }, [user.id, verificationState]);

  return (
    <>
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
        ) : AmazonOrderData.data && AmazonOrderData.data.length > 0 ? (
          <Table stickyHeader className="table">
            <TableHead>
              
              <TableHeading displayProductCost={displayProductCost} />
            </TableHead>
            <TableBody>
              {Array.isArray(AmazonOrderData.data) && AmazonOrderData.data.map((data) => (
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
    </>
  );
};

export default AmazoneOrderTable;

AmazoneOrderTable.propTypes = {
  displayProductCost: PropTypes.bool,
};
