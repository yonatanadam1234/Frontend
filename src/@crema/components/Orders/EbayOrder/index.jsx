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

const EbayOrderTabel = ({ displayProductCost, loading }) => {
  const { user } = useAuthUser();
  const [verificationState, setVerificationState] = useState(null);
  const [ebayOrderData, setEbayOrderData] = useState([]);

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
          console.error("No eBay shops found");
        }
      } else {
        console.error("Error:", response.data ? response.data.message : "No data");
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
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
          setEbayOrderData(response.data);
        } else {
          console.error("Error: No data received");
        }
      } catch (error) {
        console.error("Error fetching ebay order data:", error);
      }
    };

    fetchEbayData();
  }, [user.id, verificationState]);

  return (
    <>
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
        ) : (
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
        )}
      </AppTableContainer>{" "}
    </>
  );
};

export default EbayOrderTabel;

EbayOrderTabel.defaultProps = {
  orderData: [],
};

EbayOrderTabel.propTypes = {
  orderData: PropTypes.array,
  loading: PropTypes.bool,
};
