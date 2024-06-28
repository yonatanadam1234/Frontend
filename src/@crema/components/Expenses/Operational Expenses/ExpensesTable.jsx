import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  TablePagination,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import Custome from "./Custome";
import Variable from "./Variable";
import Contra from "./Contra";
import { useAuthUser } from "../../../hooks/AuthHooks";
import {
  getExpenseData,
  deleteExpense,
  updateExpense,
} from "../services/expense.service";
import EditDrawer from "./EditExpense";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import AppLoader from '@crema/components/AppLoader';

const ExpensesTable = () => {
  const [openCustomPopup, setOpenCustomPopup] = useState(false);
  const [openVariablePopup, setOpenVariablePopup] = useState(false);
  const [openContraPopup, setOpenContraPopup] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [tableData, setTableData] = useState([]);
  // const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRowData, setEditRowData] = useState({});
  const { user } = useAuthUser();
  const [loading, setloading] = useState(true)
  const handleCustomSubmit = (values) => {
    setTableData([
      ...tableData,
      {
        ...values,
        id: uuidv4(),
        type: "Custom Expense",
        expense_label: values.expenseLabel || "N/A",
        status: values.expenseStatus || "N/A",
        currency_amount: values.expenseAmount || "N/A",
        first_payment: values.firstPayment || "N/A",
        calculated_per: values.calculatedPer || "N/A",
        currency_icon: values.currency || "N/A",
      },
    ]);
    setOpenCustomPopup(false);
  };

  const handleContraSubmit = (values) => {
    setTableData([
      ...tableData,
      {
        ...values,
        id: uuidv4(),
        type: "Contra Variable Expense",
        expense_label: values.expenseLabel || "N/A",
        status: values.expenseStatus || "N/A",
        currency_amount: values.expenseAmount || "N/A",
        first_payment: values.firstPayment || "N/A",
        calculated_per: values.calculatedPer || "N/A",
        currency_icon: values.currency || "N/A",

      },
    ]);
    setOpenContraPopup(false);
  };

  const handleVariableSubmit = (values) => {
    setTableData([
      ...tableData,
      {
        ...values,
        id: uuidv4(),
        type: "Variable Expense",
        expense_label: values.expenseLabel || "N/A",
        status: values.expenseStatus || "N/A",
        currency_amount: values.expenseAmount || "N/A",
        first_payment: values.firstPayment || "N/A",
        calculated_per: values.calculatedPer || "N/A",
        currency_icon: values.currency || "N/A",
      },
    ]);
    setOpenVariablePopup(false);
  };

  const handleDeleteExpense = async (id, index) => {
    if (!id) return;


    if (id.length === 36) {
      setTableData(tableData.filter((_, i) => i !== index));
      toast.success("Expense Deleted Successfully!!");
      return;
    }

    try {
      const response = await deleteExpense(id);
      if (response.status === 200 || response.data.success) {
        setTableData(tableData.filter((_, i) => i !== index));
        toast.success("Expense Deleted Successfully!!");

      } else {
        console.error("Failed to delete expense:", response);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseCustome = () => {
    setOpenCustomPopup(false);
  };

  const handleCloseContra = () => {
    setOpenContraPopup(false);
  };

  const handleCloseVariable = () => {
    setOpenVariablePopup(false);
  };

  const fetchExpenseData = useCallback(async () => {
    try {
      const response = await getExpenseData(user.id);

      if (response.data && response.data.success) {
        const mappedData = response.data.expenses.map((expense) => ({
          expense_label: expense.expense_label,
          calculated_per: expense.calculated_per,
          status: expense.status === "1" ? "Active" : "Inactive",
          currency_amount: expense.currency_amount,
          first_payment: expense.first_payment,
          finalPaymentDate: "N/A",
          id: expense.id,
          currency_icon: expense.currency_icon,
        }));
        setloading(false);
        setTableData(mappedData);
      } else {
        console.error(
          "Error:",
          response.data ? response.data.message : "No data"
        );
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  const handleEditClick = (row) => {
    setEditRowData(row);
    setOpenEditDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenEditDrawer(false);
  };

  const handleInputChange = (field, value) => {
    setEditRowData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };



  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await updateExpense(editRowData.id, editRowData);

      if (response.status === 200 || response.data.success) {
        const updatedTableData = tableData.map((item) =>
          item.id === editRowData.id ? editRowData : item
        );
        setTableData(updatedTableData);
        // setOpenEditDrawer(false);
        toast.success("Expense Updated Successfully!!");
      } else {
        console.error("Failed to update expense:", response);
        toast.error("Failed to update expense");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Error updating expense");
    }
  };

  return (
    <>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
            <TableRow>
              <TableCell>Title</TableCell>
              {/* <TableCell>Type</TableCell> */}
              {/* <TableCell>Calculated Per</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              {/* <TableCell>First Payment</TableCell> */}
              {/* <TableCell>Final Payment</TableCell> */}
              <TableCell sx={{ textAlign: "right" }}>Delete</TableCell>
              <TableCell >Edit</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {loading ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ height: "450px" }}>
                  <AppLoader />
                </TableCell>
              </TableRow>
            ) : (
              Array.isArray(tableData) && tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.expense_label || "N/A"}</TableCell>
                  {/* <TableCell>{row.type || "N/A"}</TableCell> */}
                  {/* <TableCell>{row.calculated_per || "N/A"}</TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor:
                          row.status === "Active" ? "#c8e6c9" : "#ffcdd2",
                        padding: "5px",
                        borderRadius: "4px",
                        width:'50%'
                      }}
                    >
                      {row.status || "N/A"}
                    </Box>
                  </TableCell>
                  <TableCell>{row.currency_icon}{row.currency_amount}</TableCell>
                  {/* <TableCell>{row.first_payment || "N/A"}</TableCell> */}
                    {/* <TableCell>{row.finalPaymentDate || "N/A"}</TableCell> */}
                  <TableCell sx={{ textAlign: "right" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteExpense(row.id, index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    
                  </TableCell>
                  <TableCell>
                  
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditClick(row)}
                    >
                      <EditSharpIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}



          </TableBody>
        </Table>
        <Custome
          open={openCustomPopup}
          setOpenCustomPopup={setOpenCustomPopup}
          handleCloseCustome={handleCloseCustome}
          handleSubmit={handleCustomSubmit}
        />
        <Contra
          open={openContraPopup}
          handleCloseContra={handleCloseContra}
          handleSubmit={handleContraSubmit}
        />
        <Variable
          open={openVariablePopup}
          handleCloseVariable={handleCloseVariable}
          handleSubmit={handleVariableSubmit}
        />
        <EditDrawer
          open={openEditDrawer}
          onClose={handleDrawerClose}
          rowData={editRowData}
          onChange={handleInputChange}
          onSubmit={handleEditSubmit}
        />
      </TableContainer>
    </>
  );
};

export default ExpensesTable;
