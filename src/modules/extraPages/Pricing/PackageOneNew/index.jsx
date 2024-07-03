import React from "react";
import PropTypes from "prop-types";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import PackageCard from "./PackageCard";
import pricingData from "@crema/mockapi/fakedb/extraPages/pricing";
import { useAuthUser } from "../../../../@crema/hooks/AuthHooks";

const PackageOne = ({ billingFormat }) => {
  const { user } = useAuthUser();

  const getButtonText = (id) => {
    if (id===0) {return "Try Now";}
    
    if (billingFormat === "month") {
      if (id > user.subscriptionPlan) {
        return "Upgrade";
      } else {
        return "Buy Now";
      }
    } else if (billingFormat === "year") {
      const yearlyId = id + 3; // map monthly IDs (0-3) to yearly IDs (4-6)
      if (yearlyId > user.subscriptionPlan) {
        return "Upgrade";
      } else {
        return "Buy Now";
      }
    }
    return "buy Now";
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
