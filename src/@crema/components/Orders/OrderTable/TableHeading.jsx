import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {
  BsFillGearFill,
} from 'react-icons/bs';


const TableHeading = () => {
  return (
    <TableRow>
      <TableCell>Date</TableCell>
      <TableCell>Order ID</TableCell>
      <TableCell>Status</TableCell>
      <TableCell>Customer</TableCell>
      <TableCell>Country</TableCell>
      <TableCell>Items</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Shipping Cost</TableCell>
      <TableCell>Net Shipping </TableCell>
      <TableCell>Handling</TableCell>
      <TableCell>Fulfillment </TableCell>
      <TableCell>Tax </TableCell>
      <TableCell>Processing Fees</TableCell>
      <TableCell>COGS</TableCell>
      <TableCell>Product Handling</TableCell>
      <TableCell>Gross Profit</TableCell> 
      <TableCell>Gross Margin</TableCell>
      <TableCell>Marketing</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 123, zIndex: 3,width:'50px',backgroundColor: '#F0FFFF' }}>Con.Profit</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 35, zIndex: 2,width:'50px',backgroundColor: '#F0FFFF' }}>Con.Margin</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 0, zIndex: 2,width:'50px',backgroundColor: '#F0FFFF' }}><BsFillGearFill /></TableCell>
    </TableRow>
  );
};

export default TableHeading;
