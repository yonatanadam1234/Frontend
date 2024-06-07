import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import PropTypes from "prop-types";
import TableHeading from "./TableHeading"; // Updated TableHeading component
import TableItem from "./TableItem"; // Updated TableItem component
import AppTableContainer from "@crema/components/AppTableContainer";
import AppLoader from "@crema/components/AppLoader";
import { Typography } from "@mui/material";

const AmazoneOrderTable = ({ displayProductCost, orderData, loading }) => {
  // State for displaying Product Cost column

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
              {orderData.map((data) => (
                <TableItem
                  data={data}
                  key={data.id}
                  displayProductCost={displayProductCost}
                />
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
