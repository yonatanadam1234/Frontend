import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ExpensesTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openCustomPopup, setOpenCustomPopup] = useState(false);
  const [openContraPopup, setOpenContraPopup] = useState(false);
  const [openVariablePopup, setOpenVariablePopup] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [customExpense, setCustomExpense] = useState({
    recurrence: "",
    expenseStatus: "",
    expenseLabel: "",
    category: "",
    metricAllocation: "",
    expenseAmount: "",
    currency: "USD",
    firstPayment: "",
  });

  const [contraExpense, setContraExpense] = useState({
    recurrence: "",
    expenseStatus: "",
    expenseLabel: "",
    category: "",
    metricAllocation: "",
    expenseAmount: "",
    currency: "USD",
    firstPayment: "",
  });

  const [variableExpense, setVariableExpense] = useState({
    recurrence: "",
    expenseStatus: "",
    expenseLabel: "",
    category: "",
    metricAllocation: "",
    expenseAmount: "",
    currency: "USD",
    firstPayment: "",
  });

  const handleOpenCustomPopup = () => {
    setOpenCustomPopup(true);
  };

  const handleCloseCustomPopup = () => {
    setOpenCustomPopup(false);
  };

  const handleOpenContraPopup = () => {
    setOpenContraPopup(true);
  };

  const handleCloseContraPopup = () => {
    setOpenContraPopup(false);
  };

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

  const handleSaveCustomExpense = () => {
    setTableData([
      ...tableData,
      {
        ...customExpense,
        type: "Custom",
        title: customExpense.expenseLabel || "N/A",
        status: customExpense.expenseStatus || "N/A",
        amount: customExpense.expenseAmount || "N/A",
        firstPaymentDate: customExpense.firstPayment || "N/A",
      },
    ]);
    setCustomExpense({
      recurrence: "",
      expenseStatus: "",
      expenseLabel: "",
      category: "",
      metricAllocation: "",
      expenseAmount: "",
      currency: "USD",
      firstPayment: "",
    });
    handleCloseCustomPopup();
  };

  const handleSaveContraExpense = () => {
    setTableData([
      ...tableData,
      {
        ...contraExpense,
        type: "Contra Variable",
        title: contraExpense.expenseLabel || "N/A",
        status: contraExpense.expenseStatus || "N/A",
        amount: contraExpense.expenseAmount || "N/A",
        firstPaymentDate: contraExpense.firstPayment || "N/A",
      },
    ]);
    setContraExpense({
      recurrence: "",
      expenseStatus: "",
      expenseLabel: "",
      category: "",
      metricAllocation: "",
      expenseAmount: "",
      currency: "USD",
      firstPayment: "",
    });
    handleCloseContraPopup();
  };

  const handleSaveVariableExpense = () => {
    setTableData([
      ...tableData,
      {
        ...variableExpense,
        type: "Variable",
        title: variableExpense.expenseLabel || "N/A",
        status: variableExpense.expenseStatus || "N/A",
        amount: variableExpense.expenseAmount || "N/A",
        firstPaymentDate: variableExpense.firstPayment || "N/A",
      },
    ]);
    setVariableExpense({
      recurrence: "",
      expenseStatus: "",
      expenseLabel: "",
      category: "",
      metricAllocation: "",
      expenseAmount: "",
      currency: "USD",
      firstPayment: "",
    });
    handleCloseVariablePopup();
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
                    onClick={handleOpenCustomPopup}
                  >
                    + Custom Expense
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={handleOpenContraPopup}
                  >
                    + Contra Variable Expense
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1 }}
                    onClick={handleOpenVariablePopup}
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
            <TableCell>Actions</TableCell>
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
                <TableCell>{row.amount || "N/A"}</TableCell>
                <TableCell>{row.firstPaymentDate || "N/A"}</TableCell>
                <TableCell>{row.finalPaymentDate || "N/A"}</TableCell>
                <TableCell>...</TableCell> {/* Actions placeholder */}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Custom Expense Popup */}
      <Dialog open={openCustomPopup} onClose={handleCloseCustomPopup}>
        <DialogTitle sx={{ fontSize: 20 }}>Add Custom Expense</DialogTitle>
        <hr />
        <Dialog open={openCustomPopup} onClose={handleCloseCustomPopup}>
          <DialogTitle sx={{ fontSize: 20 }}>Add Custom Expense</DialogTitle>
          <hr />

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Recurrence</InputLabel>
                  <Select
                    value={customExpense.recurrence}
                    onChange={(e) =>
                      setCustomExpense({
                        ...customExpense,
                        recurrence: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}>Weekly</MenuItem>
                    <MenuItem value={"Monthly"}>Monthly</MenuItem>
                    <MenuItem value={"Yearly"}>Yearly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Expense Status</InputLabel>
                  <Select
                    value={customExpense.expenseStatus}
                    onChange={(e) =>
                      setCustomExpense({
                        ...customExpense,
                        expenseStatus: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"Active"}>Active</MenuItem>
                    <MenuItem value={"Inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Expense Label"
                  value={customExpense.expenseLabel}
                  onChange={(e) =>
                    setCustomExpense({
                      ...customExpense,
                      expenseLabel: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={customExpense.category}
                    onChange={(e) =>
                      setCustomExpense({
                        ...customExpense,
                        category: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"Category 1"}>Category 1</MenuItem>
                    <MenuItem value={"Category 2"}>Category 2</MenuItem>
                    <MenuItem value={"Category 3"}>Category 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <FormControl fullWidth margin="normal">
              <InputLabel>Metric Allocation</InputLabel>
              <Select
                value={customExpense.metricAllocation}
                onChange={(e) =>
                  setCustomExpense({
                    ...customExpense,
                    metricAllocation: e.target.value,
                  })
                }
              >
                <MenuItem value={"Metric 1"}>Metric 1</MenuItem>
                <MenuItem value={"Metric 2"}>Metric 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Expense Amount"
              value={customExpense.expenseAmount}
              onChange={(e) =>
                setCustomExpense({
                  ...customExpense,
                  expenseAmount: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      value={customExpense.currency}
                      onChange={(e) =>
                        setCustomExpense({
                          ...customExpense,
                          currency: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"EUR"}>EUR</MenuItem>
                      <MenuItem value={"GBP"}>GBP</MenuItem>
                    </Select>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="First Payment"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={customExpense.firstPayment}
              onChange={(e) =>
                setCustomExpense({
                  ...customExpense,
                  firstPayment: e.target.value,
                })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCustomPopup} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveCustomExpense} color="primary">
              Save and Add Another
            </Button>
            <Button onClick={handleSaveCustomExpense} color="primary">
              Save and Done
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>

      {/* Contra Variable Expense Popup */}
      <Dialog open={openContraPopup} onClose={handleCloseContraPopup}>
        <DialogTitle sx={{ fontSize: 20 }}>
          Add Contra Variable Expense
        </DialogTitle>
        <hr />

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Recurrence</InputLabel>
                <Select
                  value={contraExpense.recurrence}
                  onChange={(e) =>
                    setContraExpense({
                      ...contraExpense,
                      recurrence: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}>Weekly</MenuItem>
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
                  <MenuItem value={"Yearly"}>Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Expense Status</InputLabel>
                <Select
                  value={contraExpense.expenseStatus}
                  onChange={(e) =>
                    setContraExpense({
                      ...contraExpense,
                      expenseStatus: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Expense Label"
                value={contraExpense.expenseLabel}
                onChange={(e) =>
                  setContraExpense({
                    ...contraExpense,
                    expenseLabel: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={contraExpense.category}
                  onChange={(e) =>
                    setContraExpense({
                      ...contraExpense,
                      category: e.target.value,
                    })
                  }
                >
                  <MenuItem value={"Category 1"}>Category 1</MenuItem>
                  <MenuItem value={"Category 2"}>Category 2</MenuItem>
                  <MenuItem value={"Category 3"}>Category 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <InputLabel>Metric Allocation</InputLabel>
            <Select
              value={contraExpense.metricAllocation}
              onChange={(e) =>
                setContraExpense({
                  ...contraExpense,
                  metricAllocation: e.target.value,
                })
              }
            >
              <MenuItem value={"Metric 1"}>Metric 1</MenuItem>
              <MenuItem value={"Metric 2"}>Metric 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Expense Amount"
            value={contraExpense.expenseAmount}
            onChange={(e) =>
              setContraExpense({
                ...contraExpense,
                expenseAmount: e.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Select
                    value={contraExpense.currency}
                    onChange={(e) =>
                      setContraExpense({
                        ...contraExpense,
                        currency: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"EUR"}>EUR</MenuItem>
                    <MenuItem value={"GBP"}>GBP</MenuItem>
                  </Select>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="First Payment"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={contraExpense.firstPayment}
            onChange={(e) =>
              setContraExpense({
                ...contraExpense,
                firstPayment: e.target.value,
              })
            }
          />  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseContraPopup} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveContraExpense} color="primary">
            Save and Add Another
          </Button>
          <Button onClick={handleSaveContraExpense} color="primary">
            Save and Done
          </Button>
        </DialogActions>
      </Dialog>



              
      {/* Variable Expense Popup */}
       
        <Dialog open={openVariablePopup} onClose={handleCloseVariablePopup}>
      <DialogTitle sx={{ fontSize: 20 }}>Add Variable Expense</DialogTitle>
      <hr />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Recurrence</InputLabel>
              <Select
                value={variableExpense.recurrence}
                onChange={(e) =>
                  setVariableExpense({
                    ...variableExpense,
                    recurrence: e.target.value,
                  })
                }
              >
                <MenuItem value={"Daily"}>Daily</MenuItem>
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Yearly"}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Expense Status</InputLabel>
              <Select
                value={variableExpense.expenseStatus}
                onChange={(e) =>
                  setVariableExpense({
                    ...variableExpense,
                    expenseStatus: e.target.value,
                  })
                }
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Expense Label"
              value={variableExpense.expenseLabel}
              onChange={(e) =>
                setVariableExpense({
                  ...variableExpense,
                  expenseLabel: e.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Calculated Per"
              select
              value={variableExpense.calculatedPer}
              onChange={(e) =>
                setVariableExpense({
                  ...variableExpense,
                  calculatedPer: e.target.value,
                })
              }
            >
              <MenuItem value={"Order"}>Order</MenuItem>
              <MenuItem value={"Custom"}>Custom</MenuItem>
              {/* Add more options as needed */}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={variableExpense.category}
                onChange={(e) =>
                  setVariableExpense({
                    ...variableExpense,
                    category: e.target.value,
                  })
                }
              >
                <MenuItem value={"Category 1"}>Category 1</MenuItem>
                <MenuItem value={"Category 2"}>Category 2</MenuItem>
                <MenuItem value={"Category 3"}>Category 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Metric Allocation</InputLabel>
              <Select
                value={variableExpense.metricAllocation}
                onChange={(e) =>
                  setVariableExpense({
                    ...variableExpense,
                    metricAllocation: e.target.value,
                  })
                }
              >
                <MenuItem value={"Metric 1"}>Metric 1</MenuItem>
                <MenuItem value={"Metric 2"}>Metric 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              margin="normal"
              label="Expense Amount"
              value={variableExpense.expenseAmount}
              onChange={(e) =>
                setVariableExpense({
                  ...variableExpense,
                  expenseAmount: e.target.value,
                })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Select
                      value={variableExpense.currency}
                      onChange={(e) =>
                        setVariableExpense({
                          ...variableExpense,
                          currency: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"EUR"}>EUR</MenuItem>
                      <MenuItem value={"GBP"}>GBP</MenuItem>
                    </Select>
                  </InputAdornment>
                ),
              }}
            />
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
              value={variableExpense.firstPayment}
              onChange={(e) =>
                setVariableExpense({
                  ...variableExpense,
                  firstPayment: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseVariablePopup} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveVariableExpense} color="primary">
          Save and Add Another
        </Button>
        <Button onClick={handleSaveVariableExpense} color="primary">
          Save and Done
        </Button>
      </DialogActions>
    </Dialog>
    </TableContainer>
  );
};

export default ExpensesTable;
