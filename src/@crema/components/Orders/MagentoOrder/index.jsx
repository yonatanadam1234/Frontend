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

const MagentoOrderTabel = ({ orderData, loading }) => {
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
        ) : (
          <Table stickyHeader className="table">
            <TableHead>
              <TableHeading />
            </TableHead>
            <TableBody>
              {orderData.map((data) => (
                <TableItem data={data} key={data.id} />
              ))}
            </TableBody>
          </Table>
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
