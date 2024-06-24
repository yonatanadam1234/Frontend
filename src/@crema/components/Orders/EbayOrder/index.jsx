import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import AppTableContainer from "@crema/components/AppTableContainer";
import AppLoader from "@crema/components/AppLoader";
import { Typography } from "@mui/material";
import { useAuthUser } from "../../../hooks/AuthHooks";
import { getEbayOrderData } from "../orders.service";
import { getShopData } from "../../Shops/services/shop.service";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import noDataImage from '../../../../../public/assets/icon/no_data_found.jpg';

const EbayOrderTabel = ({ displayProductCost }) => {
  const { user } = useAuthUser();
  const [verificationState, setVerificationState] = useState(null);
  const [ebayOrderData, setEbayOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nodata, setnodata] = useState(true);

  const fetchData = useCallback(async () => {
    try {

      const response = await getShopData(user.id);

      if (response.data) {
        const ebayShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === "ebay"
        );

        if (ebayShops.length > 0) {
          setVerificationState(ebayShops[0].seller_info.verification_state);
        } else {
          toast.error("No eBay shops found");
        }
      } else {
        toast.error("Error:", response.data ? response.data.message : "No data");
      }
    } catch (error) {
      toast.error("Error fetching shop data:", error);
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

  return (
    <>
      <ToastContainer />

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
    </>
  );
};

export default EbayOrderTabel;