import React, { useState ,useCallback,useEffect } from "react";
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
import { getAmazonOrderData } from "../orders.service";
import { getShopData } from "../../Shops/services/shop.service";

const AmazoneOrderTable = ({ displayProductCost }) => {
  
  const { user } = useAuthUser();
  const [verificationState, setVerificationState] = useState(null);
  const [AmazonOrderData, setAmazonOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await getShopData(user.id);
      if (response.data) {
        const amazonShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === "amazon"
        );
        if (amazonShops.length > 0) {
          setVerificationState(amazonShops[0].seller_info.verification_state);
        } else {
          console.error("No Amazon shops found");
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
        if (response) {
          setAmazonOrderData(response.data);
          setLoading(false); // Add this line
        } else {
          console.error("Error: No data received");
        }
      } catch (error) {
        console.error("Error fetching order order data:", error);
        setLoading(false);
      }
    };
    fetchAmazonData();
  }, [user.id, verificationState]);
  return (
    <>
      <Typography
        display="block"
        style={{
          paddingBottom: "5px",
          fontSize: "14px",
          paddingLeft: "15px",
          fontWeight: "2000",
        }}
      >
        Amazone Orders
      </Typography>
      <AppTableContainer>
        {loading ? (
          <AppLoader />
        ) : (
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
        )}
      </AppTableContainer>
    </>
  );
};

export default AmazoneOrderTable;

AmazoneOrderTable.defaultProps = {
  orderData: [],
};

AmazoneOrderTable.propTypes = {
  orderData: PropTypes.array,
  loading: PropTypes.bool,
};
