import React from 'react';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useAuthMethod } from '../../../../@crema/hooks/AuthHooks';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useJWTAuth, useJWTAuthActions } from '../../../../@crema/services/auth';
import jwtAxios from '../../../../@crema/services/auth/jwt-auth';
const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  // const { user } = useAuthUser();
  const { HandleChangeUserInfo } = useAuthMethod();
  const { user } = useJWTAuth();
  const imageBaseURL = `https://squid-app-oqakh.ondigitalocean.app/images/${user?.image}`;
  const { setJWTAuthData } = useJWTAuthActions()


  const fetchUpdateUser = () => {
    const token = localStorage.getItem('token');

    jwtAxios
      .get(`auth/auth/${token}`).then((data) => {
        setJWTAuthData({
          user: data.data.user,
          isLoading: false,
          isAuthenticated: true,
        })
      })
  }
  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          position: 'relative',
          maxWidth: 550,
        }}
      >
        <Formik
          validateOnBlur={true}
          initialValues={{
            ...user,
            image: user.image ? imageBaseURL : '/assets/images/placeholder.jpg',
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            fetchUpdateUser()
            setSubmitting(true);
            HandleChangeUserInfo(data).then(()=>{
              fetchUpdateUser()
            })

            setSubmitting(false);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
