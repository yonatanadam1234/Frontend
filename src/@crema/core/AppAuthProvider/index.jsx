import React from 'react';
import PropTypes from 'prop-types';
import JWTAuthAuthProvider from '../../services/auth/jwt-auth/JWTAuthProvider';

const AppAuthProvider = ({ children }) => {
  return <JWTAuthAuthProvider>{children}</JWTAuthAuthProvider>;
};

AppAuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AppAuthProvider;
