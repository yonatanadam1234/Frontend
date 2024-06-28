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
import { useJWTAuth } from '../../../../@crema/services/auth';
const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  const { HandleChangeUserInfo } = useAuthMethod();
  const { user } = useJWTAuth();
  const imageBaseURL = `https://squid-app-oqakh.ondigitalocean.app/image/${user?.image}`;
  

  return (
    <>
    <ToastContainer/>
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
          image: user.image ? imageBaseURL: '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          HandleChangeUserInfo(data)  
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
