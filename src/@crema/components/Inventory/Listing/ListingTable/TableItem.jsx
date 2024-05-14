import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import OrderActions from './OrderActions';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ellipsisLines } from '@crema/helpers/StringHelper';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));

const TableItem = ({ data }) => {
  const navigate = useNavigate();
  const [hOpen, setHopen] = useState(false);
  const [shippingGroup, setShippingGroup] = useState(data.shiping_group);
  const [mrp, setMrp] = useState(data.mrp);
  const [productWeight, setProductWeight] = useState(data.product_weight);
  const [editingMrp, setEditingMrp] = useState(false);
  const [editingProductWeight, setEditingProductWeight] = useState(false);

  const handleHistory = () => {
    setHopen(!hOpen);
  };

  const handleShippingGroupChange = (event) => {
    const newShippingGroup = event.target.value;
    setShippingGroup(newShippingGroup);
    // You can add logic here to update the shipping group in your data source
  };

  const handleMrpChange = (event) => {
    setMrp(event.target.value);
  };

  const handleMrpBlur = () => {
    setEditingMrp(false);
    // Update the original data.mrp value here
    data.mrp = mrp;
  };

  const handleProductWeightChange = (event) => {
    setProductWeight(event.target.value);
  };

  const handleProductWeightBlur = () => {
    setEditingProductWeight(false);
    // Update the original data.product_weight value here
    data.product_weight = productWeight;
  };

  const getPaymentStatusColor = () => {
    switch (data.Product_Status) {
      case true: {
        return "#43C888";
      }
      case false: {
        return "#F84E4E";
      }
    }
  };

  const shippingGroupOptions = [1, 2, 3, 4];
  const tableData = [
    {
      id:1,
      Variant_SKU: 'P-DNA-BARROW-01',
      Vendor_Title: 'DNA 28" Silver and Black Aluminium',
      Inventory: '10',
      Inventory_Cost: '$5678',
      Inventory_Value: '$345354',
      Unit_Count: '4',
      Daily_Sales: '3',
      Days_to_Finish: '6',
    },
    {
      id:2,
      Variant_SKU: 'P-DNA-BARROW-01',
      Vendor_Title: 'DNA 28" Silver and Black Aluminium',
      Inventory: '8',
      Inventory_Cost:'$2344',
      Inventory_Value: '$43545',
      Unit_Count: '5',
      Daily_Sales: '3',
      Days_to_Finish: '7',
    },
    {
      id:3,
      Variant_SKU: 'P-DNA-BARROW-01',
      Vendor_Title: 'DNA 28" Silver and Black Aluminium',
      Inventory: '7',
      Inventory_Cost: '$444',
      Inventory_Value: '$3434',
      Unit_Count: '6',
      Daily_Sales: '4',
      Days_to_Finish: '3',
    },
  ];

  const tableHeaders = Object.keys(tableData[0]);

  return (
    <>
      <TableRow key={data.name} className="item-hover">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleHistory}
          >
            {hOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        <StyledTableCell align="left">{data.Item}</StyledTableCell>

        <StyledTableCell align="left" sx={{ width: 400 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "primary.main",
            }}
            onClick={() => navigate(`/ecommerce/product_detail/${data?.id}`)}
          >
            <img
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
                marginRight: 10,
              }}
              src={data?.image?.[0]?.src}
              alt="crema-logo"
            />
            {ellipsisLines(data.title)}
          </Box>
        </StyledTableCell>

        <StyledTableCell align="left">{data.Item_SKU}</StyledTableCell>

        <StyledTableCell align="left">
          <Select
            value={shippingGroup}
            onChange={handleShippingGroupChange}
            sx={{ border: "1px solid #ced4da" }}
          >
            {shippingGroupOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </StyledTableCell>

        <StyledTableCell align="left">
          {editingMrp ? (
            <TextField
              value={mrp}
              onChange={handleMrpChange}
              onBlur={handleMrpBlur}
            />
          ) : (
            <Box onClick={() => setEditingMrp(true)}>{data.mrp}</Box>
          )}
        </StyledTableCell>

        <StyledTableCell align="left">{data.Product_Category}</StyledTableCell>
        <StyledTableCell align="left">
          {editingProductWeight ? (
            <TextField
              value={productWeight}
              onChange={handleProductWeightChange}
              onBlur={handleProductWeightBlur}
            />
          ) : (
            <Box onClick={() => setEditingProductWeight(true)}>{data.product_weight}</Box>
          )}
        </StyledTableCell>

        <StyledTableCell align="left">
          <Box
            sx={{
              color: getPaymentStatusColor(),
              backgroundColor: getPaymentStatusColor() + "44",
              padding: "3px 5px",
              borderRadius: 1,
              fontSize: 14,
              display: "inline-block",
            }}
          >
            {data.Product_Status ? "Active" : "Inactive"}
          </Box>
        </StyledTableCell>

        <StyledTableCell align="left">{data.Item_Volume}</StyledTableCell>

        <TableCell align="right">
          <OrderActions id={data.id} />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={hOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Shops
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {tableHeaders.map((header, index) => (
                      <TableCell key={index} align="right">
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((rowData, index) => (
                    <TableRow key={index}>
                      {tableHeaders.map((header, index) => (
                        <TableCell key={index} align="right">
                          {rowData[header]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
};