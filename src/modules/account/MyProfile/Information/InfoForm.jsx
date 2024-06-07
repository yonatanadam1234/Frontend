import React from 'react';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import { useAuthMethod } from '../../../../@crema/hooks/AuthHooks';

const InfoForm = () => {
  const { handleSignup } = useAuthMethod();

  // Define your pricing data here
  const pricingData = [
    {
      id: 1,
      tag: "Free",
      tagColor: "#0A8FDC",
      title: "Free",
      btnText: "Try Now",
      price: "00",
      yearlyprice: "00",
      order: " Up to 200 Orders",
      shop: "2 Shop",
      Ofee: "Extra Order fee : $0.3 per order",
      pricingList: [
        {
          title: "Free Plan Included :",
          allData: [
            {
              id: 1,
              title: "Live Profit Monitoring Dashboard",
            },
            {
              id: 2,
              title: "Daily Earnings Summary Email",
            },
            {
              id: 3,
              title: "Data refresh 2 times a day",
            },
            {
              id: 4,
              title: "Analytics for Orders & Products",
            },
            {
              id: 5,
              title: "Enhanced Expense Management",
            },
            {
              id: 6,
              title: "Unlimited Account Access",
            },
          ],
        },
        {
          title: "Comprehensive Analytics Suite :",
          allData: [
            {
              id: 7,
              title: "Shipping",
            },
            {
              id: 8,
              title: "Discount",
            },
            {
              id: 9,
              title: "Product",
            },
            {
              id: 10,
              title: "Returns",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      tag: "Basic",
      tagColor: "#11C15B",
      title: "Basic",
      btnText: "Buy Now",
      price: 29,
      yearlyprice: 310,
      productId: "pro_01hzexrm11ve9tey0y6ccer6cg", // Basic Plan Product ID
      order: " Up to 600 Orders",
      shop: "2 Shop",
      Ofee: "Extra Order fee : $0.3 per order",
      pricingList: [
        {
          title: "Basic Plan Included  :",
          allData: [
            {
              id: 1,
              title: "Free Data Refresh",
            },
            {
              id: 2,
              title: "Detailed Earnings Insights",
            },
            {
              id: 3,
              title: "Tailored Platform Options",
            },
            {
              id: 4,
              title: "Sophisticated Earnings Filters",
            },
            {
              id: 5,
              title: "Marketing Performance Analytics",
            },
            {
              id: 6,
              title: "One-Year Data Retention",
            },
            {
              id: 7,
              title: "Data Retention for 6 month",
            },
          ],
        },
        {
          title: "Comprehensive Analytics Suite :",
          allData: [
            {
              id: 8,
              title: "Shipping",
            },
            {
              id: 9,
              title: "Discount",
            },
            {
              id: 10,
              title: "Product",
            },
            {
              id: 12,
              title: "Inventory",
            },

            {
              id: 13,
              title: "Returns",
            },
          ],
        },
      ],
    },

    {
      id: 3,
      tag: "Pro",
      tagColor: "#FF8B26",
      title: "Pro",
      btnText: "Buy Now",
      price: 49,
      yearlyprice: 520,
      productId: "pro_01hzexsjwknykwdje8p596zz8b", // Pro Plan Product ID
      popular: "Most popular!",
      order: " Up to 1200 Orders",
      Ofee: "Extra Order fee : $0.1 per order",
      pricingList: [
        {
          title: "Pro Plan Included  :",
          allData: [
            {
              id: 1,
              title: "One Demand Data Refresh",
            },
            {
              id: 2,
              title: "Detailed Earnings Insights",
            },
            {
              id: 3,
              title: "Tailored Platform Options",
            },
            {
              id: 4,
              title: "Sophisticated Earnings Filters",
            },
            {
              id: 5,
              title: "Marketing Performance Analytics",
            },
            {
              id: 6,
              title: "Two-Year Data Retention",
            },
            {
              id: 7,
              title: "Data Retention for 6 month",
            },
          ],
        },
        {
          title: "Comprehensive Analytics Suite :",
          allData: [
            {
              id: 8,
              title: "Shipping",
            },
            {
              id: 9,
              title: "Discount",
            },
            {
              id: 10,
              title: "Product",
            },
            {
              id: 12,
              title: "Inventory",
            },

            {
              id: 13,
              title: "Returns",
            },
            {
              id: 14,
              title: "Processings",
            },
            {
              id: 15,
              title: "Gateways",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      tag: "Premium",
      tagColor: "#F04F47",
      title: "Premium",
      btnText: "Buy Now",
      price: 69,
      yearlyprice: 730,
      productId: "pro_01hzexv1q0kksfqzk2cd07d911", // Premium Plan Product ID
      order: " Unlimited Orders",
      Ofee: "Extra Order fee : No extra order fee",
      pricingList: [
        {
          title: "Premium Plan Included   :",
          allData: [
            {
              id: 1,
              title: "Premium Plan Enhancements",
            },
            {
              id: 2,
              title: "Unlimited Data History",
            },
            {
              id: 3,
              title: "Tailored Metrics and Reports",
            },
            {
              id: 4,
              title: "Automated Workspace Reporting",
            },
            {
              id: 5,
              title: "Custom Integrations and API Access",
            },
            {
              id: 6,
              title: "Industry Benchmark Reporting",
            },
            {
              id: 7,
              title: "Comprehensive Multi-Shop Analytics",
            },
            {
              id: 8,
              title: "Centralized Shop Reporting",
            },
            {
              id: 9,
              title: "Unified Marketplace, Brand, andShop Analysis",
            },
            {
              id: 10,
              title: "Access to Single or Multiple Store Data",
            },
            {
              id: 11,
              title: "Shop Comparison Tools",
            },
            {
              id: 12,
              title: "Geo-Location Profit Analysis",
            },
            {
              id: 13,
              title: "Forecasted Expense Modeling",
            },
          ],
        },
        {
          title: "Comprehensive Analytics Suite :",
          allData: [
            {
              id: 14,
              title: "Shipping",
            },
            {
              id: 15,
              title: "Discount",
            },
            {
              id: 16,
              title: "Product",
            },
            {
              id: 17,
              title: "Inventory",
            },

            {
              id: 18,
              title: "Returns",
            },
            {
              id: 19,
              title: "Processings",
            },
            {
              id: 20,
              title: "Gateways",
            },
          ],
        },
      ],
    },
  ];

  // Function to get plan details by ID
  const getPlanById = (id) => {
    return pricingData.find(plan => plan.id === id);
  };

  const userSubscriptionId = handleSignup?.user?.subscriptionId ?? 3;
  const currentPlan = getPlanById(userSubscriptionId);

  return (
    <Form autoComplete='off' style={{padding:'20px'}}>
      <h1>Subscription Plan</h1>
      <p>Your current plan: {currentPlan ? currentPlan.tag : 'Unknown Plan'}</p>
      <br></br>
      {currentPlan && (
        <div>
          <h2>{currentPlan.title}</h2>
          <p>Price: ${currentPlan.price}</p>
       
          {currentPlan.pricingList.map(list => (
            <div key={list.title}>
              <h3>{list.title}</h3>
              <ul>
                {list.allData.map(item => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Form>
  );
};

export default InfoForm;

InfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
