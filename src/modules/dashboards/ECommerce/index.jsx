import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import AppAnimate from "@crema/components/AppAnimate";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import StateCard from "./StateCard";
import SalesReport from "./SalesReport";
import BudgetStatistic from "./BudgetStatistic";
import TopInquiries from "./TopInquiries";
import WeeklyBestSellers from "./WeeklyBestSellers";
import AgeOfAudience from "./AgeOfAudience";
import ReportCard from "./ReportCard";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import RevenueGraph from "./RevenueGraph";
import MarketingCampaign from "./MarketingCampaign";
import NewCustomers from "./NewCustomers";
import PopularProducts from "./PopularProducts";
import Browser from "./Browser";
import AppLoader from "@crema/components/AppLoader";
import SalesState from "../Analytics/SalesState";
import { getShopData } from "../../../@crema/components/Shops/services/shop.service";
import { useJWTAuth } from "../../../@crema/services/auth";
import AddShopContainer from "./AddShopContainer";

const ECommerce = () => {
  const [{ apiData: ecommerceData, loading }] = useGetDataApi(
    "/dashboard/ecommerce"
  );
  const [openFirstShopPopup, setOpenFirstShopPopup] = useState(false);
  const { user } = useJWTAuth();

  const fetchData = useCallback(async () => {
    try {
      const response = await getShopData(user.id);
      if (response.data && response.data.length > 0) {
        setOpenFirstShopPopup(false);
      } else {
        setOpenFirstShopPopup(true);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
      setOpenFirstShopPopup(true);
    }
  }, [user.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCloseShopPopup=()=>{
    setOpenFirstShopPopup(false);
  }
  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            {ecommerceData.reportData.map((data) => (
              <Grid key={data.id} item xs={12} sm={6} lg={3}>
                <ReportCard data={data} />
              </Grid>
            ))}

            {/* 1.Profit Focus Boxes: */}
            <Grid container spacing={4} style={{ marginLeft: '10px' }}>
              {/* Main Grid Container */}
              <Grid item xs={12} lg={8}>
                {/* Sales State */}
                <Grid item xs={12}>
                  <SalesState
                    salesState={ecommerceData.salesState}
                    chartData={ecommerceData.salesChartData}
                  />
                </Grid>
              </Grid>

              {/* State Cards Grid */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={3} sx={{ mt: 12 }}>
                  {/* State Cards (Upper Row) */}
                  <Grid item xs={12}>
                    <Grid container spacing={6} direction="column">
                      {ecommerceData.stateData.slice(0, 3).map((data) => (
                        <Grid key={data.id} item xs={12}>
                          <StateCard data={data} />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <RecentOrders recentOrders={ecommerceData.recentOrders} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <RevenueGraph />
            </Grid>
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <Revenue revenueData={ecommerceData.revenueData} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={4} >
              <TopInquiries topInquiries={ecommerceData.topInquiries} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <PopularProducts
                popularProducts={ecommerceData.popularProducts}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <BudgetStatistic />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      )}
      <AddShopContainer open={openFirstShopPopup} handleCloseShopPopup={handleCloseShopPopup}  />
    </>
  );
};

export default ECommerce;
