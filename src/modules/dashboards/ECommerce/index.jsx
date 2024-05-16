import React from "react";
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

const ECommerce = () => {
  const [{ apiData: ecommerceData, loading }] = useGetDataApi(
    "/dashboard/ecommerce"
  );
  const [{ apiData: analyticsData }] = useGetDataApi("/dashboard/analytics");

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            {/* 1.Profit Focus Boxes: */}
            <Grid container spacing={4} style={{marginLeft:'10px'}}>
              {/* Main Grid Container */}
              <Grid item xs={12} lg={8}>
                {/* Sales State */}
                <Grid item xs={12}>
                  <SalesState
                    salesState={analyticsData.salesState}
                    chartData={analyticsData.salesChartData}
                  />
                </Grid>
              </Grid>

              {/* State Cards Grid */}
              <Grid item xs={12} lg={4}>
                <Grid container spacing={3} style={{marginTop:'7px'}}>
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
            {ecommerceData.reportData.map((data) => (
              <Grid key={data.id} item xs={12} sm={6} lg={3}>
                <ReportCard data={data} />
              </Grid>
            ))}
            {/* sales graph */}
            <Grid item xs={12} md={8} lg={8}>
              <SalesReport />
            </Grid>

            {/* <Grid item xs={12} md={3} lg={3}>
              <BudgetStatistic />
            </Grid> */}

          

            {/* <Grid item xs={12} md={6} lg={5} xl={4}>
              <TopInquiries topInquiries={ecommerceData.topInquiries} />
            </Grid> */}
            <Grid item xs={12} md={6} lg={4} xl={4}>
              <WeeklyBestSellers data={ecommerceData.bestSellers} />
            </Grid>
            

            <Grid item xs={12} md={12} lg={12} xl={12}>
              <RecentOrders recentOrders={ecommerceData.recentOrders} />
            </Grid>
           
            {/* <Grid item xs={12} md={6} lg={6}>
              <MarketingCampaign
                marketingCampaign={ecommerceData.marketingCampaign}
              />
            </Grid> */}
            <Grid item xs={12} md={12} lg={5} xl={5}>
              <Revenue revenueData={ecommerceData.revenueData} />
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <PopularProducts
                popularProducts={ecommerceData.popularProducts}
              />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={3}>
              <RevenueGraph />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <NewCustomers newCustomers={ecommerceData.newCustomers} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Browser browserData={ecommerceData.browser} />
            </Grid> */}
          </AppGridContainer>
        </AppAnimate>
      )}
    </>
  );
};

export default ECommerce;

// import React from 'react';
// import { Grid } from '@mui/material';
// import AppGridContainer from '@crema/components/AppGridContainer';
// import AppAnimate from '@crema/components/AppAnimate';
// import { useGetDataApi } from '@crema/hooks/APIHooks';
// import StateCard from './StateCard';
// import SalesReport from './SalesReport';
// import BudgetStatistic from './BudgetStatistic';
// import TopInquiries from './TopInquiries';
// import WeeklyBestSellers from './WeeklyBestSellers';
// import AgeOfAudience from './AgeOfAudience';
// import ReportCard from './ReportCard';
// import RecentOrders from './RecentOrders';
// import Revenue from './Revenue';
// import RevenueGraph from './RevenueGraph';
// import MarketingCampaign from './MarketingCampaign';
// import NewCustomers from './NewCustomers';
// import PopularProducts from './PopularProducts';
// import Browser from './Browser';
// import AppLoader from '@crema/components/AppLoader';

// const ECommerce = () => {
//   const [{ apiData: ecommerceData, loading }] = useGetDataApi(
//     '/dashboard/ecommerce',
//   );

//   return (
//     <>
//       {loading ? (
//         <AppLoader />
//       ) : (
//         <AppAnimate animation='transition.slideUpIn' delay={200}>
//           <AppGridContainer>
//             {ecommerceData.stateData.map((data) => (
//               <Grid key={data.id} item xs={12} sm={6} lg={3}>
//                 <StateCard data={data} />
//               </Grid>
//             ))}
//             <Grid item xs={12} md={9} lg={9}>
//               <SalesReport />
//             </Grid>
//             <Grid item xs={12} md={3} lg={3}>
//               <BudgetStatistic />
//             </Grid>

//             {ecommerceData.reportData.map((data) => (
//               <Grid key={data.id} item xs={12} sm={6} lg={3}>
//                 <ReportCard data={data} />
//               </Grid>
//             ))}

//             <Grid item xs={12} md={6} lg={5} xl={4}>
//               <TopInquiries topInquiries={ecommerceData.topInquiries} />
//             </Grid>
//             <Grid item xs={12} md={6} lg={4} xl={4}>
//               <WeeklyBestSellers data={ecommerceData.bestSellers} />
//             </Grid>
//             <Grid item xs={12} md={12} lg={3} xl={4}>
//               <Revenue revenueData={ecommerceData.revenueData} />
//             </Grid>

//             <Grid item xs={12} md={12} lg={8} xl={9}>
//               <RecentOrders recentOrders={ecommerceData.recentOrders} />
//             </Grid>
//             <Grid item xs={12} md={6} lg={4} xl={3}>
//               <AgeOfAudience audienceData={ecommerceData.audienceData} />
//             </Grid>
//             <Grid item xs={12} md={6} lg={6}>
//               <MarketingCampaign
//                 marketingCampaign={ecommerceData.marketingCampaign}
//               />
//             </Grid>
//             <Grid item xs={12} md={12} lg={6}>
//               <PopularProducts
//                 popularProducts={ecommerceData.popularProducts}
//               />
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <RevenueGraph />
//             </Grid>
//             <Grid item xs={12} md={6} lg={6}>
//               <NewCustomers newCustomers={ecommerceData.newCustomers} />
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <Browser browserData={ecommerceData.browser} />
//             </Grid>
//           </AppGridContainer>
//         </AppAnimate>
//       )}
//     </>
//   );
// };

// export default ECommerce;
