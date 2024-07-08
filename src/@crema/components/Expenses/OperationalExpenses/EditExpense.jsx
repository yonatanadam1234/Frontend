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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EditDrawer = ({ open, onClose, rowData, onChange, onSubmit,isSubmitting }) => {
  return (
    <Dialog anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, padding: 6 }} role="presentation">
        <Typography variant="h4" gutterBottom sx={{ mb: 5 ,display: "flex", justifyContent: "space-between", fontSize: 20 }}>
          Edit Expense
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Recurrence</InputLabel>
                <Select
                  label="Recurrence"
                  variant="outlined"
                  value={rowData.recurrence}
                  onChange={(e) => onChange("recurrence", e.target.value)}
                >
                  <MenuItem value={"Monthly"}>Monthly</MenuItem>
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
                label="Category"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.category}
                onChange={(e) => onChange("category", e.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                label="Amount"
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.currency_amount}
                onChange={(e) => onChange("currency_amount", e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              gap: 1,
            }}
          >
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Save
            </Button>
           
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};
export default EditDrawer;


