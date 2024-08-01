import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";


const TableItem = ({ data }) => {

  return (
    <TableRow key={data.order_id} className="item-hover">
      <TableCell>{data.shipping_group_no}</TableCell>
      <TableCell>{data.urgency}</TableCell>
      <TableCell>{data.postage_description}</TableCell>
      <TableCell>{data.royal_mail}</TableCell>
      <TableCell>{data.vhl}</TableCell>
      <TableCell>{data.parcel_force}</TableCell>
      <TableCell>{data.us1}</TableCell>
      <TableCell>{data.us2}</TableCell>
      <TableCell>{data.us3}</TableCell>
      <TableCell>{data.fr1}</TableCell>
      <TableCell>{data.fr2}</TableCell>
      <TableCell>{data.fr3}</TableCell>
    </TableRow>
  );
};

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TableItem;
