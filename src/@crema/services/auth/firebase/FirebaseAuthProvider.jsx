import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  auth,
  createUserWithEmailAndPassword,
  facebookAuthProvider,
  githubAuthProvider,
  googleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  twitterAuthProvider,
  updateProfile,
} from "./firebase";
import { useInfoViewActionsContext } from "../../../context/AppContextProvider/InfoViewContextProvider";
import jwtAxios, { setAuthToken } from "../jwt-auth";

const FirebaseContext = createContext();
const FirebaseActionsContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);

export const useFirebaseActions = () => useContext(FirebaseActionsContext);

const FirebaseAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError, showMessage } = useInfoViewActionsContext();
  const [firebaseData, setFirebaseData] = useState({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });
  const [authData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    fetchStart();
    const getAuthUser = onAuthStateChanged(
      auth,
      (user) => {
        setFirebaseData({
          user: user,
          isAuthenticated: Boolean(user),
          isLoading: false,
        });
        fetchSuccess();
      },
      () => {
        fetchSuccess();
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
      () => {
        fetchSuccess();
        setFirebaseData({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      },
    );

    return () => {
      getAuthUser();
    };
  }, []);

  const getProvider = (providerName) => {
    switch (providerName) {
      case "google": {
        return googleAuthProvider;
      }
      case "facebook": {
        return facebookAuthProvider;
      }
      case "twitter": {
        return twitterAuthProvider;
      }
      case "github": {
        return githubAuthProvider;
      }
      default:
        return googleAuthProvider;
    }
  };

  const logInWithPopup = async (providerName) => {
    fetchStart();
    try {
      const { user } = await signInWithPopup(auth, getProvider(providerName));
      setFirebaseData({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.message);
    }
  };

  const logInWithEmailAndPassword = async ({ email, password }) => {
    fetchStart();
    try {
      // const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { data } = await jwtAxios.post('login', { email, password });

      setFirebaseData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const verifyUser = async ({
    email,
    otp,
  }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('/otp/verify', { email, otp });
      setFirebaseData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setFirebaseData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    setFirebaseData({ ...firebaseData, isLoading: true });
    try {
      await signOut(auth);
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      console.log("logout");
    } catch (error) {
      console.log("error", error);
      setFirebaseData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <FirebaseActionsContext.Provider
        value={{
          logInWithEmailAndPassword,
          verifyUser,
          logInWithPopup,
          logout,
        }}
      >
        {children}
      </FirebaseActionsContext.Provider>
    </FirebaseContext.Provider>
  );
};
export default FirebaseAuthProvider;

FirebaseAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};
