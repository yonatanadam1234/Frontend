import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Box,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import StoreFronturl from './StoreFronturl';
import { getAccessToken, getShopAuthorizeUrl, getShopData } from "./services/shop.service";
import { useAuthUser } from "../../hooks/AuthHooks";

const AddShopDialog = ({ open, onClose, platform, setShops, toast }) => {

    const [openstorefronturl, setOpenStorefrontUrl] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const { user } = useAuthUser();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        storeName: Yup.string().required("Store Name is required"),
        storefrontURL: Yup.string()
            .url("Invalid URL format")
            .required("Storefront URL is required"),
        region: Yup.string().required("Region is required"),
        timezone: Yup.string().required("Timezone is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            storeName: "",
            storefrontURL: "https://",
            region: "",
            timezone: ""
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const obj = {
                    email: values.email,
                    region: values.region,
                    platform: platform,
                    store_name: values.storeName,
                    store_url: values.storefrontURL,
                    time_zone: values.timezone,
                    userId: user.id
                }
                const response = await getShopAuthorizeUrl(obj);
                if (response.data.success) {
                    const redirectUrl = response.data.url;
                    window.location.href = redirectUrl;
                } else {
                    console.log('Error:', response.data);
                    if (response.data.errors.email) {
                        toast.error('The Email Entered is Already Taken.');
                    } else {
                        toast.error('Failed to add shop. Please try again later.');
                    }
                }
            } catch (error) {
                toast.error('Failed to add shop. Please try again later.');
            }
            resetForm();
            onClose();
        },
    });

    const fetchShops = async () => {
        try {
            const response = await getShopData(user.id);
            if (response.data.success) {
                setShops(response.data.shops);
            } else {
                toast.error('Error:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching shop data:', error);
        }
    };

    const fetchAccessToken = async (state) => {
        try {
            const response = await getAccessToken(state);
            setAccessToken(response.data.access_token);
            if (response.data.access_token) {
                fetchShops();
            }
        } catch (error) {
            toast.error('Error fetching access token:', error);
        }
    };


    useEffect(() => {
        const state = getStateFromUrl();
        if (state) {
            const params = new URLSearchParams(window.location.search);
            if (params.has("state")) {
                params.delete("state");
                const newSearch = params.toString();
                const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}`;
                window.history.replaceState(null, '', newUrl);
            }
            fetchAccessToken(state);
        }
    }, []);


    const getStateFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('state');
    };

    const region = [
        { value: "US", label: "United States" },
        { value: "Uk", label: "United Kingdom" },
    ];

    const timezones = [
        { value: "Europe/London", label: "Europe/London" },
        { value: "Europe/Belfast", label: "Europe/Belfast" },
        { value: "Europe/Glasgow", label: "Europe/Glasgow" },
        { value: "Europe/Dublin", label: "Europe/Dublin" },
        { value: "Europe/Lisbon", label: "Europe/Lisbon" },
        { value: "Europe/Paris", label: "Europe/Paris" },
        { value: "Europe/Berlin", label: "Europe/Berlin" },
        { value: "Europe/Rome", label: "Europe/Rome" },
        { value: "Europe/Madrid", label: "Europe/Madrid" },
        { value: "Europe/Amsterdam", label: "Europe/Amsterdam" },
        { value: "Europe/Stockholm", label: "Europe/Stockholm" },
        { value: "Europe/Copenhagen", label: "Europe/Copenhagen" },
        { value: "Europe/Athens", label: "Europe/Athens" },
        { value: "Europe/Istanbul", label: "Europe/Istanbul" },
        { value: "America/Mexico_City", label: "America/Mexico_City" },
        { value: "America/Monterrey", label: "America/Monterrey" },
        { value: "America/New_York", label: "America/New_York" },
        { value: "America/Chicago", label: "America/Chicago" },
        { value: "America/Denver", label: "America/Denver" },
        { value: "America/Los_Angeles", label: "America/Los_Angeles" },
        { value: "America/Anchorage", label: "America/Anchorage" },
        { value: "America/Honolulu", label: "America/Honolulu" },
        { value: "America/Phoenix", label: "America/Phoenix" },
        { value: "America/Indianapolis", label: "America/Indianapolis" },
    ];

    const handleStorefront = () => {
        setOpenStorefrontUrl(true);
    };

    const handleStorefrontUrlClose = () => {
        setOpenStorefrontUrl(false);
    };
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", fontSize: 18 }}>
                    Add {platform} Shop
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogTitle sx={{ fontSize: 14 }}>
                    Fill in the following details to connect to BeProfit with your {platform} store
                </DialogTitle>
                <form onSubmit={(e) => formik.handleSubmit(e)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            type="email"
                            margin="dense"
                            label="Email"
                            fullWidth
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="dense"
                            label="Store Name"
                            fullWidth
                            name="storeName"
                            value={formik.values.storeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.storeName && Boolean(formik.errors.storeName)}
                            helperText={formik.touched.storeName && formik.errors.storeName}
                        />
                        {platform === 'amazon' ? (
                            <>
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        color: "blue",
                                        marginLeft: 80,
                                        paddingTop: 2,
                                        "&:hover": { color: "black" },
                                    }}
                                    onClick={handleStorefront}
                                >
                                    Can't find your storefront URL?
                                </Box>
                                <TextField
                                    margin="dense"
                                    label="Storefront URL"
                                    fullWidth
                                    name="storefrontURL"
                                    value={formik.values.storefrontURL}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.storefrontURL && Boolean(formik.errors.storefrontURL)}
                                    helperText={formik.touched.storefrontURL && formik.errors.storefrontURL}
                                />
                            </>
                         ) : (
                            <></>
                        )} 
                        <TextField
                            select
                            margin="dense"
                            label={`${platform} Region`}
                            fullWidth
                            name="region"
                            value={formik.values.region}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.region && Boolean(formik.errors.region)}
                            helperText={formik.touched.region && formik.errors.region}
                        >
                            {region.map((option) => (
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
                            value={formik.values.timezone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.timezone && Boolean(formik.errors.timezone)}
                            helperText={formik.touched.timezone && formik.errors.timezone}
                        >
                            {timezones.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <DialogActions sx={{ display: "flex", justifyContent: "space-between", mx: 2, mb: 1 }}>
                        <Button sx={{ cursor: "pointer", color: "blue", "&:hover": { color: "black" } }}>
                            Need Help?
                        </Button>
                        <Button type="submit" sx={{ color: "#000" }}>
                            Add Shop
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <StoreFronturl
                open={openstorefronturl}
                onClose={handleStorefrontUrlClose}
            />

        </>
    );
};

AddShopDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    platform: PropTypes.string.isRequired,
    shops: PropTypes.object.isRequired,
    setShops: PropTypes.func.isRequired,
};

export default AddShopDialog;