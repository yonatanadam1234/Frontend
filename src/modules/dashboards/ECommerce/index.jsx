import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import AppAnimate from "@crema/components/AppAnimate";
import ReportCard from "./ReportCard";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import PopularProducts from "./PopularProducts";
import AppLoader from "@crema/components/AppLoader";
import { getShopData } from "../../../@crema/components/Shops/services/shop.service";
import { useJWTAuth } from "../../../@crema/services/auth";
import AddShopContainer from "./AddShopContainer";
import ExpenseState from "../Analytics/ExpenseState/ExpenseState";
import SalesState from "../Analytics/SalesState/SalesState";
// import { getexpenseprofitData, getpopularProduct, getrecentOrder, getreportData, getrevenueData, getsalesgraphData } from "./services/dashboard.service";
import { useGetDataApi } from "@crema/hooks/APIHooks";

const ECommerce = () => {
  const [{ apiData: ecommerceData, loading }] = useGetDataApi(
    "/dashboard/ecommerce"
  );
  const [openFirstShopPopup, setOpenFirstShopPopup] = useState(false);
  const { user } = useJWTAuth();
  // const [reportData, setReportData] = useState([]);
  // const [salesChartData, setsalesChartData] = useState()
  // const [expenseProfitData, setExpenseProfitData] = useState([])
  // const [recentOrders, setrecentOrders] = useState([])
  // const [revenueData, setrevenueData] = useState([])
  // const [popularProducts, setPopularProducts] = useState([])
  // const [loading, setloading] = useState(true)


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

  const handleCloseShopPopup = () => {
    setOpenFirstShopPopup(false);
  };

  // useEffect(() => {
  //   const getReportData = async () => {
  //     try {
  //       const response = await getreportData();
  //       if (response.data && response.data.reportData) {
  //         setReportData(response.data.reportData);
  //         setloading(false)
  //       } else {
  //         console.error(
  //           "---------------error----------------"
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getReportData();
  // }, []);


  // useEffect(() => {
  //   const getSalesGraphData = async () => {
  //     try {
  //       const response = await getsalesgraphData();
  //       if (response.data && response.data.salesChartData) {
  //         setsalesChartData(response.data.salesChartData);

  //       } else {
  //         console.error(
  //           "--------------error--------------"
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getSalesGraphData();
  // }, []);


  // useEffect(() => {
  //   const getExpenseProfitData = async () => {
  //     try {
  //       const response = await getexpenseprofitData();
  //       if (response.data && response.data.expenseProfitData) {
  //         setExpenseProfitData(response.data.expenseProfitData);

  //       } else {
  //         console.error(
  //           "--------------error--------------"
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getExpenseProfitData();
  // }, []);


  // useEffect(() => {
  //   const getRecentOrders = async () => {
  //     try {
  //       const response = await getrecentOrder();

  //       if (response.data) {
  //         setrecentOrders(response.data.recentOrder);

  //       } else {
  //         console.error(
  //           "--------------error--------------"
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getRecentOrders();
  // }, []);


  // useEffect(() => {
  //   const getRevenueData = async () => {
  //     try {
  //       const response = await getrevenueData();
  //       if (response.data && response.data.revenueData) {
  //         setrevenueData(response.data.revenueData);

  //       } else {
  //         console.error(
  //           "--------------error--------------"
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getRevenueData();
  // }, []);

  // useEffect(() => {
  //   const getPopularProduct = async () => {
  //     try {
  //       const response = await getpopularProduct();
  //       if (response.data ) {
  //         setPopularProducts(response.data.product);

  //       } else {
  //         console.error('Error: product is undefined');
  //       }
  //     } catch (error) {
  //       console.error("Error fetching report data:", error);
  //     }
  //   };
  //   getPopularProduct();
  // }, []);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppGridContainer>
            {
              ecommerceData.reportData.map((data) => (
                <Grid key={data.id} item xs={12} sm={6} lg={3}>                        
                  <ReportCard data={data} />
                </Grid>
              ))}

            <Grid item xs={12} md={6} lg={12}>
              <SalesState chartData={ecommerceData.salesChartData} />
            </Grid>
            <Grid item xs={12}>
              <ExpenseState chartData={ecommerceData.expenseProfitData} />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <RecentOrders
              listings={ecommerceData.recentOrders} 
              />
            </Grid>

            <Grid item xs={12} md={12} lg={5} xl={4}>
              <Revenue revenueData={ecommerceData.revenueData} />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <PopularProducts popularProducts={ecommerceData.product} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      )}
      <AddShopContainer
        open={openFirstShopPopup}
        handleCloseShopPopup={handleCloseShopPopup}
      />
    </>
  );
};

