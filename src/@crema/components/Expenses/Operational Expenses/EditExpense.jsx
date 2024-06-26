import React from "react";
import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EditDrawer = ({ open, onClose, rowData, onChange, onSubmit }) => {
  return (
    <Dialog anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, padding: 6 }} role="presentation">
        <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
          Edit Expense
        </Typography>

        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.expense_label}
                onChange={(e) => onChange("expense_label", e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.type}
                disabled
              />
            </Grid> */}
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Calculated Per</InputLabel>
                <Select
                  label="Calculated Per"
                  variant="outlined"
                  value={rowData.calculated_per}
                  onChange={(e) => onChange("calculated_per", e.target.value)}
                >
                  <MenuItem value={"Order"}>Order</MenuItem>
                  <MenuItem value={"Custom"}>Custom</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  variant="outlined"
                  value={rowData.status}
                  onChange={(e) => onChange("status", e.target.value)}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.currency_amount}
                onChange={(e) => onChange("currency_amount", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Payment Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={rowData.first_payment}
                onChange={(e) => onChange("first_payment", e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={6}>
              <TextField
                label="Final Payment Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={rowData.finalPaymentDate}
                onChange={(e) => onChange("finalPaymentDate", e.target.value)}
              />
            </Grid> */}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              gap: 1,
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default EditDrawer;
