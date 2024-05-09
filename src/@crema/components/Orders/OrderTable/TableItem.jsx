import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import OrderActions from './OrderActions';

const TableItem = ({ data }) => {

  const getPaymentStatusColor = () => {
    switch (data.status) {
      case 'Pending': {
        return '#F84E4E';
      }
      case 'Delivered': {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };
 
  return (
    <TableRow key={data.id} className='item-hover'>
      {/* Render other columns */}
      <TableCell>{data.date}</TableCell>
      <TableCell><Box
          sx={{
            color: 'primary.main',
            borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'inline-block',
          }}
        >
          {data.id}
        </Box></TableCell>
      <TableCell><Box
          sx={{
            color: getPaymentStatusColor(),
            backgroundColor: getPaymentStatusColor() + '44',
            padding: '3px 5px',
            borderRadius: 1,
            fontSize: 14,
            display: 'inline-block',
          }}
        >
          {data.status}
        </Box></TableCell>
      <TableCell>{data.customer}</TableCell>
      <TableCell>{data.country}</TableCell>
      <TableCell>{data.items}</TableCell>
      <TableCell>{data.paid}</TableCell>
      <TableCell>{data.shippingCost}</TableCell>
      <TableCell>{data.netShipping}</TableCell>
      <TableCell>{data.handling}</TableCell>
      <TableCell>{data.fulfillment}</TableCell>
      <TableCell>{data.Tax}</TableCell>
      <TableCell>{data.processingFees}</TableCell>
      <TableCell>{data.cogs}</TableCell>
      <TableCell>{data.productHandling}</TableCell>
      <TableCell>{data.grossProfit}</TableCell>
      <TableCell>{data.grossMargin}</TableCell>
      <TableCell>{data.marketing}</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 123, zIndex: 3,width:'50px', backgroundColor: '#F0FFFF' }}>{data.conProfit}</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 35, zIndex: 2,width:'50px', backgroundColor: '#F0FFFF' }}>{data.conMargin}</TableCell>
      <TableCell align='left' style={{ position: 'sticky', right: 0, zIndex: 2,width:'50px', backgroundColor: '#F0FFFF' }}>...</TableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};
