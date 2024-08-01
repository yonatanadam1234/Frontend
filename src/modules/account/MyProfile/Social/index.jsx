import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Fonts } from '@crema/constants/AppEnums';
import IntlMessages from '@crema/helpers/IntlMessages';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import SocialForm from './SocialForm';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().label('Please Enter your email url'),
});

const Social = ({ social }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id='Share Account' />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log('data: ', data);
          setSubmitting(false);
        }}
      >
        <SocialForm social={social} />
      </Formik>
    </Box>
  );
};

export default Social;

Social.propTypes = {
  social: PropTypes.array,
};
