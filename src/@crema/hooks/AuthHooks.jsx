
import {
  useFirebase,
  useFirebaseActions,
} from '@crema/services/auth/firebase/FirebaseAuthProvider';
import { getUserFromFirebase } from '@crema/helpers/AuthHelper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwtAxios from '../services/auth/jwt-auth';
import { useInfoViewActionsContext } from '../context/AppContextProvider/InfoViewContextProvider';

export const useAuthUser = () => {
  const { user, isAuthenticated, isLoading } = useFirebase();
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
  } = useFirebaseActions();
  const navigate = useNavigate();

  const handleSignup = (data) => {
    try {
      jwtAxios.post('register', data).then((res) => {
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
      jwtAxios.post('forgotPassword', data).then((res) => {
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
      jwtAxios.post('verifyForgotPassword', data).then((res) => {
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
      jwtAxios.post('updatePassword', data).then((res) => {
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

  const handleVerifyOtp = (otp) => {
    verifyUser({ email: localStorage.getItem("email"), otp: otp })
  }
  return {
    handleSignup,
    handleVerifyOtp,
    handleforgetpassword,
    VerifyforgetpasswordOTP,
    updatePassword,
    logInWithEmailAndPassword,
    logInWithPopup,
    logout,
  };
};