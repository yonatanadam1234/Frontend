import React, { useEffect, useState, useCallback } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddShopDialog from "./AddShopDialog";
import { getShopData, deleteShopData } from "./services/shop.service";
import { useAuthUser } from "../../hooks/AuthHooks";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Row = ({ row, handleOpen, platform, shops, setShops, user }) => {
  const [hOpen, setHopen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleHistory = () => setHopen(!hOpen);

  const handleDeleteShop = async () => {
    try {
      const verificationState = deleteIndex;
      console.log("Deleting shop with verification state:", verificationState);
      const response = await deleteShopData(user.id, verificationState);
      console.log("Delete response:", response);
      if (response.data.success) {
        const updatedShops = { ...shops };
        updatedShops[platform] = updatedShops[platform].filter(
          (shop) => shop.seller_info.verification_state !== verificationState
        );
        setShops(updatedShops);
        toast.success('Shop Deleted Successfully');
      } else {
        toast.error("Error deleting shop");
      }
    } catch (error) {
      toast.error("Error deleting shop");
      toast.error("Error deleting shop:", error);
    } finally {
      setDeleteDialogOpen(false);
      setDeleteIndex(null);
    }
  };

  const handleToggleShop = (index) => {
    const updatedShops = { ...shops };
    updatedShops[platform][index].enabled =
      !updatedShops[platform][index].enabled;
    setShops(updatedShops);
  };

  const openDeleteDialog = (shop) => {
    setDeleteIndex(shop.seller_info.verification_state);
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
          {row.platform}
        </TableCell>
        <TableCell align="right" sx={{ fontSize: 14 }}>
          {shops[platform]?.length ?? "No"} Shops
        </TableCell>
        <TableCell align="right">
          <Box
            onClick={() => handleOpen(row.platform)}
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
                    {shops[platform].map((shop, index) => (
                      <TableRow
                        key={index}
                        style={{ opacity: shop.enabled ? 1 : 0.5 }}
                      >
                        <TableCell>{shop.seller_info.store_name}</TableCell>
                        <TableCell>
                          <a
                            href={shop.seller_info.store_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {shop.seller_info.store_url}
                          </a>
                        </TableCell>
                        <TableCell align="right">
                          {shop.seller_info.region}
                        </TableCell>
                        <TableCell align="right">
                          {shop.seller_info.time_zone}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete shop"
                            onClick={() => openDeleteDialog(shop)}
                          >
                            <DeleteOutlineRoundedIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <ToggleButtonGroup
                            sx={{ width: 140 }}
                            value={shop.enabled ? "enable" : "disable"}
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

const Shops = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState({
    amazon: [],
    shopify: [],
    ebay: [],
    magento: [],
  });

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const { user } = useAuthUser();

  const fetchData = useCallback(async () => {
    try {
      const response = await getShopData(user.id);

      if (response.data) {
        const amazonShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === "amazon"
        );
        const ebayShops = response.data.filter(
          (shop) => shop.platform_connection.platform_name === "ebay"
        );
        setShops((prevShops) => ({
          ...prevShops,
          amazon: amazonShops,
          ebay: ebayShops,
        }));
      } else {
        console.error("Error:", response.data ? response.data.message : "No data");
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpen = (platform) => {
    setSelectedPlatform(platform);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const rows = [
    { name: "Amazon_icon.svg", platform: "amazon" },
    // { name: "shopify.svg", platform: "shopify" },
    { name: "ebay.svg", platform: "ebay" },
    // { name: "magento.svg", platform: "magento" },
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
                handleOpen={handleOpen}
                platform={row.platform}
                shops={shops}
                setShops={setShops}
                user={user}
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
        fetchData={fetchData}
        toast={toast}
      />
      <ToastContainer />
    </>
  );
};

export default Shops;
