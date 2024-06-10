import React, { useState } from "react";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,TextField,TablePagination,Box,InputAdornment,IconButton,Dialog,DialogTitle,DialogContent,DialogActions,MenuItem,Select,InputLabel,FormControl,Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaEdit } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
const ExpensesTable = () => {
  // const row = [];
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openVariablePopup, setOpenVariablePopup] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [amount, setAmount] = useState("");
  const [tableData, setTableData] = useState([]);
  const validationSchema = Yup.object().shape({
    recurrence: Yup.string().required('Recurrence is required'),
    expenseStatus: Yup.string().required('Expense Status is required'),
    expenseLabel: Yup.string().required('Expense Label is required'),
    category: Yup.string().required('Category is required'),
    metricAllocation: Yup.string().required('Metric Allocation is required'),
    expenseAmount: Yup.number().required('Expense Amount is required'),
    firstPayment: Yup.date().required('First Payment is required'),
    calculatedPer: Yup.string().required('calculatedPer is required'),
  });
  const formikVariableExpense = useFormik({
    initialValues: {
      recurrence: "",
      expenseStatus: "",
      expenseLabel: "",
      calculatedPer: "",
      category: "",
      metricAllocation: "",
      expenseAmount: "",
      currency: "USD",
      firstPayment: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setTableData([
        ...tableData,
        {
          ...values,
          type: "Variable",
          title: values.expenseLabel || "N/A",
          status: values.expenseStatus || "N/A",
          amount: values.expenseAmount || "N/A",
          firstPaymentDate: values.firstPayment || "N/A",
        },
      ]);
      resetForm();
      handleCloseVariablePopup();
    },
  });
  const handleOpenVariablePopup = () => {
    setOpenVariablePopup(true);
  };
  const handleCloseVariablePopup = () => {
    setOpenVariablePopup(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "BTC",
      label: "฿",
    },
    {
      value: "JPY",
      label: "¥",
    },
  ];
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

  const handleDeleteExpense = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };
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
                    onClick={handleOpenVariablePopup}
                  >
                    + Add Variable Expense
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
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title || "N/A"}</TableCell>
                <TableCell>{row.type || "N/A"}</TableCell>
                <TableCell>{row.calculatedPer || "N/A"}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor:
                        row.status === "Active" ? "#c8e6c9" : "#ffcdd2",
                      padding: "5px",
                      borderRadius: "4px",
                    }}
                  >
                    {row.status || "N/A"}
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
                <TableCell>{row.firstPaymentDate || "N/A"}</TableCell>
                <TableCell>{row.finalPaymentDate || "N/A"}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteExpense(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Dialog open={openVariablePopup} onClose={handleCloseVariablePopup}>
        <DialogTitle sx={{ fontSize: 20 }}>Add Variable Expense</DialogTitle>
        <hr style={{ opacity: "0.2" }} />
        <form onSubmit={formikVariableExpense.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Recurrence</InputLabel>
                  <Select
                    label="Recurrence"
                    {...formikVariableExpense.getFieldProps('recurrence')}
                  >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    <MenuItem value={"Yearly"}>Yearly</MenuItem>
                  </Select>
                  {formikVariableExpense.touched.recurrence && formikVariableExpense.errors.recurrence ? (
                    <div style={{ color: 'red' }}>{formikVariableExpense.errors.recurrence}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Expense Status</InputLabel>
                  <Select
                    label="Expense Status"
                    {...formikVariableExpense.getFieldProps('expenseStatus')}
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                  {formikVariableExpense.touched.expenseStatus && formikVariableExpense.errors.expenseStatus ? (
                    <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseStatus}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Expense Label"
                  {...formikVariableExpense.getFieldProps('expenseLabel')}
                />
                {formikVariableExpense.touched.expenseLabel && formikVariableExpense.errors.expenseLabel ? (
                  <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseLabel}</div>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Calculated Per"
                  select
                  {...formikVariableExpense.getFieldProps('calculatedPer')}
                >
                  <MenuItem value={"Order"}>Order</MenuItem>
                  <MenuItem value={"Custom"}>Custom</MenuItem>
                </TextField>
                {formikVariableExpense.touched.calculatedPer && formikVariableExpense.errors.calculatedPer ? (
                  <div style={{ color: 'red' }}>{formikVariableExpense.errors.calculatedPer}</div>
                ) : null}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    {...formikVariableExpense.getFieldProps('category')}
                  >
                    <MenuItem value={"Category 1"}>Category 1</MenuItem>
                    <MenuItem value={"Category 2"}>Category 2</MenuItem>
                    <MenuItem value={"Category 3"}>Category 3</MenuItem>
                  </Select>
                  {formikVariableExpense.touched.category && formikVariableExpense.errors.category ? (
                    <div style={{ color: 'red' }}>{formikVariableExpense.errors.category}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Metric Allocation</InputLabel>
                  <Select
                    label="Metric Allocation"
                    {...formikVariableExpense.getFieldProps('metricAllocation')}
                  >
                    <MenuItem value={"Metric 1"}>Metric 1</MenuItem>
                    <MenuItem value={"Metric 2"}>Metric 2</MenuItem>
                  </Select>
                  {formikVariableExpense.touched.metricAllocation && formikVariableExpense.errors.metricAllocation ? (
                    <div style={{ color: 'red' }}>{formikVariableExpense.errors.metricAllocation}</div>
                  ) : null}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Expense Amount"
                  {...formikVariableExpense.getFieldProps('expenseAmount')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <TextField
                          style={{ padding: "0px 5px" }}
                          id="standard-select-currency"
                          select
                          label="Currency"
                          defaultValue="EUR"
                          variant="standard"
                          {...formikVariableExpense.getFieldProps('currency')}
                        >
                          {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </InputAdornment>
                    ),
                  }}
                />
                {formikVariableExpense.touched.expenseAmount && formikVariableExpense.errors.expenseAmount ? (
                  <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseAmount}</div>
                ) : null}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Payment"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...formikVariableExpense.getFieldProps('firstPayment')}
                />
                {formikVariableExpense.touched.firstPayment && formikVariableExpense.errors.firstPayment ? (
                  <div style={{ color: 'red' }}>{formikVariableExpense.errors.firstPayment}</div>
                ) : null}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ padding: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: 1 }}
            >
              Save and Add Another
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginRight: 1 }}
            >
              Save and Done
            </Button>

            <Button
              onClick={handleCloseVariablePopup}
              color="primary"
              style={{
                background: "#707070",
                color: "#fff",

                padding: "8px 18px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>

      </Dialog>
    </TableContainer>
  );
};
export default ExpensesTable;
