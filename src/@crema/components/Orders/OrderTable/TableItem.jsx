import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OrderActions from "./OrderActions";

const TableItem = ({ data }) => {
  const getPaymentStatusColor = () => {
    switch (data.status) {
      case "Cancelled": {
        return "#F84E4E";
      }
      case "Shipped": {
        return "#E2A72E";
      }
      default: {
        return "#E2A72E";
      }
    }
  };

  return (
    <TableRow key={data.id} className="item-hover">
      {/* Render other columns */}
      <TableCell>
        <Box
          sx={{
            color: "primary.main",
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: "inline-block",
          }}
        >
          {data.amazon_order_id}{" "}
        </Box>{" "}
      </TableCell>
      <TableCell>{data.purchase_date}</TableCell>
      <TableCell>{data.last_updated_date}</TableCell>
      <TableCell>{data.order_status}</TableCell>
      <TableCell>{data.fulfillment_channel}</TableCell>
      <TableCell>{data.sales_channel}</TableCell>
      <TableCell>{data.ship_service_level}</TableCell>
      <TableCell>{data.product_name}</TableCell>
      <TableCell>{data.sku}</TableCell>
      <TableCell>
        <Box
          sx={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + "44",
            padding: "3px 5px",
            borderRadius: 1,
            fontSize: 14,
            display: "inline-block",
          }}
        >
          {data.item_status}{" "}
        </Box>
      </TableCell>
      <TableCell>{data.quantity}</TableCell>
      <TableCell>{data.currency}</TableCell>
      <TableCell>{data.item_price}</TableCell>
      <TableCell>{data.item_tax}</TableCell>
      <TableCell>{data.shipping_price}</TableCell>
      <TableCell>{data.shipping_tax}</TableCell>
      <TableCell>{data.ship_city}</TableCell>
      <TableCell>{data.ship_state}</TableCell>
      <TableCell>{data.ship_postal_code}</TableCell>
      <TableCell>{data.ship_country}</TableCell>
      <TableCell>{data.is_iba}</TableCell>
      <TableCell
        align="left"
        style={{
          position: "sticky",
          right: 150,
          zIndex: 3,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        {data.conProfit}
      </TableCell>
      <TableCell
        align="left"
        style={{
          position: "sticky",
          right: 60,
          zIndex: 2,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        {data.conMargin}
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
        <OrderActions />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