export default ECommerce;










// import React, { useCallback, useEffect, useState } from "react";
// import { Grid } from "@mui/material";
// import AppGridContainer from "@crema/components/AppGridContainer";
// import AppAnimate from "@crema/components/AppAnimate";
// import { useGetDataApi } from "@crema/hooks/APIHooks";
// import StateCard from "./StateCard";
// // import SalesReport from "./SalesReport";
// import BudgetStatistic from "./BudgetStatistic";
// import TopInquiries from "./TopInquiries";
// import WeeklyBestSellers from "./WeeklyBestSellers";
// import AgeOfAudience from "./AgeOfAudience";
// import ReportCard from "./ReportCard";
// import RecentOrders from "./RecentOrders";
// import Revenue from "./Revenue";
// import RevenueGraph from "./RevenueGraph";
// import MarketingCampaign from "./MarketingCampaign";
// import NewCustomers from "./NewCustomers";
// import PopularProducts from "./PopularProducts";
// import Browser from "./Browser";
// import AppLoader from "@crema/components/AppLoader";
// import { getShopData } from "../../../@crema/components/Shops/services/shop.service";
// import { useJWTAuth } from "../../../@crema/services/auth";
// import AddShopContainer from "./AddShopContainer";
// import ExpenseState from "../Analytics/ExpenseState/ExpenseState";
// import SalesState from "../Analytics/SalesState/SalesState";

// const ECommerce = () => {
//   const [{ apiData: ecommerceData, loading }] = useGetDataApi(
//     "/dashboard/ecommerce"
//   );
//   const [openFirstShopPopup, setOpenFirstShopPopup] = useState(false);
//   const { user } = useJWTAuth();

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await getShopData(user.id);
//       if (response.data && response.data.length > 0) {
//         setOpenFirstShopPopup(false);
//       } else {
//         setOpenFirstShopPopup(true);
//       }
//     } catch (error) {
//       console.error("Error fetching shop data:", error);
//       setOpenFirstShopPopup(true);
//     }
//   }, [user.id]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleCloseShopPopup = () => {
//     setOpenFirstShopPopup(false);
//   }
//   return (
//     <>
//       {loading ? (
//         <AppLoader />
//       ) : (
//         <AppAnimate animation="transition.slideUpIn" delay={200}>
//           <AppGridContainer>
//             {ecommerceData.reportData.map((data) => (
//               <Grid key={data.id} item xs={12} sm={6} lg={3}>
//                 <ReportCard data={data} />
//               </Grid>
//             ))}
//             <Grid item xs={12} md={6} lg={12}>
//               <SalesState
//                 salesState={ecommerceData.salesState}
//                 chartData={ecommerceData.salesChartData} />
//             </Grid>
//             {/* <Grid item xs={3} >
//                 <Grid container spacing={6} >
//                   {ecommerceData.stateData.slice(0, 3).map((data) => (
//                     <Grid key={data.id} item xs={12} >
//                       <StateCard data={data} />
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Grid> */}
//             <Grid item xs={12} lg={12}>
//               <Grid item xs={12}>
//                 <ExpenseState />
//               </Grid>
//               {/* State Cards Grid */}
//               {/* <Grid item xs={12} lg={4}>
//                 <Grid container spacing={3} sx={{ mt: 12 }}> */}
//               {/* State Cards (Upper Row) */}
//               {/* </Grid>
//               </Grid> */}
//             </Grid>
//             <Grid item xs={12} md={12} lg={12} xl={12}>
//               <RecentOrders recentOrders={ecommerceData.recentOrders} />
//             </Grid>
//             <Grid item xs={12} md={12} lg={5} xl={4}>
//               <Revenue revenueData={ecommerceData.revenueData} />
//             </Grid>
//             {/* <Grid item xs={12} md={6} lg={4} xl={4} >
//               <TopInquiries topInquiries={ecommerceData.topInquiries} />
//             </Grid> */}
//             {/* <Grid item xs={12} md={6} lg={4}>
//               <RevenueGraph />
//             </Grid> */}
//             <Grid item xs={12} md={12} lg={8}>
//               <PopularProducts
//                 popularProducts={ecommerceData.popularProducts}
//               />
//             </Grid>
//             {/* <Grid item xs={12} md={4} lg={4}>
//               <BudgetStatistic />
//             </Grid> */}
//           </AppGridContainer>
//         </AppAnimate>
//       )}
//       <AddShopContainer open={openFirstShopPopup} handleCloseShopPopup={handleCloseShopPopup} />
//     </>
//   );
// };

// export default ECommerce;
