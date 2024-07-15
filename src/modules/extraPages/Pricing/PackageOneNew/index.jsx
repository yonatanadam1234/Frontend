import React from "react";
import PropTypes from "prop-types";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import PackageCard from "./PackageCard";
import pricingData from "@crema/mockapi/fakedb/extraPages/pricing";
import { useAuthUser } from "../../../../@crema/hooks/AuthHooks";
import { useJWTAuth } from "../../../../@crema/services/auth";

const PackageOne = ({ billingFormat }) => {
  console.log("🚀 ~ PackageOne ~ billingFormat:", billingFormat)
  const { user } = useJWTAuth();

  const getButtonText = (id) => {
    if (id === 0) {
      return "Free";
    }
    const isCurrentPlanMonthly = billingFormat === "month" && id === user.subscription;
    const isCurrentPlanYearly = billingFormat === "year" && (id + 3) === user.subscription;

    if (isCurrentPlanMonthly || isCurrentPlanYearly) {
      return "Current Plan";
    }
    
    if (billingFormat === "month") {
      if (id > user.subscription) {
        return "Upgrade Plan";
      } else {
        return "Buy Plan";
      }
    } else if (billingFormat === "year") {
      const yearlyId = id + 3; 
      if (yearlyId > user.subscription) {
        return "Upgrade Plan";
      } else {
        return "Buy Plan";
      }
    }
    return "Buy Plan";
  };

  return (
    <AppGridContainer>
      {pricingData.pricingOneNew.map((data) => {
        const currentPricing =
          billingFormat === "month" ? data.monthlyprice : data.yearlyprice;

        return (
          <Grid item xs={12} sm={6} md={3} key={data.id}>
            <PackageCard
              billingFormat={billingFormat}
              currentPricing={currentPricing}
              pricing={data}
              btnText={getButtonText(data.id)}
            />
          </Grid>
        );
      })}
    </AppGridContainer>
  );
};

PackageOne.propTypes = {
  billingFormat: PropTypes.string.isRequired,
};

export default PackageOne;
