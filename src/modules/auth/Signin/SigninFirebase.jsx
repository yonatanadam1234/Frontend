import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AppInfoView from '@crema/components/AppInfoView';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import { Fonts } from '@crema/constants/AppEnums';
import { AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import AuthWrapper from '../AuthWrapper';

const validationSchema = yup.object({
  email: yup
    .string()
    .email(<IntlMessages id='validation.emailFormat' />)
    .required(<IntlMessages id='validation.emailRequired' />),
  password: yup
    .string()
    .required(<IntlMessages id='validation.passwordRequired' />),
});

const SigninFirebase = () => {
  const { logInWithEmailAndPassword, logInWithPopup } = useAuthMethod();
  const navigate = useNavigate();

  const { messages } = useIntl();

  useEffect(() => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
      logInWithEmailAndPassword({ email, password });
    }
  }, []);

  const onGoToForgetPassword = () => {
    navigate('/forget-password', { tab: 'firebase' });
  };

  return (
    <AuthWrapper>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              localStorage.setItem('email', data.email);
              localStorage.setItem('password', data.password);
              logInWithEmailAndPassword(data);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                  <AppTextField
                    placeholder={messages['common.email']}
                    name='email'
                    label={<IntlMessages id='common.email' />}
                    variant='outlined'
                    sx={{
                      width: '100%',
                      '& .MuiInputBase-input': {
                        fontSize: 14,
                      },
                    }}
                  />
                </Box>

                <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                  <AppTextField
                    type='password'
                    placeholder={messages['common.password']}
                    label={<IntlMessages id='common.password' />}
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

                <Box
                  component='span'
                  sx={{
                    display: 'block',
                    textAlign: 'right',
                    mb: { xs: 3, xl: 4 },
                    mt: -2,
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.SEMI_BOLD,
                    cursor: 'pointer',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
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
                      padding: '8px 16px',
                      mt: 3,
                    }}
                  >
                    <IntlMessages id='common.login' />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>

        <Box
          sx={{
            color: 'grey.700',
            mb: { xs: 5, md: 7 },
          }}
        >
          <span style={{ marginRight: 4 }}>
            <IntlMessages id='common.dontHaveAccount' />
          </span>
          <Box
            component='span'
            sx={{
              fontWeight: Fonts.SEMI_BOLD,
              '& a': {
                color: (theme) => theme.palette.primary.main,
                textDecoration: 'none',
              },
            }}
          >
            <Link to='/signup'>
              <IntlMessages id='common.signup' />
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: (theme) => theme.palette.background.default,
            mx: { xs: -5, lg: -10 },
            mb: { xs: -6, lg: -11 },
            mt: 'auto',
            py: 2,
            px: { xs: 5, lg: 10 },
          }}
        >
          <Box
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <IntlMessages id='common.orLoginWith' />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              aria-label='Google'
              sx={{
                p: 2,
                '& svg': { fontSize: 20 },
                color: (theme) => theme.palette.text.secondary,
              }}
              onClick={() => logInWithPopup('google')}
            >
              <AiOutlineGoogle />
            </IconButton>
            <IconButton
              aria-label='Facebook'
              sx={{
                p: 1.5,
                '& svg': { fontSize: 20 },
                color: (theme) => theme.palette.text.secondary,
              }}
              onClick={() => logInWithPopup('facebook')}
            >
              <FaFacebookF />
            </IconButton>
            <IconButton
              aria-label='Github'
              sx={{
                p: 1.5,
                '& svg': { fontSize: 20 },
                color: (theme) => theme.palette.text.secondary,
              }}
              onClick={() => logInWithPopup('github')}
            >
              <BsGithub />
            </IconButton>
            <IconButton
              aria-label='Twitter'
              sx={{
                p: 1.5,
                '& svg': { fontSize: 20 },
                color: (theme) => theme.palette.text.secondary,
              }}
              onClick={() => logInWithPopup('twitter')}
            >
              <AiOutlineTwitter />
            </IconButton>
          </Box>
        </Box>

        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default SigninFirebase;
