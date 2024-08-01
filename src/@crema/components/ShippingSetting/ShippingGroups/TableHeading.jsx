import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TableHeading = () => {

  return (
    <>
      <TableRow>
        <TableCell  rowSpan={2}>
          Shipping Group No.
        </TableCell>
        <TableCell  rowSpan={2}>
          Urgency
        </TableCell>
        <TableCell  rowSpan={2}>
          Postage Description (Size)
        </TableCell>
        <TableCell  colSpan={3}>
          UK
        </TableCell>
        <TableCell  colSpan={3}>
          US
        </TableCell>
        <TableCell  colSpan={3}>
          France
        </TableCell>
      
      </TableRow>

      <TableRow>
        <TableCell >Royal Mail</TableCell>
        <TableCell >VHL</TableCell>
        <TableCell >Parcel Force</TableCell>
        <TableCell >Royal Mail</TableCell>
        <TableCell >VHL</TableCell>
        <TableCell >Parcel Force</TableCell>
        <TableCell >Royal Mail</TableCell>
        <TableCell >VHL</TableCell>
        <TableCell >Parcel Force</TableCell>
        
      </TableRow>
    </>
  );
};

export default TableHeading;
