import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const OrderActions = ({ id }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      
      <IconButton
        aria-controls='alpha-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='alpha-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          style={{ fontSize: 14 }}
          onClick={() => navigate('/dashboards/order')}
        >
        
          View Order
        </MenuItem>
        <MenuItem
          style={{ fontSize: 14 }}
          onClick={() => navigate(`/ecommerce/edit-products/${id}`)}
        >
          Edit
        </MenuItem>
        <MenuItem style={{ fontSize: 14 }} onClick={handleClose}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default OrderActions;

OrderActions.propTypes = {
  id: PropTypes.number,
};