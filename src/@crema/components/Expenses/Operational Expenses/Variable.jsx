import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloseIcon from "@mui/icons-material/Close";
import {toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuthUser } from '../../../hooks/AuthHooks';
import { addVariableExpense } from '../services/expense.service';
const Variable = ({ open, handleSubmit, handleCloseVariable }) => {
  const validationSchema = Yup.object().shape({
    recurrence: Yup.string().required('Recurrence is required'),
    expenseStatus: Yup.string().required('Expense Status is required'),
    expenseLabel: Yup.string().required('Expense Label is required'),
    calculatedPer: Yup.string().required('Calculated Per is required'),
    category: Yup.string().required('Category is required'),
    metricAllocation: Yup.string().required('Metric Allocation is required'),
    expenseAmount: Yup.number().required('Expense Amount is required'),
    firstPayment: Yup.date().required('First Payment is required'),
  });
  const { user } = useAuthUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formikVariableExpense = useFormik({
    initialValues: {
      recurrence: '',
      expenseStatus: '',
      expenseLabel: '',
      calculatedPer: '',
      category: '',
      metricAllocation: '',
      expenseAmount: '',
      currency: '$',
      firstPayment: '',
    },

    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const obj = {
          user_id: user.id,
          recurrence: values.recurrence,
          status: values.expenseStatus === 'Active' ? '1' : '0',
          expense_label: values.expenseLabel,
          category: values.category,
          calculated_per: values.calculatedPer,
          metric_allocation: values.metricAllocation,
          currency_amount: values.expenseAmount,
          currency_icon: values.currency,
          first_payment: values.firstPayment
        }
        const response = await addVariableExpense(obj)
        if (response.data.success) {
          toast.success("Variable Expense Created Succesfully!");
          console.log('Response:', response.data);
          handleSubmit(values);
          resetForm();
        }
        else {
          toast.error("Somthing is Wrong!!")
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      finally {
        setIsSubmitting(false);
      }
    },
  });
  const currencies = [
    {
      value: "$",
      label: "$",
    },
    {
      value: "€",
      label: "€",
    },
    {
      value: "฿",
      label: "฿",
    },
    {
      value: "¥",
      label: "¥",
    },
  ];
  return (
    <Dialog open={open} onClose={handleCloseVariable}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
        Add Variable Expense
        <IconButton onClick={handleCloseVariable}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <hr style={{ opacity: '0.2' }} />
      <form onSubmit={formikVariableExpense.handleSubmit}>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Recurrence</InputLabel>
                <Select label="Recurrence"  {...formikVariableExpense.getFieldProps('recurrence')}>
                  <MenuItem value={'Daily'}>Daily</MenuItem>
                  <MenuItem value={'Weekly'}>Weekly</MenuItem>
                  <MenuItem value={'Monthly'}>Monthly</MenuItem>
                  <MenuItem value={'Yearly'}>Yearly</MenuItem>
                </Select>
                {formikVariableExpense.touched.recurrence && formikVariableExpense.errors.recurrence ? (
                  <div style={{ color: 'red' }}>{formikVariableExpense.errors.recurrence}</div>
                ) : null}
              </FormControl>
            </Grid>
            {/* Similar form fields */}
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
          {/* <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Save and Add Another
          </Button> */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}  disabled={isSubmitting}>
            Save and Done
          </Button>
          <Button onClick={() => {
            formikVariableExpense.resetForm();
          }} color="primary" style={{ background: '#707070', color: '#fff', padding: '8px 18px' }}>
            Clear
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Variable;
