import React from 'react';
import ForgetPasswordVerifyOtp from '../../../modules/auth/ForgetPasswordVerifyOtp';
import SetNewPassword from '../../../modules/auth/SetNewPassword';

const Signin = React.lazy(() => import('../../../modules/auth/Signin'));
const Signup = React.lazy(() => import('../../../modules/auth/Signup'));
const ForgotPassword = React.lazy(() =>
  import('../../../modules/auth/ForgetPassword'),
);
const ConfirmSignupAwsCognito = React.lazy(() =>
  import('../../../modules/auth/Signup/ConfirmSignupAwsCognito'),
);
const ResetPasswordAwsCognito = React.lazy(() =>
  import('../../../modules/auth/ForgetPassword/ResetPasswordAwsCognito'),
);
const VerifyOtp = React.lazy(() =>
  import('../../../modules/auth/VerifyOtp'),
);
export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forget-password',
    element: <ForgotPassword />,
  },
  {
    path: '/confirm-signup',
    element: <ConfirmSignupAwsCognito />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordAwsCognito />,
  },
  {
    path: '/verify-otp',
    element: <VerifyOtp />,
  },
  {
    path: '/forgetpasswordverifyotp',
    element: <ForgetPasswordVerifyOtp />,
  },
  {
    path: '/setNewPassword',
    element: <SetNewPassword />,
  },
];
