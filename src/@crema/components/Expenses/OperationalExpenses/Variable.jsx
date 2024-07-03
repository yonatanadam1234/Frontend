// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, InputAdornment, IconButton } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import CloseIcon from "@mui/icons-material/Close";
// import {toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuthUser } from '../../../hooks/AuthHooks';
// import { addVariableExpense } from '../services/expense.service';
// const Variable = ({ open, handleSubmit, handleCloseVariable }) => {
//   const validationSchema = Yup.object().shape({
//     recurrence: Yup.string().required('Recurrence is required'),
//     expenseStatus: Yup.string().required('Expense Status is required'),
//     expenseLabel: Yup.string().required('Expense Label is required'),
//     category: Yup.string().required('Category is required'),
//     expenseAmount: Yup.number().required('Expense Amount is required'),
//   });
//   const { user } = useAuthUser();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formikVariableExpense = useFormik({
//     initialValues: {
//       recurrence: '',
//       expenseStatus: 'Active',
//       expenseLabel: '',
//       category: '',
//       expenseAmount: '',
//       currency: '$',
//     },

//     validationSchema: validationSchema,
//     onSubmit: async (values, { resetForm }) => {
//       if (isSubmitting) return;
//       setIsSubmitting(true);
//       try {
//         const obj = {
//           user_id: user.id,
//           recurrence: values.recurrence,
//           status: values.expenseStatus === 'Active' ? '1' : '0',
//           expense_label: values.expenseLabel,
//           category: values.category,
//           currency_amount: values.expenseAmount,
//           currency_icon: values.currency,
//         }
//         const response = await addVariableExpense(obj)
//         if (response.data.success) {
//           toast.success("Variable Expense Created Succesfully!");
//           console.log('Response:', response.data);
//           handleSubmit(values);
//           resetForm();
//         }
//         else {
//           toast.error("Somthing is Wrong!!")
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//       }
//       finally {
//         setIsSubmitting(false);
//       }
//     },
//   });
//   const currencies = [
//     { value: "$", label: "$ (USD)" },
//     { value: "€", label: "€ (EUR)" },
//     { value: "฿", label: "฿ (THB)" },
//     { value: "¥", label: "¥ (JPY)" },
//     { value: "£", label: "£ (GBP)" },
//     { value: "₹", label: "₹ (INR)" },
//     { value: "₺", label: "₺ (TRY)" },
//     { value: "₽", label: "₽ (RUB)" },
//     { value: "₫", label: "₫ (VND)" },
//   ];
//   return (
//     <Dialog open={open} onClose={handleCloseVariable}>
//       <DialogTitle sx={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
//         Add Variable Expense
//         <IconButton onClick={handleCloseVariable}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <hr style={{ opacity: '0.2' }} />
//       <form onSubmit={formikVariableExpense.handleSubmit}>

//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Recurrence</InputLabel>
//                 <Select label="Recurrence"  {...formikVariableExpense.getFieldProps('recurrence')}>
//                     {/* <MenuItem value={'Daily'}>Daily</MenuItem>
//                     <MenuItem value={'Weekly'}>Weekly</MenuItem> */}
//                   <MenuItem value={'Monthly'}>Monthly</MenuItem>
//                   {/* <MenuItem value={'Yearly'}>Yearly</MenuItem> */}
//                 </Select>
//                 {formikVariableExpense.touched.recurrence && formikVariableExpense.errors.recurrence ? (
//                   <div style={{ color: 'red' }}>{formikVariableExpense.errors.recurrence}</div>
//                 ) : null}
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Expense Status</InputLabel>
//                 <Select
//                   label="Expense Status"
//                   {...formikVariableExpense.getFieldProps('expenseStatus')}
//                 >
//                   <MenuItem value={"Active"}>Active</MenuItem>
//                   <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                 </Select>
//                 {formikVariableExpense.touched.expenseStatus && formikVariableExpense.errors.expenseStatus ? (
//                   <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseStatus}</div>
//                 ) : null}
//               </FormControl>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Expense Label"
//                 {...formikVariableExpense.getFieldProps('expenseLabel')}
//               />
//               {formikVariableExpense.touched.expenseLabel && formikVariableExpense.errors.expenseLabel ? (
//                 <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseLabel}</div>
//               ) : null}
//             </Grid>

//             <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   margin="normal"
//                   label="Category"
//                   {...formikVariableExpense.getFieldProps('category')}
//                 />
//                 {formikVariableExpense.touched.category && formikVariableExpense.errors.category ? (
//                   <div style={{ color: 'red' }}>{formikVariableExpense.errors.category}</div>
//                 ) : null}
//               </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 type='number'
//                 margin="normal"
//                 label="Expense Amount"
//                 {...formikVariableExpense.getFieldProps('expenseAmount')}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <TextField
//                         style={{ padding: "0px 5px" }}
//                         id="standard-select-currency"
//                         select
//                         label="Currency"
//                         defaultValue="EUR"
//                         variant="standard"
//                         {...formikVariableExpense.getFieldProps('currency')}
//                       >
//                         {currencies.map((option) => (
//                           <MenuItem key={option.value} value={option.value}>
//                             {option.label}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               {formikVariableExpense.touched.expenseAmount && formikVariableExpense.errors.expenseAmount ? (
//                 <div style={{ color: 'red' }}>{formikVariableExpense.errors.expenseAmount}</div>
//               ) : null}
//             </Grid>

//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ padding: 3 }}>
//           {/* <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}>
//             Save and Add Another
//           </Button> */}
//           <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }}  disabled={isSubmitting}>
//             Save and Done
//           </Button>
//           <Button onClick={() => {
//             formikVariableExpense.resetForm();
//           }} color="primary" style={{ background: '#707070', color: '#fff', padding: '8px 18px' }}>
//             Clear
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };

// export default Variable;
