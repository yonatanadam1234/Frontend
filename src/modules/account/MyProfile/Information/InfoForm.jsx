import React, { useContext, useEffect } from 'react';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import { useAuthUser } from '../../../../@crema/hooks/AuthHooks';
import pricingData from '../../../../@crema/mockapi/fakedb/extraPages/pricing';
import jwtAxios from '../../../../@crema/services/auth/jwt-auth';
import { useJWTAuthActions } from '../../../../@crema/services/auth';
import { Button } from '@mui/base';
import { Box, padding } from '@mui/system';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InfoForm = () => {
  const { user } = useAuthUser();
  const { setJWTAuthData } = useJWTAuthActions()
  const navigate = useNavigate()

  const handleupgrade = () => {
    navigate('/extra-pages/pricing-detail')
  } 

  const getPlanById = (id) => {
    return pricingData.pricingOneNew.find(plan => plan.id === parseInt(id));
  };

  const currentPlan = getPlanById(user.subscriptionPlan);

  useEffect(() => {
    const token = localStorage.getItem('token');

    jwtAxios
      .get(`auth/${token}`).then((data) => {
        setJWTAuthData({
          user: data.data.user,
          isLoading: false,
          isAuthenticated: true,
        })
      })
  }, [])
  return (
    <Form autoComplete='off' style={{ padding: '20px' }}>
      <h1>Subscription Plan</h1>
      <p>Your current plan: {currentPlan ? currentPlan.tag : 'Unknown Plan'}</p>
      <br></br>
      {currentPlan && (
        <div>
          <h2>{currentPlan.title}</h2>

          {currentPlan.id <= 3 ? (
            <>
              <p>Price: ${currentPlan.price}</p>
              <p>Duration: {currentPlan.monthplan}</p>
            </>
          ) : (
            <>
              <p>Price: ${currentPlan.yearlyprice}</p>
              <p>Duration: {currentPlan.annualplan}</p>
            </>
          )}
        </div>
      )}
      {currentPlan.id == 6 ? (

        " "
      ) : (
        <>
          <Grid item xs={12} md={12}>
            <Box    
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}  
            >
              <Button
                style={{ padding: '10px', borderRadius: '8%', margin: '15px 0px', background: '#0A8FDC', border: 'none', color: '#fff', fontSize: '14px', cursor:'pointer' }}
                color='primary'
                variant='contained'
                type='submit'
                onClick={handleupgrade}
              >
                Upgrade Plan ??
              </Button>

            </Box>
          </Grid>
        </>
      )}
    </Form>
  );
};
export default InfoForm;

InfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
{/* {currentPlan.pricingList.map(list => (
            <div key={list.title}>
              <h3>{list.title}</h3>
              <ul>
                {list.allData.map(item => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            </div>
          ))} */}