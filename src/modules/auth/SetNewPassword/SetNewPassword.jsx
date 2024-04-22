import React from 'react';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import AppInfoView from '@crema/components/AppInfoView';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import AuthWrapper from '../AuthWrapper';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object({
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninJwtAuth = () => {
  const { updatePassword } = useAuthMethod();

  const { messages } = useIntl();

  return (
    <>
      <ToastContainer />
      <AuthWrapper>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                updatePassword(data);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>

                  <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                    <AppTextField
                      type='password'
                      placeholder={messages['common.SetNewPassword']}
                      label={<IntlMessages id='common.SetNewPassword' />}
                      name='password'
                      variant='outlined'
                      sx={{
                        width: '100%',
                        '& .MuiInputBase-input': {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>

                  <div>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                      sx={{
                        minWidth: 160,
                        fontWeight: Fonts.REGULAR,
                        fontSize: 16,
                        textTransform: 'capitalize',
                        padding: '4px 16px 8px',
                      }}
                    >
                      <IntlMessages id='common.SetNewPassword' />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>

          <AppInfoView />
        </Box>
      </AuthWrapper>
    </>
  );
};

export default SigninJwtAuth;
