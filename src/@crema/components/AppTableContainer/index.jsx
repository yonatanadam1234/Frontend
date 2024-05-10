import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import PropTypes from 'prop-types';

const AppTableContainer = ({ children, sxStyle }) => {
  return (
    <TableContainer
      sx={{
        '& tr > th, & tr > td': {
          whiteSpace: 'nowrap',
        },
        ...sxStyle,
        overflowX:'scroll',
        
      }}
    >
      {children}
    </TableContainer>
  );
};

export default AppTableContainer;

AppTableContainer.propTypes = {
  children: PropTypes.node,
  sxStyle: PropTypes.object,
};
