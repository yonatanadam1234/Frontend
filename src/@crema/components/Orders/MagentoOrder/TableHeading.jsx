import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { BsFillGearFill } from "react-icons/bs";

const TableHeading = ({ displayProductCost }) => {
  return (
    
    <TableRow>
      <TableCell>Amazon Order Id</TableCell>
      <TableCell>Customer Name</TableCell>
      {displayProductCost && <TableCell>Product Cost</TableCell>}
      <TableCell>Purchase Date</TableCell>
      <TableCell>Last Updated Date</TableCell>
      <TableCell>Order Status</TableCell>
      <TableCell>Fulfillment Channel</TableCell>
      <TableCell>Sales Channel</TableCell>
      <TableCell>Ship Service Level</TableCell>
      <TableCell>Product Name</TableCell>
      <TableCell>SKU</TableCell>
      <TableCell>Item Status</TableCell>
      <TableCell>Quantity</TableCell>
      <TableCell>Currency</TableCell>
      <TableCell>Item Price</TableCell>
      <TableCell>Item Tax</TableCell>
      <TableCell>Shipping Price</TableCell>
      <TableCell>shiping group</TableCell>
      <TableCell>Shipping Tax</TableCell>
      <TableCell>Ship City</TableCell>
      <TableCell>Ship State</TableCell>
      <TableCell>Ship Postal Code</TableCell>
      <TableCell>Ship Country</TableCell>
      <TableCell>Is Iba</TableCell>
      <TableCell>Selling Fees</TableCell>
      <TableCell>Fba Fees</TableCell>
      {/* Conditionally render the Product Cost column */}

      <TableCell
        align="left"
        style={{
          position: "sticky",
          right: 142,
          zIndex: 3,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        Total Profit
      </TableCell>
      <TableCell
        align="left"
        style={{
          position: "sticky",
          right: 44,
          zIndex: 2,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        Con.Margin
      </TableCell>
      <TableCell
        align="left"
        style={{
          position: "sticky", 
          right: 0,
          zIndex: 2,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        <BsFillGearFill />
      </TableCell>
    </TableRow>
  );
};

export default TableHeading;
