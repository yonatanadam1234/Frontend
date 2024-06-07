import React from 'react';
import { Box, Typography } from '@mui/material';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import ChangePasswordForm from './ChangePasswordForm';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuthMethod } from '../../../../@crema/hooks/AuthHooks';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  newPassword: yup
    .string()
    .required('New password required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const { HandleChangePassword } = useAuthMethod();

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          position: 'relative',
          maxWidth: 550,
        }}
      >
        <Typography
          component='h3'
          sx={{
            fontSize: 16,
            fontWeight: Fonts.BOLD,
            mb: { xs: 3, lg: 5 },
          }}
        >
          <IntlMessages id='common.changePassword' />
        </Typography>
        <Formik
          validateOnChange={false}
          validateOnBlur={true}
          initialValues={{
            oldPassword: '',
            newPassword: null,
            retypeNewPassword: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            HandleChangePassword(data)
            setSubmitting(false);
            resetForm();
          }}
        >
          {() => <ChangePasswordForm />}
        </Formik>
      </Box>
    </>
  );
};

export default ChangePassword;
