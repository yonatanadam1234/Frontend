import React, { useState } from 'react';
import {
    Button, Drawer, Typography, TextField, Select, MenuItem, Dialog, IconButton, Grid,
    InputLabel,
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import { Box } from '@mui/system';

const AddOrder = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        ebayOrderId: '',
        customerName: '',
        customerAddress: '',
        productCost: '',
        purchaseDate: '',
        lastUpdatedDate: '',
        orderStatus: '',
        fulfillmentChannel: '',
        salesChannel: '',
        shipServiceLevel: '',
        productName: '',
        sku: '',
        itemStatus: '',
        quantity: '',
        currency: '',
        itemPrice: '',
        itemTax: '',
        shippingPrice: '',
        shippingTax: '',
        shipCity: '',
        shipState: '',
        shipPostalCode: '',
        shipCountry: '',
        isIba: '',
        sellingFees: '',
        fbaFees: '',
        shippingGroup: '',
    });
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Add your submission logic here
        console.log(formData);
        onClose();
    };


    return (
        <>

            <Dialog anchor="right" open={open} onClose={onClose} sx={{ padding: 16 }}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ mb: 5, display: "flex", justifyContent: "space-between", fontSize: 23 }}>
                        Add Order
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Ebay Order Id"
                                name="ebayOrderId"
                                value={formData.ebayOrderId}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Customer Name"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Customer Address"
                                name="customerAddress"
                                value={formData.customerAddress}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>

                            <TextField
                                label="Product Cost"
                                name="productCost"
                                value={formData.productCost}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Purchase Date"
                                name="purchaseDate"
                                value={formData.purchaseDate}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Last Updated Date"
                                name="lastUpdatedDate"
                                value={formData.lastUpdatedDate}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Order Status"
                                name="orderStatus"
                                value={formData.orderStatus}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Order Status</MenuItem>
                                <MenuItem value="Cancelled">Cancelled</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Fulfillment Channel"
                                name="fulfillmentChannel"
                                value={formData.fulfillmentChannel}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Fulfillment Channel</MenuItem>
                                <MenuItem value="Channel 1">Channel 1</MenuItem>
                                <MenuItem value="Channel 2">Channel 2</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Sales Channel"
                                name="salesChannel"
                                value={formData.salesChannel}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Sales Channel</MenuItem>
                                <MenuItem value="Channel 1">Channel 1</MenuItem>
                                <MenuItem value="Channel 2">Channel 2</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ship Service Level"
                                name="shipServiceLevel"
                                value={formData.shipServiceLevel}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Product Name"
                                name="productName"
                                value={formData.productName}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="SKU"
                                name="sku"
                                value={formData.sku}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Item Status"
                                name="itemStatus"
                                value={formData.itemStatus}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Item Status</MenuItem>
                                <MenuItem value="In Stock">In Stock</MenuItem>
                                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Currency"
                                name="currency"
                                value={formData.currency}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Currency</MenuItem>
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Item Price"
                                name="itemPrice"
                                value={formData.itemPrice}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Item Tax"
                                name="itemTax"
                                value={formData.itemTax}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Shipping Price"
                                name="shippingPrice"
                                value={formData.shippingPrice}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Shipping Tax"
                                name="shippingTax"
                                value={formData.shippingTax}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ship City"
                                name="shipCity"
                                value={formData.shipCity}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ship State"
                                name="shipState"
                                value={formData.shipState}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ship Postal Code"
                                name="shipPostalCode"
                                value={formData.shipPostalCode}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ship Country"
                                name="shipCountry"
                                value={formData.shipCountry}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Is IBA"
                                name="isIba"
                                value={formData.isIba}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 250, margin: 2 }}
                            >
                                <MenuItem value="">Select Is IBA</MenuItem>
                                <MenuItem value="true">True</MenuItem>
                                <MenuItem value="false">False</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Selling Fees"
                                name="sellingFees"
                                value={formData.sellingFees}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="FBA Fees"
                                name="fbaFees"
                                value={formData.fbaFees}
                                onChange={handleFormChange}
                                sx={{ width: 250, margin: 2 }}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Shipping Group"
                                name="shippingGroup"
                                value={formData.shippingGroup}
                                onChange={handleFormChange}
                                select
                                sx={{ width: 530, margin: 2 }}
                            >
                                <MenuItem value="">Select Shipping Group</MenuItem>
                                <MenuItem value="Group 1">1</MenuItem>
                                <MenuItem value="Group 2">2</MenuItem>
                                <MenuItem value="Group 3">3</MenuItem>
                                <MenuItem value="Group 4">4</MenuItem>
                                <MenuItem value="Group 5">5</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="contained" onClick={handleSubmit} sx={{ margin: 2 }}>
                                    Add Order
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </>
    );
};

export default AddOrder;