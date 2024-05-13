import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeader from '@crema/components/AppTable/TableHeader';

const TableHeading = () => {
  return (
    <TableHeader>
      <TableCell></TableCell>
      <TableCell>Item #</TableCell>
      <TableCell align='left'>product Title</TableCell>
      <TableCell align='left'>Item SKU</TableCell>
      <TableCell align='left'>shiping group</TableCell>
      <TableCell align='left'>Item Cost</TableCell>
      <TableCell align='left'>Product Category</TableCell>
      <TableCell align='left'>Product Weight</TableCell>
      <TableCell align='left'>Product Status</TableCell>
      <TableCell align='left'>Item Volume (shipment , storage)</TableCell>
      <TableCell align='left'>Actions</TableCell>
    </TableHeader>
  );
};

export default TableHeading;
