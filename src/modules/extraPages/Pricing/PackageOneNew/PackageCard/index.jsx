import React from "react";
import {
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Fonts } from "@crema/constants/AppEnums";
import CardWrapper from "./CardWrapper";
import PackageWrapper from "./PackageWrapper";
import { FaBoxOpen } from "react-icons/fa";
import { BiSolidShoppingBagAlt } from "react-icons/bi";

const PackageCard = ({ billingFormat, pricing, currentPricing }) => {
  console.log(currentPricing);
  return (

    
    <PackageWrapper>
      <Box
        component="span"
        className="tag"
        sx={{
          backgroundColor: pricing.tagColor,
        }}
      >
        {pricing.tag}
      </Box>

      <CardWrapper>
        <Box
          sx={{
            position: "relative",
            pr: 20,
          }}
        >
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
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.BOLD,
              }}
            >
              ${currentPricing}
            </Box>
            /{billingFormat === "month" ? "Month" : "Year"}
          </Typography>

          {pricing.popular ? (
            <Box className="popular">
              <img src="/assets/images/arrowleft.svg" alt="arrowleft" />
              <Typography
                className="popularText"
                sx={{
                  fontSize: { xs: 12, xl: 14 },
                }}
              >
                {pricing.popular}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box sx={{ minHeight: 40 }}>
          <ListItemIcon
            sx={{
              minWidth: 10,
              mr: 2.5,
            }}
          >
            <FaBoxOpen
              style={{
                fontSize: "18px",
              }}
              sx={{
                mt: 1,
                mb: 3.5,
                color: (theme) => theme.palette.text.primary,
              }}
            />
            &nbsp;{pricing.order}
          </ListItemIcon>

          {pricing.shop ? (
            <ListItemIcon
              sx={{
                minWidth: 10,
                mr: 2.5,
              }}
            >
              <BiSolidShoppingBagAlt
                style={{
                  fontSize: "18px",
                }}
                sx={{
                  mt: 0,
                  mb: 3.5,
                  color: (theme) => theme.palette.text.primary,
                }}
              />
              &nbsp;{pricing.shop}
            </ListItemIcon>
          ) : null}
        </Box>

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
              borderColor: pricing.tagColor,
              "&:hover, &:focus": {
                borderColor: pricing.tagColor,
                borderWidth: 2,
              },
            }}
          >
            {pricing.btnText}
          </Button>
        </Box>
        <Box>{pricing.Ofee}</Box>
        <hr color="#0A8FDC" style={{ marginTop: '30px' }} />

        {pricing.pricingList.map((data, index) => (
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
                  sx={{ display: "flex", alignItems: "center", ml: -3, p: -7 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 10,
                      mr: 2.5,
                    }}
                  >
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
  );
};

PackageCard.propTypes = {
  billingFormat: PropTypes.string,
  pricing: PropTypes.object.isRequired,
  currentPricing: PropTypes.number.isRequired,
};

export default PackageCard;
