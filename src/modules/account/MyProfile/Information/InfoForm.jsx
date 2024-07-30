import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Form } from "formik";
import PropTypes from "prop-types";
import { Button } from "@mui/base";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useJWTAuth,
  useJWTAuthActions,
} from "../../../../@crema/services/auth";
import { pricingPlanData } from "../../../extraPages/Pricing/PackageOneNew/PackageCard/Services/pricing.service";
import jwtAxios from "../../../../@crema/services/auth/jwt-auth";
import AppLoader from "../../../../@crema/components/AppLoader";

const InfoForm = () => {
  const { user } = useJWTAuth();
  const { setJWTAuthData } = useJWTAuthActions();
  const [pricingPlans, setPricingPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate("/extra-pages/pricing-detail");
  };

  const fetchPricingData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await pricingPlanData();
      if (
        response &&
        response.data &&
        response.data.data &&
        response.data.data.plans
      ) {
        setPricingPlans(response.data.data.plans);
      } else {
        console.error("Invalid pricing data response");
      }
    } catch (error) {
      console.error("Error fetching pricing data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPricingData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      jwtAxios
        .get("auth/user-data", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setJWTAuthData({
            user: data.data.user,
            isLoading: false,
            isAuthenticated: true,
          });
        });
    }
  }, [setJWTAuthData]);

  const getPlanById = useMemo(() => {
    const planById = (id) => {
      let plan = null;
      Object.keys(pricingPlans).forEach((interval) => {
        pricingPlans[interval].forEach((planData) => {
          if (planData.id === parseInt(id)) {
            plan = planData;
          }
        });
      });
      return plan;
    };
    return planById;
  }, [pricingPlans]);

  const currentPlan = useMemo(
    () => getPlanById(user?.subscription),
    [user?.subscription, pricingPlans]
  );
  console.log("🚀 ~ InfoForm ~ currentPlan:", currentPlan);

  return (
    <Form autoComplete="off">
      <Typography sx={{ my: 3, fontSize: "20px" }}>
        Subscription Plan
      </Typography>

      {loading ? (
        <Box sx={{ py: "100px" }}>
          <AppLoader />
        </Box>
      ) : (
        <>
          <Typography>
            Your current plan: {currentPlan ? currentPlan.tag : "Unknown"}
          </Typography>
          <br />
          {currentPlan && (
            <div>
              <h2>{currentPlan.title}</h2>
              <p>Price: ${currentPlan.payment_price}</p>
              {currentPlan.id !== 1 && currentPlan.id !== 2 && (
                <p>Duration: {currentPlan.payment_interval_unit}</p>
              )}
            </div>
          )}

          {currentPlan?.id !== 8 && (
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{
                    padding: "10px",
                    borderRadius: "8%",
                    margin: "15px 0px",
                    background: "#0A8FDC",
                    border: "none",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={handleUpgrade}
                >
                  Upgrade Plan
                </Button>
              </Box>
            </Grid>
          )}
        </>
      )}
    </Form>
  );
};

InfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default InfoForm;
