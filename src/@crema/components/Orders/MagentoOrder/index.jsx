import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import AppTableContainer from "@crema/components/AppTableContainer";
import AppLoader from "@crema/components/AppLoader";
import { Typography } from "@mui/material";
import noDataImage from '../../../../../public/assets/icon/no_data_found.jpg';

const MagentoOrderTabel = ({ displayProductCost, orderData, loading }) => {
  const data = [];
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
        Magento Orders
      </Typography>
      <AppTableContainer>
        {loading ? (
          <AppLoader />
        ) : data.data && data.data.length > 0 ? (
          <Table stickyHeader className='table'>
            <TableHead>
              <TableHeading displayProductCost={displayProductCost} />
            </TableHead>

            <TableBody>
              {Array.isArray(data.data) && data.data.map((data) => (
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
      </AppTableContainer>{" "}
    </>
  );
};

export default MagentoOrderTabel;

MagentoOrderTabel.defaultProps = {
  orderData: [],
};

MagentoOrderTabel.propTypes = {
  orderData: PropTypes.array,
  loading: PropTypes.bool,
};
