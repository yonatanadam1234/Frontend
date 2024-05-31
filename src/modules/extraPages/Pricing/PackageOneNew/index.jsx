import React from 'react';
import PropTypes from 'prop-types';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import PackageCard from './PackageCard';
import pricingData from '@crema/mockapi/fakedb/extraPages/pricing';

const PackageOne = ({ billingFormat }) => {
  return (
    <AppGridContainer>
      {pricingData.pricingOneNew.map((data) => {
        const currentPricing = billingFormat === "month" ? data.price : data.yearlyprice;
        
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
