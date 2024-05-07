import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

function createData(name, calories, fat) {
  return {
    name,
    calories,
    fat,
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
  };
}

function Row(props) {
  const { row, handleopen, platform, shops, setShops } = props;
  const [hOpen, setHopen] = useState(false);

  const handleHistory = () => {
    setHopen(!hOpen);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ alignItems: "center" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleHistory}
          >
            {hOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            display: "flex",
            alignItems: "center",
            border: "0",
            height: "74px",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          <img
            src={`src/assets/images/${row.name}`}
            alt=""
            style={{
              width: "35px",
              height: "35px",
              border: "1px solid gray",
              borderRadius: "50px",
              padding: "5px",
            }}
          />
          {row.calories}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "14px" }}>
          {shops[platform]?.length !== undefined ? shops[platform].length : "No"} Shops
        </TableCell>
        <TableCell align="right">
          <Box
            onClick={() => handleopen(platform)}
            sx={{
              cursor: "pointer",
              ":hover": { color: "black" },
              color: "blue",
              fontSize: "14px",
            }}
          >
            + Add Shop
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={hOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Shops
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Store Name</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell align="right">MarketPlace</TableCell>
                    <TableCell align="right">TimeZone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(shops[platform] || []).map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.storeName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.storefrontURL}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.marketplace}
                      </TableCell>
                      <TableCell align="right">{historyRow.timezone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Amazon_icon.png", "Amazon", "+ Add Shop"),
  createData("wix.png", "Wix", "+ Add Shop"),
  createData("shopify.png", "Shopify", "+ Add Shop"),
  createData("woo.png", "Woo Commerce", "+ Add Shop"),
];

export default function Shops() {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState({
    Amazon: [],
    Wix: [],
    Shopify: [],
    "Woo Commerce": [], // Fixed the platform name to match the state key
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
    // Reset storefrontURL only if it's the first time opening this platform's form
    if (!shops[platform]?.length) {
      setNewShop((prevShop) => ({
        ...prevShop,
        storefrontURL: "https://",
      }));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "storefrontURL") {
    
      if (!value || !value.startsWith("https://")) {
        setNewShop((prevShop) => ({
          ...prevShop,
          [name]: `${value}`,
        }));
      } else {
        setNewShop((prevShop) => ({
          ...prevShop,
          [name]: value,
        }));
      }
    } else {
      setNewShop((prevShop) => ({
        ...prevShop,
        [name]: value,
      }));
    }
  };
  
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setNewShop((prevShop) => ({ ...prevShop, [name]: value }));
  };

  const handleAddShop = () => {
    const updatedShops = { ...shops };
    updatedShops[selectedPlatform] = [...updatedShops[selectedPlatform], newShop];
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
    // Add more marketplaces as needed
  ];

  const timezones = [
    { value: "GMT-12", label: "GMT-12" },
    { value: "GMT-11", label: "GMT-11" },
    { value: "GMT-10", label: "GMT-10" },
    // Add more timezones as needed
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ fontSize: "17px" }}>Platforms</TableCell>
              <TableCell style={{ fontSize: "17px" }} align="right">
                Subscribed Shops
              </TableCell>
              <TableCell style={{ fontSize: "17px" }} align="right">
                Add Shop
              </TableCell>
              <TableCell style={{ fontSize: "17px" }} align="right"></TableCell>
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
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
          }}
        >
          Add {selectedPlatform} Shop
          <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
        </DialogTitle>

        <DialogTitle style={{ fontSize: "14px" }}>
          Fill in the following detail to connect to BeProfit with your{" "}
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
            onClick={""}
            sx={{
              cursor: "pointer",
              ":hover": { color: "black" },
              color: "blue",
              marginLeft: "340px",
              paddingTop: "15px",
            }}
          >
            Can't Find your storefront URL?
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
            margin: "0 15px",
            marginBottom: "10px",
          }}
        >
          <Button
            style={{
              cursor: "pointer",
              ":hover": { color: "black" },
              color: "blue",
            }}
          >
            Need Help?
          </Button>
          <Button
            style={{
              background: "green",
              color: "#fff",
              padding: "7px   13px",
            }}
            color="primary"
            onClick={handleAddShop}
          >
            Continue{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
