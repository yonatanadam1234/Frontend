import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const createData = (name, calories) => ({
  name,
  calories,
  enabled: true,
  history: [
    {
      date: "sharnam",
      customerId: "11091700",
      amount: 3,
    },
    {
      date: "virunika",
      customerId: "Anonymous",
      amount: 1,
    },
  ],
});

const Row = ({ row, handleopen, platform, shops, setShops }) => {
  const [hOpen, setHopen] = useState(false);

  const handleHistory = () => setHopen(!hOpen);

  const handleDeleteShop = (index) => {
    const updatedShops = { ...shops };
    updatedShops[platform] = updatedShops[platform].filter(
      (_, i) => i !== index
    );
    setShops(updatedShops);
  };

  const handleToggleShop = (index) => {
    const updatedShops = { ...shops };
    updatedShops[platform][index].enabled =
      !updatedShops[platform][index].enabled;

    setShops(updatedShops);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {shops[platform]?.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleHistory}
            >
              {hOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            border: 0,
            height: 74,
            gap: 1,
            fontSize: 14,
          }}
        >
          <img
            src={`assets/icon/${row.name}`}
            alt=""
            style={{
              width: 40,
              height: 40,
              border: "1px solid gray",
              borderRadius: "50%",
              padding: 5,
            }}
          />
          {row.calories}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 14 }}>
          {shops[platform]?.length ?? "No"} Shops
        </TableCell>
        <TableCell align="right">
          <Box
            onClick={() => handleopen(platform)}
            sx={{
              cursor: "pointer",
              color: "blue",
              fontSize: 14,
              "&:hover": { color: "black" },
            }}
          >
            Add Shop
          </Box>
        </TableCell>
      </TableRow>
      {shops[platform]?.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={hOpen} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Store Name</TableCell>
                      <TableCell>URL</TableCell>
                      <TableCell align="right">MarketPlace</TableCell>
                      <TableCell align="right">TimeZone</TableCell>
                      <TableCell align="right">Delete</TableCell>
                      <TableCell align="right">Enable/Disable Shop</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(shops[platform] || []).map((historyRow, index) => (
                      <TableRow
                        key={index}
                        style={{ opacity: historyRow.enabled ? 1 : 0.5 }}
                      >
                        <TableCell>{historyRow.storeName}</TableCell>
                        <TableCell>{historyRow.storefrontURL}</TableCell>
                        <TableCell align="right">
                          {historyRow.marketplace}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.timezone}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete shop"
                            onClick={() => handleDeleteShop(index)}
                          >
                            <DeleteOutlineRoundedIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <ToggleButtonGroup
                            sx={{ width: 140 }}
                            value={historyRow.enabled ? "enable" : "disable"}
                            exclusive
                            onChange={() => handleToggleShop(index)}
                          >
                            <ToggleButton value="enable">Enable</ToggleButton>
                            <ToggleButton value="disable">Disable</ToggleButton>
                          </ToggleButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleopen: PropTypes.func.isRequired,
  platform: PropTypes.string.isRequired,
  shops: PropTypes.object.isRequired,
  setShops: PropTypes.func.isRequired,
};

const rows = [
  createData("Amazon_icon.svg", "Amazon"),
  // createData("shopify.svg", "Shopify"),
  // createData("ebay.svg", "eBay"),
  // createData("magento.svg", "Magento"),
];

const Shops = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState({
    Amazon: [],
    Shopify: [],
    eBay: [],
    Magento: [],
  });
  const [newShop, setNewShop] = useState({
    storeName: "",
    storefrontURL: "https://",
    marketplace: "",
    timezone: "",
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleopen = (platform) => {
    setSelectedPlatform(platform);
    setOpen(true);
    if (!shops[platform]?.length) {
      setNewShop((prevShop) => ({
        ...prevShop,
        storefrontURL: "https://",
      }));
    }
  };

  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prevShop) => ({
      ...prevShop,
      [name]:
        name === "storefrontURL" && !value.startsWith("https://")
          ? `https://${value}`
          : value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleAddShop = () => {
    const updatedShops = { ...shops };
    const newShopWithEnabled = {
      ...newShop,
      enabled: true,
    };
    updatedShops[selectedPlatform] = [
      ...updatedShops[selectedPlatform],
      newShopWithEnabled, 
    ];
    setShops(updatedShops);
    setNewShop({
      storeName: "",
      storefrontURL: "https://",
      marketplace: "",
      timezone: "",
    });
    setOpen(false);
  };

  
  const marketplaces = [
    { value: "amazon.com", label: "Amazon.com" },
    { value: "amazon.co.uk", label: "Amazon.co.uk" },
    { value: "amazon.de", label: "Amazon.de" },
  ];

  const timezones = [
    { value: "GMT-12", label: "GMT-12" },
    { value: "GMT-11", label: "GMT-11" },
    { value: "GMT-10", label: "GMT-10" },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ fontSize: 17 }}>Platforms</TableCell>
              <TableCell sx={{ fontSize: 17 }} align="right">
                Subscribed Shops
              </TableCell>
              <TableCell sx={{ fontSize: 17 }} align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.name}
                row={row}
                handleopen={handleopen}
                platform={row.calories}
                shops={shops}
                setShops={setShops}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
          }}
        >
          Add {selectedPlatform} Shop
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </DialogTitle>
        <DialogTitle sx={{ fontSize: 14 }}>
          Fill in the following details to connect to BeProfit with your{" "}
          {selectedPlatform} store
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            fullWidth
            name="storeName"
            value={newShop.storeName}
            onChange={handleInputChange}
          />
          <Box
            sx={{
              cursor: "pointer",
              color: "blue",
              marginLeft: "auto",
              paddingTop: 2,
              "&:hover": { color: "black" },
            }}
          >
            Can't find your storefront URL?
          </Box>
          <TextField
            margin="dense"
            label="Storefront URL"
            fullWidth
            name="storefrontURL"
            value={newShop.storefrontURL}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            label={`${selectedPlatform} Marketplace`}
            fullWidth
            name="marketplace"
            value={newShop.marketplace}
            onChange={handleSelectChange}
          >
            {marketplaces.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="Timezone"
            fullWidth
            name="timezone"
            value={newShop.timezone}
            onChange={handleSelectChange}
          >
            {timezones.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: 2,
            mb: 1,
          }}
        >
          <Button
            sx={{
              cursor: "pointer",
              color: "blue",
              "&:hover": { color: "black" },
            }}
          >
            Need Help?
          </Button>
          <Button sx={{ color: "#000" }} onClick={handleAddShop}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shops;
