// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Button, InputAdornment, IconButton } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import CloseIcon from "@mui/icons-material/Close";
// import { useAuthUser } from '../../../hooks/AuthHooks';
// import { addContraExpense } from '../services/expense.service';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const Contra = ({ open, handleSubmit, handleCloseContra }) => {
//     const validationSchema = Yup.object().shape({
//         recurrence: Yup.string().required('Recurrence is required'),
//         expenseStatus: Yup.string().required('Expense Status is required'),
//         expenseLabel: Yup.string().required('Expense Label is required'),
//         // calculatedPer: Yup.string().required('Calculated Per is required'),
//         category: Yup.string().required('Category is required'),
//         // metricAllocation: Yup.string().required('Metric Allocation is required'),
//         expenseAmount: Yup.number().required('Expense Amount is required'),
//         // firstPayment: Yup.date().required('First Payment is required'),
//         // user_id: Yup.string().required('User ID is required'),
//         // status: Yup.string().required('Status is required'),
//     });
//     const { user } = useAuthUser();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const formikContraExpense = useFormik({
//         initialValues: {
//             recurrence: '',
//             expenseStatus: 'Active',
//             expenseLabel: '',
//             category: '',
//             expenseAmount: '',
//             currency: '$',
            
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values, { resetForm }) => {
//             if (isSubmitting) return;
//             setIsSubmitting(true);

//             try {
//                 const obj = {
//                     user_id: user.id,
//                     recurrence: values.recurrence,
//                     status: values.expenseStatus === 'Active' ? '1' : '0',
//                     expense_label: values.expenseLabel,
//                     category: values.category,
//                     currency_amount: values.expenseAmount,
//                     currency_icon: values.currency,
//                 };

//                 const response = await addContraExpense(obj);
//                 if (response.data.success) {
//                     toast.success("Contra Expense Created Successfully!");
//                     handleSubmit(values);
//                     resetForm();
//                 } else {
//                     toast.error("Something went wrong!!");
//                 }
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//             } finally {
//                 setIsSubmitting(false);
//             }
//         },
//     });

//     const currencies = [
//         { value: "$", label: "$ (USD)" },
//         { value: "€", label: "€ (EUR)" },
//         { value: "฿", label: "฿ (THB)" },
//         { value: "¥", label: "¥ (JPY)" },
//         { value: "£", label: "£ (GBP)" },
//         { value: "₹", label: "₹ (INR)" },
//         { value: "₺", label: "₺ (TRY)" },
//         { value: "₽", label: "₽ (RUB)" },
//         { value: "₫", label: "₫ (VND)" },
//     ];

//     return (
//         <Dialog open={open} onClose={handleCloseContra} fullWidth>
//             <DialogTitle sx={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
//                 Add Contra Variable Expense
//                 <IconButton onClick={handleCloseContra}>
//                     <CloseIcon />
//                 </IconButton>
//             </DialogTitle>

//             <hr style={{ opacity: '0.2' }} />
//             <form onSubmit={formikContraExpense.handleSubmit}>
//                 <DialogContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Recurrence</InputLabel>
//                                 <Select
//                                     label="Recurrence"
//                                     {...formikContraExpense.getFieldProps('recurrence')}
//                                 >
//                                     {/* <MenuItem value={"Daily"}>Daily</MenuItem>
//                                     <MenuItem value={"Weekly"}>Weekly</MenuItem> */}
//                                     <MenuItem value={"Monthly"}>Monthly</MenuItem>
//                                     {/* <MenuItem value={"Yearly"}>Yearly</MenuItem> */}
//                                 </Select>
//                                 {formikContraExpense.touched.recurrence && formikContraExpense.errors.recurrence ? (
//                                     <div style={{ color: 'red' }}>{formikContraExpense.errors.recurrence}</div>
//                                 ) : null}
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Expense Status</InputLabel>
//                                 <Select
//                                     label="Expense Status"
//                                     {...formikContraExpense.getFieldProps('expenseStatus')}
//                                 >
//                                     <MenuItem value={"Active"}>Active</MenuItem>
//                                     <MenuItem value={"Inactive"}>Inactive</MenuItem>
//                                 </Select>
//                                 {formikContraExpense.touched.expenseStatus && formikContraExpense.errors.expenseStatus ? (
//                                     <div style={{ color: 'red' }}>{formikContraExpense.errors.expenseStatus}</div>
//                                 ) : null}
//                             </FormControl>
//                         </Grid>
//                     </Grid>

//                     <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 label="Expense Label"
//                                 {...formikContraExpense.getFieldProps('expenseLabel')}
//                             />
//                             {formikContraExpense.touched.expenseLabel && formikContraExpense.errors.expenseLabel ? (
//                                 <div style={{ color: 'red' }}>{formikContraExpense.errors.expenseLabel}</div>
//                             ) : null}
//                         </Grid>
        
//                         <Grid item xs={6}>
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 label="Category"
//                                 {...formikContraExpense.getFieldProps('category')}
//                             />
//                             {formikContraExpense.touched.category && formikContraExpense.errors.category ? (
//                                 <div style={{ color: 'red' }}>{formikContraExpense.errors.category}</div>
//                             ) : null}
//                         </Grid>

//                         <Grid item xs={12}>
//                             <TextField
//                                 fullWidth
//                                 margin="normal"
//                                 type='number'
//                                 label="Expense Amount"
//                                 {...formikContraExpense.getFieldProps('expenseAmount')}
//                                 InputProps={{
//                                     endAdornment: (
//                                         <InputAdornment position="end">
//                                             <TextField
//                                                 style={{ padding: "0px 5px" }}
//                                                 id="standard-select-currency"
//                                                 select
//                                                 label="Currency"
//                                                 defaultValue="$"
//                                                 variant="standard"
//                                                 {...formikContraExpense.getFieldProps('currency')}
//                                             >
//                                                 {currencies.map((option) => (
//                                                     <MenuItem key={option.value} value={option.value}>
//                                                         {option.label}
//                                                     </MenuItem>
//                                                 ))}
//                                             </TextField>
//                                         </InputAdornment>
//                                     ),
//                                 }}
//                             />
//                             {formikContraExpense.touched.expenseAmount && formikContraExpense.errors.expenseAmount ? (
//                                 <div style={{ color: 'red' }}>{formikContraExpense.errors.expenseAmount}</div>
//                             ) : null}
//                         </Grid>

              
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions sx={{ padding: 3 }}>
//                     <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 1 }} disabled={isSubmitting}>
//                         Save and Done
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             formikContraExpense.resetForm();
//                         }}
//                         color="primary"
//                         style={{ background: '#707070', color: '#fff', padding: '8px 18px' }}
//                     >
//                         Clear
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
//     );
// };

// export default Contra;
