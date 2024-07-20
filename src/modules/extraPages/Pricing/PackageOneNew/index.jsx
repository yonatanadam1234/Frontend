import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import PackageCard from "./PackageCard";
import { useJWTAuth } from "../../../../@crema/services/auth";
import { pricingPlanData } from "./PackageCard/Services/pricing.service";

const PackageOne = ({ billingFormat }) => {
  const { user } = useJWTAuth();
  const [pricingData, setPricingData] = useState([]);

  const getButtonText = (id) => {
    if (id === 1 || id === 2) {
      return "Free";
    }
    if (id === user.subscription) {
      return "Current Plan";
    }
    else {
      return "Buy Plan";

    }

  };

  const fetchPricingData = async () => {
    try {
      const response = await pricingPlanData();
      if (response) {
        if (billingFormat === "month") {
          setPricingData(response.data.data.plans.monthly);
        } else {
          setPricingData(response.data.data.plans.yearly);
        }
      } else {
        console.error("Invalid pricing data response");
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    }
  };

  useEffect(() => {
    fetchPricingData();
  }, [billingFormat]);

  return (
    <React.Fragment>
      <AppGridContainer>
        {
          pricingData.map((data) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={data.id}>
                <PackageCard
                  pricing={data}
                  buttonText={getButtonText(data.id)}
                  billingFormat={billingFormat}
                />
              </Grid>
            );
          })}
      </AppGridContainer>
    </React.Fragment>
  );
};

PackageOne.propTypes = {
  billingFormat: PropTypes.string.isRequired,
};

export default PackageOne;
