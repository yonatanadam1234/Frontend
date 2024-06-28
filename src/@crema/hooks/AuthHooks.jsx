import { getUserFromFirebase } from '@crema/helpers/AuthHelper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwtAxios from '../services/auth/jwt-auth';
import { useInfoViewActionsContext } from '../context/AppContextProvider/InfoViewContextProvider';
import { useJWTAuth, useJWTAuthActions } from '../services/auth';

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromFirebase(user),
  };
};
export const useAuthMethod = () => {
  const { fetchStart, fetchSuccess, fetchError, showMessage } = useInfoViewActionsContext();

  const {
    logInWithEmailAndPassword,
    verifyUser,
    logInWithPopup,
    logout,
  } = useJWTAuthActions();

  const navigate = useNavigate();

  const handleSignup = (data) => {
    try {
      jwtAxios.post('auth/register', data).then((res) => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('email', res.data.user.email);
          showMessage(res.data.message);
          navigate('/verify-otp');
        }
      })
        .catch((res) => {
          if (res.response.status === 400) {
            toast.error(res.response.data.message);
          }
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleforgetpassword = (data) => {
    try {
      jwtAxios.post('auth/forgotPassword', data).then((res) => {
        if (res.status === 200) {
          showMessage(res.data.message);
          localStorage.setItem('email', data.email);
          navigate('/forgetpasswordverifyotp');
        }
      })
        .catch((res) => {
          fetchError(res.response.data.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const VerifyforgetpasswordOTP = (otp) => {
    try {
      const data = {
        email: localStorage.getItem('email'),
        otp: otp
      }
      jwtAxios.post('auth/verifyForgotPassword', data).then((res) => {
        if (res.status === 200) {
          showMessage(res.data.message);
          navigate('/setNewPassword');
        }
      })
        .catch((res) => {
          fetchError(res.response.data.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const updatePassword = (password) => {
    try {
      const data = {
        email: localStorage.getItem('email'),
        password: password.password
      }

      jwtAxios.post('auth/updatePassword', data).then((res) => {
        if (res.status === 200) {
          showMessage(res.data.message);
          navigate('/');
        }
      })
        .catch((res) => {
          fetchError(res.response.data.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const HandleChangePassword = (data) => {
    try {
      const newdata = {
        email: localStorage.getItem('email'),
        oldpassword: data.oldPassword,
        newpassword: data.newPassword
      }
      jwtAxios.post('auth/changepassword', newdata).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
        .catch((res) => {
          toast.error(res.response.data.message);
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  const HandleChangeUserInfo = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.displayName);
      formData.append('image', data.photoURL);
  
      const response = await jwtAxios.post('auth/edit/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log('Response data:', response.data);
      } else {
        toast.error('Unexpected status code: ' + response.status);
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        console.log('API error response:', error.response);
      } else if (error.request) {
        toast.error('No response from server');
        console.log('No response from server:', error.request);
      } else {
        toast.error('An unexpected error occurred');
        console.log('Error:', error.message);
      }
    }
  };

  const handleVerifyOtp = (otp) => {
    verifyUser({ email: localStorage.getItem("email"), otp: otp })
  }
  return {
    handleSignup,
    handleVerifyOtp,
    handleforgetpassword,
    VerifyforgetpasswordOTP,
    updatePassword,
    HandleChangePassword,
    HandleChangeUserInfo,
    logInWithEmailAndPassword,
    logInWithPopup,
    logout,

  };
};