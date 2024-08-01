import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PropTypes from 'prop-types';
import TableHeading from './TableHeading';
import TableItem from './TableItem';
import AppTableContainer from '@crema/components/AppTableContainer';
import AppLoader from '@crema/components/AppLoader';
import { Typography } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ShippingGropu = ({ displayProductCost ,ShippingGropuData }) => {


  return (
    <>
      <ToastContainer />
      <AppTableContainer>
        <Table stickyHeader className="table">
          <TableHead>
            <TableHeading displayProductCost={displayProductCost} />
          </TableHead>
          <TableBody>
            {Array.isArray(ShippingGropuData) && ShippingGropuData.map((data) => (
              <TableItem data={data} key={data.shipping_group_no} displayProductCost={displayProductCost} />
            ))}
          </TableBody>
        </Table>
      </AppTableContainer>
    </>
  );
};

export default ShippingGropu;
 
ShippingGropu.propTypes = {
  orderData: PropTypes.array,
  loading: PropTypes.bool,
};