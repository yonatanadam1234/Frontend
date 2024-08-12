import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fonts } from "@crema/constants/AppEnums";
import { FaBoxOpen } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import {
  useJWTAuth,
  useJWTAuthActions,
} from "../../../../../@crema/services/auth";
import CardWrapper from "./CardWrapper";
import PackageWrapper from "./PackageWrapper";
import jwtAxios from "../../../../../@crema/services/auth/jwt-auth";
import { updateSubscription } from "./Services/pricing.service";

const PackageCard = ({ pricing, buttonText, billingFormat }) => {
  const { setJWTAuthData } = useJWTAuthActions();
  const { user } = useJWTAuth();
  const userId = user.id;

  Paddle.Environment.set("sandbox");
  Paddle.Initialize({
    token: "test_93a75a8090089c728cf1dda482f",
    pwCustomer: {},
    eventCallback: function (data) {
      console.log("🚀 ~ PackageCard ~ data:", data);

      if (data.name === "checkout.completed") {
        handleSuccess(data).then(() => {
          fetchUpdateUser();
        });
      }
    },
  });

  const openCheckout = (priceId) => {
    Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      customData: { any_profit_user_id: user.id },
    });
  };

  const getSubscriptionId = (priceId) => {
    const priceIdMap = {
      pri_01hzey153328nc96wa7xcpja1t: 3,
      pri_01hzey2t6yyvpc1148620mft19: 5,
      pri_01hzey58skrkf53ybt98s3j6y4: 7,
      pri_01hzey22rjs4jsqb357drc7nnf: 4,
      pri_01hzey3gxntw4ck5wgvhdx6bkx: 6,
      pri_01hzey4cb2r0gzts3y1n3kc5xr: 8,
    };
    return priceIdMap[priceId] || null;
  };

  const handleSuccess = async (data) => {
    try {
      console.log("Paddle Checkout Success:", data);
      const priceId = data.data.items[0].price_id;
      console.log("Price ID:", priceId);
      const subscriptionId = getSubscriptionId(priceId);

      if (subscriptionId) {
        const response = await updateSubscription(subscriptionId);
        console.log("Subscription updated successfully:", response);
      } else {
        console.error("Invalid priceId:", priceId);
      }
    } catch (error) {
      console.error("Error handling Paddle Checkout success:", error);
    }
  };

  const handleButtonClick = () => {
    const priceId = pricing.paddle_price_id;
    openCheckout(priceId);
  };

  const fetchUpdateUser = () => {
    const token = localStorage.getItem("token");
    jwtAxios
      .get("auth/user-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        console.log("Updated user data:", data);
        setJWTAuthData({
          user: data.data.user,
          isLoading: false,
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
      <PackageWrapper>
        <Box
          component="span"
          className="tag"
          sx={{ backgroundColor: pricing.color }}
        >
          {pricing.tag}
        </Box>
        <CardWrapper>
          <Box sx={{ position: "relative", pr: 20 }}>
            <Typography
              component="h3"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: { xs: 28, md: 32, lg: 36 },
              }}
            >
              {pricing.title}
            </Typography>
            <Typography
              component="h4"
              sx={{
                fontSize: { xs: 20, md: 22, lg: 24 },
                mb: { xs: 5, lg: 7.5 },
              }}
            >
              <Box component="span" sx={{ fontWeight: Fonts.BOLD }}>
                ${pricing.payment_price}
              </Box>
              /{billingFormat}
            </Typography>
          </Box>
          <Box sx={{ minHeight: 40, display: "flex", flexDirection: "column" }}>
            <ListItemIcon sx={{ minWidth: 10, mr: 2.5 }}>
              <FaBoxOpen
                style={{ fontSize: "18px" }}
                sx={{
                  mt: 1,
                  mb: 3.5,
                  color: (theme) => theme.palette.text.primary,
                }}
              />
              &nbsp;{pricing.quotas.order_title}
            </ListItemIcon>

            {pricing.quotas.shop ? (
              <ListItemIcon sx={{ minWidth: 10, mr: 2.5 }}>
                <BiSolidShoppingBagAlt
                  style={{ fontSize: "18px" }}
                  sx={{
                    mt: 0,
                    mb: 3.5,
                    color: (theme) => theme.palette.text.primary,
                  }}
                />
                &nbsp;Up to {pricing.quotas.shop} Platform
              </ListItemIcon>
            ) : null}
          </Box>

          {buttonText === "Current Plan" || buttonText === "Free" ? (
            <Box sx={{ mb: 7.5, mt: buttonText === "Free" ? 3 : 7 }}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  fontWeight: Fonts.BOLD,
                  color: (theme) => theme.palette.text.primary,
                  minHeight: 46,
                  borderRadius: 7.5,
                  boxShadow: "none",
                  borderWidth: 2,
                  borderColor: pricing.color,
                  "&:hover, &:focus": {
                    borderColor: pricing.color,
                    borderWidth: 2,
                  },
                }}
                onClick={handleButtonClick}
                disabled
              >
                {buttonText}
              </Button>
            </Box>
          ) : (
            <Box sx={{ mb: 7.5, mt: 7 }}>
              <Button
                variant="outlined"
                sx={{
                  width: "100%",
                  fontWeight: Fonts.BOLD,
                  color: (theme) => theme.palette.text.primary,
                  minHeight: 46,
                  borderRadius: 7.5,
                  boxShadow: "none",
                  borderWidth: 2,
                  borderColor: pricing.color,
                  "&:hover, &:focus": {
                    borderColor: pricing.color,
                    borderWidth: 2,
                  },
                }}
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </Box>
          )}

          <Box>
            Extra Order fee: ${pricing.quotas.extra_order_fee} per order
          </Box>
          <hr color="#0A8FDC" style={{ marginTop: "30px" }} />
          {JSON.parse(pricing.quotas.services).map((data, index) => (
            <List key={index}>
              <ListItem sx={{ display: "block", m: 0 }}>
                <Box
                  sx={{
                    color: "#0A8FDC",
                    mb: 5,
                    fontSize: "16px",
                    fontWeight: 1000,
                  }}
                >
                  {data.title}
                </Box>
                {data.allData.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: -3,
                      p: -7,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 10, mr: 2.5 }}>
                      <CheckOutlinedIcon
                        sx={{
                          fontSize: 16,
                          mt: 1,
                          mb: 3.5,
                          color: (theme) => theme.palette.text.primary,
                        }}
                      />
                    </ListItemIcon>
                    <Box sx={{ display: "block", width: "100%", mb: 3.5 }}>
                      {item.title}
                    </Box>
                  </Box>
                ))}
              </ListItem>
            </List>
          ))}
        </CardWrapper>
      </PackageWrapper>
    </>
  );
};

PackageCard.propTypes = {
  pricing: PropTypes.object.isRequired,
};

export default PackageCard;
