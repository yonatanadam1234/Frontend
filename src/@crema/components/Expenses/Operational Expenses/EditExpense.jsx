import React from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  Grid,
} from "@mui/material";

const EditDrawer = ({ open, onClose, rowData, onChange, onSubmit }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{ width: 500, padding: 3 }}
        role="presentation"
      >
        <Typography variant="h3" gutterBottom>
          Edit Expense
        </Typography>
        <hr/>
        <hr/>
        
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.title}
                onChange={(e) => onChange("title", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.type}
                onChange={(e) => onChange("type", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Calculated Per"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.calculatedPer}
                onChange={(e) => onChange("calculatedPer", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.status}
                onChange={(e) => onChange("status", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.amount}
                onChange={(e) => onChange("amount", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="First Payment Date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.firstPaymentDate}
                onChange={(e) => onChange("firstPaymentDate", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Final Payment Date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={rowData.finalPaymentDate}
                onChange={(e) => onChange("finalPaymentDate", e.target.value)}
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
            <Button variant="contained" color="primary" type="submit">
              Edit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};

export default EditDrawer;
