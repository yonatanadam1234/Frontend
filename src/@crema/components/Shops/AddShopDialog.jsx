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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getShopAuthorizeUrl, getAccessToken } from './services/AxiosHelper';
import StoreFronturl from './StoreFronturl';
import { postDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from "../../context/AppContextProvider/InfoViewContextProvider";


const AddShopDialog = ({ open, onClose, platform, shops, setShops, getAllShop }) => {
    const infoViewActionsContext = useInfoViewActionsContext();

    const [openstorefronturl, setOpenStorefrontUrl] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [shopValues, setShopValues] = useState({})


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
            timezone: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setShopValues(values)
                const response = await getShopAuthorizeUrl(
                    values.email,
                    platform,
                    values.storeName,
                    values.storefrontURL,
                    values.region,
                    values.timezone
                );
                if (response.data.success) {
                    const redirectUrl = response.data.url;
                    window.location.href = redirectUrl;
                } else {
                    console.error('Error:', response.data);
                }
            } catch (error) {
                console.error(error);
            }


            // const updatedShops = { ...shops };
            // const newShopWithEnabled = {
            //     ...values,
            //     enabled: true,
            // };
            // updatedShops[platform] = [...updatedShops[platform], newShopWithEnabled];
            // setShops(updatedShops);
            resetForm();
            onClose();
        },
    });

    const fetchAccessToken = async (state) => {
        try {
            const response = await getAccessToken(state);
            setAccessToken(response.data.access_token);
            if (response.data.access_token) {
                createShop(response.data.access_token, state)
            }
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };


    const createShop = async (shopToken, state) => {
        try {
            const JWTtoken = localStorage.getItem("token");
            shopValues
            const dataObje = {
                shopType: 'amazon',
                shopId: state,
                shopToken: shopToken,
                storeName: shopValues.storeName,
                region: shopValues.region,
                timezone: shopValues.timezone,
            }
            postDataApi('/shop/create', infoViewActionsContext, dataObje, true, JWTtoken)
            getAllShop()
            onClose();

        } catch (error) {
            console.error('Error creating shop:', error);
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
    ];

    const timezones = [
        { value: "America/Mexico_City", label: "America/Mexico_City" },
        { value: "America/Monterrey", label: "America/Monterrey" },
    ];

    const handleStorefront = () => {
        setOpenStorefrontUrl(true);
    };

    const handleStorefrontUrlClose = () => {
        setOpenStorefrontUrl(false);
    };

    const onHandle = () => {
        const JWTtoken = localStorage.getItem("token");
        const dataObje = {
            shopType: 'amazon',
            shopId: 'state',
            shopToken: 'shopToken',
            storeName: shopValues.storeName,
            region: shopValues.region,
            timezone: shopValues.timezone,
        }

        postDataApi('/shop/create', infoViewActionsContext, dataObje, true, JWTtoken)
        getAllShop()
    }



    return (
        <>
            <button onClick={onHandle}>
                ADDD
            </button>
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
                <form onSubmit={formik.handleSubmit}>
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
                        <Box
                            sx={{
                                cursor: "pointer",
                                color: "blue",
                                marginLeft: 70,
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
