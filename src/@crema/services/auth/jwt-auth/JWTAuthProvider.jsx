import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwtAxios, { setAuthToken } from './index';
import { useInfoViewActionsContext } from '../../../context/AppContextProvider/InfoViewContextProvider';

const JWTAuthContext = createContext();
const JWTAuthActionsContext = createContext();

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

const JWTAuthAuthProvider = ({ children }) => {
  const { fetchStart, fetchSuccess, fetchError } = useInfoViewActionsContext();
  const [authData, setJWTAuthData] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  useEffect(() => {
    const getAuthUser = () => {
      fetchStart();
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      if (!token) {
        fetchSuccess();
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get(`auth/${token}`)
        .then(({ data }) => {
          fetchSuccess();
          setJWTAuthData({
            user: data.user,
            isLoading: false,
            isAuthenticated: true,
          });
        })
        .catch(() => {
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          });
          fetchSuccess();
        });
    };

    getAuthUser();
  }, []);

  const logInWithEmailAndPassword = async ({ email, password }) => {
    fetchStart();
    try {
      const { data } = await jwtAxios.post('auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...authData,
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
      const { data } = await jwtAxios.post('auth/otp/verify', { email, otp });
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      setJWTAuthData({
        user: data.user,
        isAuthenticated: true,
        isLoading: false
      });
      fetchSuccess();
    } catch (error) {
      setJWTAuthData({
        ...authData,
        isAuthenticated: false,
        isLoading: false,
      });
      fetchError(error.response.data.message);
    }
  };

  const logout = async () => {
    localStorage.clear()
    setJWTAuthData({ ...authData, isLoading: true });
    try {
      await signOut(auth);
      setJWTAuthData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      console.log("logout");
    } catch (error) {
      console.log("error", error);
      setJWTAuthData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };
  return (
    <JWTAuthContext.Provider
      value={{
        ...authData
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          setJWTAuthData,
          logInWithEmailAndPassword,
          verifyUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;

JWTAuthAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchStart: PropTypes.func,
  fetchSuccess: PropTypes.func,
  fetchError: PropTypes.func,
};
