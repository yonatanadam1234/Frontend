import * as React from "react";
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
} from "@mui/icons-material";
import { useState } from "react";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddShopDialog from "./AddShopDialog"; 

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
          <Typography sx={{ fontSize: 16 }}>
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

const rows = [
  createData("Amazon_icon.svg", "amazon"),
  // createData("shopify.svg", "shopify"),
  createData("ebay.svg", "ebay"),
  // createData("magento.svg", "magento"),
];

const Shops = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState({
    amazon: [],
    shopify: [],
    ebay: [],
    magento: [],
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handleOpen = (platform) => {
    setSelectedPlatform(platform);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);


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
                handleOpen={handleOpen}
                platform={row.calories}
                shops={shops}
                setShops={setShops}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddShopDialog
        open={open}
        onClose={handleClose}
        platform={selectedPlatform}
        shops={shops}
        setShops={setShops}
      />
    </>
  );
};

export default Shops;
