import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OrderActions from "./OrderActions";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaEdit } from "react-icons/fa";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";

const TableItem = ({ data, displayProductCost }) => {
  const [shippingGroup, setShippingGroup] = useState(data.shiping_group);
  const handleShippingGroupChange = (event) => {
    const newShippingGroup = event.target.value;
    setShippingGroup(newShippingGroup);
  };

  const shippingGroupOptions = [1, 2, 3, 4];
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

  const [productCost, setProductCost] = useState(data.product_cost);
  const [isEditing, setIsEditing] = useState(false);

  const handleProductCostChange = (event) => {
    const newProductCost = event.target.value;
    // Update the original data.product_cost value here
    data.product_cost = newProductCost;
    setProductCost(newProductCost);
  };

  const handleProductCostBlur = () => {
    setIsEditing(false);
  };

  const handleProductCostDoubleClick = () => {
    setIsEditing(true);
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
      <TableCell>{data.customer_name}</TableCell>
      {displayProductCost && (
        <TableCell>
          {isEditing ? (
            <TextField
              value={productCost}
              onChange={handleProductCostChange}
              onBlur={handleProductCostBlur}
              onDoubleClick={handleProductCostDoubleClick}
            />
          ) : (
            <Box
              onDoubleClick={handleProductCostDoubleClick}
            >
             {data.product_cost}
              <FaEdit style={{ marginLeft: "8px" }} />
            </Box>
          )}
        </TableCell>
      )}
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
      <TableCell style={{ padding: "6px 16px" }}>{data.shipping_price}</TableCell>
      <TableCell
        style={{
          padding: 0,
        }}
      >

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TableCell
            style={{
              marginTop: "0px",
              display: "flex",
              justifyItems: "center",
            }}
          >
            <Select
              value={shippingGroup}
              onChange={handleShippingGroupChange}
              sx={{ border: "1px solid #ced4da" }}
            >
              {shippingGroupOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <TableCell>
              {data.shiping_group}&nbsp;&nbsp;
              <CurrencyExchangeSharpIcon />
            </TableCell>
          </TableCell>
        </Box>
      </TableCell>
      <TableCell>{data.shipping_tax}</TableCell>
      <TableCell>{data.ship_city}</TableCell>
      <TableCell>{data.ship_state}</TableCell>
      <TableCell>{data.ship_postal_code}</TableCell>
      <TableCell>{data.ship_country}</TableCell>
      <TableCell>{data.is_iba}</TableCell>
      <TableCell>{data.selling_fees}</TableCell>
      <TableCell>{data.fba_fees}</TableCell>
      {/* Conditionally render the Product Cost data */}

      <TableCell
        align="left"
        style={{
          position: "sticky",
          right: 145,
          zIndex: 3,
          width: "50px",
          backgroundColor: "#cee8f8",
        }}
      >
        {data.con_profit}
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
        {data.con_margin}
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
        <OrderActions
          order={data}
          handleShippingGroupChange={handleShippingGroupChange}
          shippingGroupOptions={shippingGroupOptions}
          handleProductCostChange={handleProductCostChange}
          handleProductCostBlur={handleProductCostBlur}
          setIsEditing={setIsEditing}
        />
      </TableCell>
    </TableRow>
  );
};

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  displayProductCost: PropTypes.bool.isRequired,
};

export default TableItem;