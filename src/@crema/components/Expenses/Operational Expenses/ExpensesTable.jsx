import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, TablePagination, Box, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaEdit } from 'react-icons/fa';
import Custome from './Custome';
import Variable from './Variable';
import Contra from './Contra';
import EditSharpIcon from '@mui/icons-material/EditSharp';
const ExpensesTable = () => {
  const [openCustomPopup, setOpenCustomPopup] = useState(false);
  const [openVariablePopup, setOpenVariablePopup] = useState(false);  
  const [openContraPopup, setOpenContraPopup] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [amount, setAmount] = useState("");

  const handleCustomSubmit = (values) => {
    setTableData([
      ...tableData,
      { ...values, type: 'Custom Expense', title: values.expenseLabel || 'N/A', status: values.expenseStatus || 'N/A', amount: values.expenseAmount || 'N/A', firstPaymentDate: values.firstPayment || 'N/A' }
    ]);
    setOpenCustomPopup(false);
  };


  const handleContraSubmit = (values) => {
    setTableData([
      ...tableData,
      { ...values, type: 'Contra Variable Expense', title: values.expenseLabel || 'N/A', status: values.expenseStatus || 'N/A', amount: values.expenseAmount || 'N/A', firstPaymentDate: values.firstPayment || 'N/A' }
    ]);
    setOpenContraPopup(false);
  };

  const handleVariableSubmit = (values) => {
    setTableData([
      ...tableData,
      { ...values, type: 'Variable Expense', title: values.expenseLabel || 'N/A', status: values.expenseStatus || 'N/A', amount: values.expenseAmount || 'N/A', firstPaymentDate: values.firstPayment || 'N/A' }
    ]);
    setOpenVariablePopup(false);
  };


  const handleDeleteExpense = (index) => {  
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAmountBlur = () => {
    const updatedTableData = [...tableData];
    updatedTableData[editRowIndex].amount = amount;
    setTableData(updatedTableData);
    setEditRowIndex(null);
    setAmount("");
  };

  const handleCloseCustome=()=>{
    setOpenCustomPopup(false)
  }
  const handleCloseContra=()=>{
    setOpenContraPopup(false)
  }
  const handleCloseVariable=()=>{
    setOpenVariablePopup(false)
  }
 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={8} sx={{ padding: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <h1>Add Custom & Variable Expenses Per Order ➡️</h1>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => setOpenCustomPopup(true)}
                  >
                    + Custom Expense  
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => setOpenContraPopup(true)}
                  >
                    + Contra Variable Expense
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={() => setOpenVariablePopup(true)}
                  >
                    + Variable Expense
                  </Button>
                </Box>
              </Box>
              <hr style={{ opacity: "0.2", margin: "20px" }} />
              <Box
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "right",
                  }}
                >
                  <TablePagination
                    component="div"
                    count={tableData.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[7, 10, 20, 50, 100]}
                    sx={{ marginLeft: "auto" }}
                  />
                  <TextField
                    variant="standard"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Calculated Per</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>First Payment </TableCell>
            <TableCell>Final Payment </TableCell>
            <TableCell sx={{textAlign:'center'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.title || 'N/A'}</TableCell>
              <TableCell>{row.type || 'N/A'}</TableCell>
              <TableCell>{row.calculatedPer || 'N/A'}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    backgroundColor: row.status === 'Active' ? '#c8e6c9' : '#ffcdd2',
                    padding: '5px',
                    borderRadius: '4px',
                  }}
                >
                  {row.status || 'N/A'}
                </Box>
              </TableCell>
              <TableCell align="left">
                {editRowIndex === index ? (
                  <TextField
                    value={amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                  />
                ) : (
                  <Box
                    onClick={() => {
                      setEditRowIndex(index);
                      setAmount(row.amount);
                    }}
                  >
                    {row.amount}
                    <FaEdit style={{ marginLeft: "8px" }} />
                  </Box>
                )}
              </TableCell>
              <TableCell>{row.firstPaymentDate || 'N/A'}</TableCell>
              <TableCell>{row.finalPaymentDate || 'N/A'}</TableCell>
              <TableCell sx={{textAlign:'center'}}>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteExpense(index)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  // onClick={() => handleDeleteExpense(index)}
                >
                  <EditSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* CustomExpenseForm */}
      <Custome open={openCustomPopup} setOpenCustomPopup={setOpenCustomPopup}  handleCloseCustome={handleCloseCustome} handleSubmit={handleCustomSubmit} />
      {/* ContraExpenseForm */}
      <Contra open={openContraPopup} handleCloseContra={handleCloseContra} handleSubmit={handleContraSubmit} />
      {/* VariableExpenseForm */}
      <Variable open={openVariablePopup} handleCloseVariable={handleCloseVariable} handleSubmit={handleVariableSubmit} />

    </TableContainer>
  );
};

export default ExpensesTable;
