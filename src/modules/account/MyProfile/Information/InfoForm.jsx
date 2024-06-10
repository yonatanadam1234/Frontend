import React, { useContext, useEffect } from 'react';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import { useAuthUser } from '../../../../@crema/hooks/AuthHooks';
import pricingData from '../../../../@crema/mockapi/fakedb/extraPages/pricing';
import jwtAxios from '../../../../@crema/services/auth/jwt-auth';
import { useJWTAuthActions } from '../../../../@crema/services/auth';

const InfoForm = () => {
  const { user } = useAuthUser();
  const { setJWTAuthData } = useJWTAuthActions()

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
  const getPlanById = (id) => {
    return pricingData.pricingOneNew.find(plan => plan.id === parseInt(id));
  };

  const currentPlan = getPlanById(user.subscriptionPlan);

  return (
    <Form autoComplete='off' style={{ padding: '20px' }}>
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
