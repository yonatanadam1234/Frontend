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

const Row = ({ row, handleOpen, platform, shops, setShops }) => {
  const [hOpen, setHopen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleHistory = () => setHopen(!hOpen);

  const handleDeleteShop = () => {
    const updatedShops = { ...shops };
    updatedShops[platform] = updatedShops[platform].filter(
      (_, i) => i !== deleteIndex
    );
    setShops(updatedShops);
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleToggleShop = (index) => {
    const updatedShops = { ...shops };
    updatedShops[platform][index].enabled =
      !updatedShops[platform][index].enabled;
    setShops(updatedShops);
  };

  const openDeleteDialog = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
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
            onClick={() => handleOpen(platform)}
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
                            onClick={() => openDeleteDialog(index)}
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
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        PaperProps={{
          style: {
            padding: "20px",
            borderRadius: "10px",
            minWidth: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
          Delete Shop❗
        </DialogTitle>
        <DialogContent>
          <Typography sx={{fontSize: 16}}>
            Are you sure you want to permanently delete this shop? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} sx={{ color: "#555" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteShop}
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              "&:hover": { backgroundColor: "#c62828" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleOpen: PropTypes.func.isRequired,
  platform: PropTypes.string.isRequired,
  shops: PropTypes.object.isRequired,
  setShops: PropTypes.func.isRequired,
};

const rows = [
  createData("Amazon_icon.svg", "Amazon"),
  // createData("shopify.svg", "Shopify"),
  createData("ebay.svg", "eBay"),
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

  const handleOpen = (platform) => {
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
    handleClose();
  };

  const marketplaces = [
    { value: "amazon.com", label: "Amazon.com" },
    { value: "amazon.co.uk", label: "Amazon.co.uk" },
    { value: "amazon.de", label: "Amazon.de" },
    { value: "shopify.com", label: "Shopify" },
    { value: "ebay.com", label: "eBay" },
    { value: "magento.com", label: "Magento" },
  ];

  const timezones = [
    { value: "GMT-12", label: "GMT-12" },
    { value: "GMT-11", label: "GMT-11" },
    { value: "GMT-10", label: "GMT-10" },
    { value: "GMT-9", label: "GMT-9" },
    { value: "GMT-8", label: "GMT-8" },
    { value: "GMT-7", label: "GMT-7" },
    { value: "GMT-6", label: "GMT-6" },
    { value: "GMT-5", label: "GMT-5" },
    { value: "GMT-4", label: "GMT-4" },
    { value: "GMT-3", label: "GMT-3" },
    { value: "GMT-2", label: "GMT-2" },
    { value: "GMT-1", label: "GMT-1" },
    { value: "GMT", label: "GMT" },
    { value: "GMT+1", label: "GMT+1" },
    { value: "GMT+2", label: "GMT+2" },
    { value: "GMT+3", label: "GMT+3" },
    { value: "GMT+4", label: "GMT+4" },
    { value: "GMT+5", label: "GMT+5" },
    { value: "GMT+6", label: "GMT+6" },
    { value: "GMT+7", label: "GMT+7" },
    { value: "GMT+8", label: "GMT+8" },
    { value: "GMT+9", label: "GMT+9" },
    { value: "GMT+10", label: "GMT+10" },
    { value: "GMT+11", label: "GMT+11" },
    { value: "GMT+12", label: "GMT+12" },
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
          <TableBody >
            {rows.map((row) => (
              <Row
                key={row.name}
                row={row}
                handleOpen={handleOpen}
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
              marginLeft: 70,
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
            {marketplaces
              .filter(
                (option) =>
                  option.value.includes(selectedPlatform.toLowerCase())
              )
              .map((option) => (
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
            Add Shop
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Shops;
