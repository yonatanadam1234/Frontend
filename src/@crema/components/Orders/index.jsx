import React, { useEffect, useState } from "react";

import {
  Box,
  MenuItem,
  Select,
  InputLabel,

} from "@mui/material";

import AmazoneOrderTable from "./AmazoneOrder";
import ShopifyOrderTabel from "./ShopifyOrder";
import EbayOrderTabel from "./EbayOrder";
import MagentoOrderTabel from "./MagentoOrder";

const Orders = () => {


  const [selectedPlatform, setSelectedPlatform] = useState("Amazon");

  const renderOrderComponent = () => {
    switch (selectedPlatform) {
      case "Amazon":
        return (
          <AmazoneOrderTable />
        );
      case "Shopify":
        return (
          <ShopifyOrderTabel />
        );
      case "Ebay":
        return (
          <EbayOrderTabel />
        );
      case "Magento":
        return (
          <MagentoOrderTabel />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Box display="flex" alignItems="center">
        <InputLabel id="demo-simple-select-label" style={{ color: "#000" }}>
          Select Platforms : &nbsp;
        </InputLabel>
        <Select
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
          displayEmpty
          style={{ minWidth: "300px", height: "40px" }}
        >

          <MenuItem value="Amazon" selected>
            Amazon
          </MenuItem>
          <MenuItem value="Shopify">Shopify</MenuItem>
          <MenuItem value="Ebay">eBay</MenuItem>
          <MenuItem value="Magento">Magento</MenuItem>
        </Select>
      </Box>
      {renderOrderComponent()}
    </>
  );
};

export default Orders;
