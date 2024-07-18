import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CardWrapper from './CardWrapper';
import { Fonts } from '@crema/constants/AppEnums';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PackageWrapper from './PackageWrapper';

const Enterprise = () => {
  const pricingData = {
    pricingOne: [
      {
        id: 1,
        tag: 'Enterprise',
        tagColor: '#11C15B',
        title: 'Enterprise',
        pricingList: [
          { id: 1, title: 'Premium Plan Enhancements' },
          { id: 2, title: 'Unlimited Data History' },
          { id: 3, title: 'Tailored Metrics and Reports' },
          { id: 4, title: 'Automated Workspace Reporting' },
          { id: 5, title: 'Custom Integrations and API Access' },
          { id: 6, title: 'Industry Benchmark Reporting' },
          { id: 7, title: 'Comprehensive Multi-Shop Analytics' },
          { id: 8, title: 'Centralized Shop Reporting' },
          { id: 9, title: 'Unified Marketplace, Brand, and Shop Analysis' },
          { id: 10, title: 'Access to Single or Multiple Store Data' },
          { id: 11, title: 'Shop Comparison Tools' },
          { id: 12, title: 'Geo-Location Profit Analysis' },
          { id: 13, title: 'Forecasted Expense Modeling' },
          { id: 14, title: 'Data Retention for 12 month + Contact us for More' },
        ],
      },
    ],
  };

  return (
    <PackageWrapper>
      {pricingData.pricingOne.map((pricing) => (
        <CardWrapper key={pricing.id}>
          <Box
            component='span'
            className='tag'
            sx={{
              backgroundColor: pricing.tagColor,
            }}
          >
            {pricing.tag}
          </Box>
          <Box
            sx={{
              position: 'elative',
              pr: 20,
            }}
          >
            <Typography
              component='h3'
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: { xs: 28, md: 32, lg: 36 },
              }}
            >
              {pricing.title}
            </Typography>
            <Typography
              component='h4'
              sx={{
                fontSize: { xs: 20, md: 22, lg: 24 },
                mb: { xs: 5, lg: 7.5 },
                mt: 3
              }}
            >
              Contact us for pricing
              <Typography sx={{ 
                mt: 3
              }}>For enterprise projects that require premium data or bespoke solutions.</Typography>
            </Typography>
            {pricing.popular ? (
              <Box className='popular'>
                <FavoriteOutlinedIcon
                  sx={{
                    fontSize: 14,
                    mr: 2.5,
                    mt: 1.25,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: 12, xl: 14 },
                  }}
                >
                  {pricing.popular}
                </Typography>
              </Box>
            ) : null}
          </Box>
          <Box sx={{ mb: 7.5 }}>
            <Button
              variant='outlined'
              sx={{
                width: '100%',
                fontWeight: Fonts.BOLD,
                color: (theme) => theme.palette.text.primary,
                minHeight: 46,
                borderRadius: 7.5,
                boxShadow: 'none',
                borderWidth: 2,
                borderColor: pricing.tagColor,
                '&:hover, &:focus': {
                  borderColor: pricing.tagColor,
                  borderWidth: 2,
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
          <List
            sx={{
              py: 0,
            }}
          >
            {pricing.pricingList.map((data, index) => (
              <ListItem
                key={index}
                sx={{
                  p: 0,
                  mb: 2.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 10, mr: 3.5 }}>
                  <CheckOutlinedIcon
                    sx={{
                      fontSize: 16,
                      mt: 1,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={data.title} />
              </ListItem>
            ))}
          </List>
        </CardWrapper>
      ))}
    </PackageWrapper>
  );
};

export default Enterprise;

Enterprise.propTypes = {
  pricing: PropTypes.object,
};