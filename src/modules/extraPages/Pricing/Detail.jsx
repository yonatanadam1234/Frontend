import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import PackageOneNew from "./PackageOneNew";
import PricingFaq from "./Faq";
import { pricingData, pricingFaq } from "@crema/mockapi/fakedb/extraPages";

const yearlyPricingData = pricingData.pricingOneNew.map(plan => ({
  ...plan,
  price: plan.price === "00" ? "00" : (parseInt(plan.price, 10) * 12 * 0.8).toFixed(2) // Apply 20% discount for yearly plan
}));

const PricingDetail = () => {
  const [billingFormat, setBillingFormat] = React.useState("month");
  const [currentPricing, setCurrentPricing] = React.useState(pricingData.pricingOneNew);

  const handleBillingFormatChange = (format) => {
    setBillingFormat(format);
    if (format === "year") {
      setCurrentPricing(yearlyPricingData);
    } else {
      setCurrentPricing(pricingData.pricingOneNew);
    }
  };

  return (
    <AppGridContainer>
      <Typography
        variant="h1"
        sx={{ mt: 8, width: "100%", fontSize: 48, textAlign: "center" }}
      >
        Plans that fit your scale
      </Typography>
      <Typography
        variant="body1"
        sx={{
          width: "100%",
          fontSize: 20,
          mt: 3,
          textAlign: "center",
          color: "text.secondary",
          mb: 6,
        }}
      >
        Simple, transparent pricing that grows with you. Try any plan free for 30 days.
      </Typography>
      <Box
        sx={{
          width: "fit-content",
          m: "auto",
          borderRadius: 1.5,
          p: 1,
          bgcolor: (theme) => theme.palette.background.paper,
          display: "flex",
          alignItems: "center",
          ".active": {
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
          },
        }}
      >
        <Box
          className={billingFormat === "month" ? "active" : ""}
          sx={{ p: 3, borderRadius: 1.5, cursor: "pointer" }}
          onClick={() => handleBillingFormatChange("month")}
        >
          Monthly billing
        </Box>
        <Box
          className={billingFormat === "year" ? "active" : ""}
          sx={{ p: 3, borderRadius: 1.5, cursor: "pointer" }}
          onClick={() => handleBillingFormatChange("year")}
        >
          Yearly billing
        </Box>
        <Box
          sx={{ borderRadius: "20px", bgcolor: "#F2F4F7", ml: 3, p: "4px 8px" }}
        >
          Save 20%
        </Box>
      </Box>
      <Grid item xs={12}>
        <PackageOneNew
          billingFormat={billingFormat}
          pricing={currentPricing}
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 7 }}>
        <PricingFaq pricingFaq={pricingFaq} />
      </Grid>
    </AppGridContainer>
  );
};

export default PricingDetail;
