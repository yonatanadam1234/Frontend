import React, { useState } from "react";
import { Box, Grid, List, Typography } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import PackageOneNew from "./PackageOneNew";
import PricingFaq from "./Faq";
import Enterprise from "./Enterprise/PackageCard/index";
import { pricingFaq } from "@crema/mockapi/fakedb/extraPages";

const PricingDetail = () => {
  const [billingFormat, setBillingFormat] = useState("month");


  return (
    <AppGridContainer>
      <Typography
        variant="h1"
        sx={{ mt: 8, width: "100%", fontSize: 48, textAlign: "center" }}
      >
        Pricing
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
        Simple, transparent pricing that grows with you. Try any plan free for
        30 days.
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
          "& .active": {
            boxShadow:
              "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
          },
        }}
      >
        <Box
          className={billingFormat === "month" ? "active" : ""}
          sx={{ p: 3, borderRadius: 1.5, cursor: "pointer" }}
          onClick={() => setBillingFormat("month")}
        >
          Monthly billing
        </Box>
        <Box
          className={billingFormat === "year" ? "active" : ""}
          sx={{ p: 3, borderRadius: 1.5, cursor: "pointer" }}
          onClick={() => setBillingFormat("year")}
        >
          Yearly billing
        </Box>
        <Box
          className={billingFormat === "enterprise" ? "active" : ""}
          sx={{ p: 3, borderRadius: 1.5, cursor: "pointer" }}
          onClick={() => setBillingFormat("enterprise")}
        >
          EnterPrise
        </Box>
      </Box>

      {billingFormat === "month" && (
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <PackageOneNew billingFormat={billingFormat} />
          </Box>
        </Grid>
      )}

      {billingFormat === "year" && (
        <Grid item xs={12}>
          <Box sx={{ mt: 4 }}>
            <PackageOneNew billingFormat={billingFormat} />
          </Box>
        </Grid>
      )}

      {billingFormat === "enterprise" && (
        <Grid item xs={12}>
          <Box sx={{ width: "30%", margin: "auto", mt: 4 }}>
            <Enterprise />
          </Box>
        </Grid>
      )}

      <Grid item xs={12} sx={{ mt: 45 }}>
        <PricingFaq pricingFaq={pricingFaq} />
      </Grid>
    </AppGridContainer>
  );
};

export default PricingDetail;
