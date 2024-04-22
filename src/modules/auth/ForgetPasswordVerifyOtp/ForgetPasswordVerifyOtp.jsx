import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import OtpInput from 'react-otp-input';
import AppInfoView from '@crema/components/AppInfoView';
import Box from '@mui/material/Box';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Fonts } from '@crema/constants/AppEnums';
import { Link } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import { ToastContainer } from 'react-toastify';
import { useAuthMethod } from '@crema/hooks/AuthHooks';

const validationSchema = yup.object({
    otp: yup
        .string()
        .required(<IntlMessages id='validation.otp' />)
});

const ForgetPasswordVerifyOtp = () => {
    const { VerifyforgetpasswordOTP } = useAuthMethod();

    const [otp, setOtp] = useState('');

    return (
        <>
            <ToastContainer />
            <AuthWrapper>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', mb: 5 }}>
                        <Formik
                            validateOnChange={true}
                            initialValues={{
                                email: localStorage.getItem('email'),
                                otp: ''
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={(data, { setSubmitting }) => {
                                console.log("data", data);
                                setSubmitting(true);
                                VerifyforgetpasswordOTP(otp);
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                                    <OtpInput
                                        value={otp}
                                        name='otp'
                                        onChange={setOtp}
                                        numInputs={4}
                                        renderSeparator={<span>-</span>}
                                        renderInput={(props, index) => (
                                            <input
                                                {...props}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    textAlign: 'center',
                                                    margin: '5px', 
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        )}
                                    />


                                    <div>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            disabled={isSubmitting}
                                            sx={{
                                                minWidth: 160,
                                                fontWeight: Fonts.REGULAR,
                                                fontSize: 16,
                                                textTransform: 'capitalize',
                                                padding: '4px 16px 8px',
                                                marginTop:'30px'
                                            }}
                                            type='submit'
                                        >
                                            <IntlMessages id='common.verify' />
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Box>

                    <Box
                        sx={{
                            color: 'grey.700',
                        }}
                    >
                        <span style={{ marginRight: 4 }}>
                            <IntlMessages id='common.alreadyHaveAccount' />
                        </span>
                        <Box
                            component='span'
                            sx={{
                                fontWeight: Fonts.MEDIUM,
                                '& a': {
                                    color: (theme) => theme.palette.primary.main,
                                    textDecoration: 'none',
                                },
                            }}
                        >
                            <Link to='/signIn'>
                                <IntlMessages id='common.signIn' />
                            </Link>
                        </Box>
                    </Box>

                    <AppInfoView />
                </Box>
            </AuthWrapper>
        </>
    );
};

export default ForgetPasswordVerifyOtp;