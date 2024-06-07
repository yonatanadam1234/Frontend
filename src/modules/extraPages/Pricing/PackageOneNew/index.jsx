import React from "react";
import PropTypes from "prop-types";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import PackageCard from "./PackageCard";
import pricingData from "@crema/mockapi/fakedb/extraPages/pricing";
// import { Environment, Paddle } from '@paddle/paddle-node-sdk'
const PackageOne = ({ billingFormat }) => {

  return (
    <AppGridContainer>

      {pricingData.pricingOneNew.map((data) => {
        const currentPricing =
          billingFormat === "month" ? data.price : data.yearlyprice;

        return (
          <Grid item xs={12} sm={6} md={3} key={data.id}>
            <PackageCard
              billingFormat={billingFormat}
              currentPricing={currentPricing}
              pricing={data}
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




// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import AppGridContainer from "@crema/components/AppGridContainer";
// import Grid from "@mui/material/Grid";
// import PackageCard from "./PackageCard";
// import pricingData from "@crema/mockapi/fakedb/extraPages/pricing";

// // Ensure Paddle script is loaded in your public/index.html or load it dynamically
// const loadPaddleScript = () => {
//   if (!window.Paddle) {
//     const script = document.createElement('script');
//     script.src = "https://cdn.paddle.com/paddle/paddle.js";
//     script.async = true;
//     script.onload = () => {
//       window.Paddle.Setup({ vendor: YOUR_VENDOR_ID }); // replace with your Paddle Vendor ID
//     };
//     document.head.appendChild(script);
//   }
// };

// const PackageOne = ({ billingFormat }) => {
//   const [prices, setPrices] = useState([]);

//   useEffect(() => {
//     loadPaddleScript();

//     // Define items for month and year
//     const monthItems = [
//       { quantity: 1, priceId: "pri_01hzey153328nc96wa7xcpja1t" },
//       { quantity: 1, priceId: "pri_01hzey2t6yyvpc1148620mft19" },
//       { quantity: 1, priceId: "pri_01hzevc65jj6xj4j84gxc22ysv" },
//     ];

//     const yearItems = [
//       { quantity: 1, priceId: "pri_01hzey4cb2r0gzts3y1n3kc5xr" },
//       { quantity: 1, priceId: "pri_01hzey58skrkf53ybt98s3j6y4" },
//     ];

//     const itemsList = billingFormat === "month" ? monthItems : yearItems;

//     const fetchPrices = async () => {
//       try {
//         const request = { items: itemsList };
//         const result = await window.Paddle.PricePreview(request);
//         setPrices(result);
//         console.log("plans", result);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPrices();
//   }, [billingFormat]);

//   return (
//     <AppGridContainer>
//       {pricingData.pricingOneNew.map((data) => {
//         const currentPricing =
//           billingFormat === "month" ? data.price : data.yearlyprice;

//         return (
//           <Grid item xs={12} sm={6} md={3} key={data.id}>
//             <PackageCard
//               billingFormat={billingFormat}
//               currentPricing={currentPricing}
//               pricing={data}
//             />
//           </Grid>
//         );
//       })}
//     </AppGridContainer>
//   );
// };

// PackageOne.propTypes = {
//   billingFormat: PropTypes.string.isRequired,
// };

// export default PackageOne;
