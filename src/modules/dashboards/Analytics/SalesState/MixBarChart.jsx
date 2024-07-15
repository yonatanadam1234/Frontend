import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Checkbox, InputLabel, ListItemText, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';

const data = [
  {
    Costs: 1000,
    OtherRevenue: 500,
    ConProfit: 2000,
    NetProfit: 1500,
    GrossSales: 4000,
    COGS: 2000,
    Marketing: 500,
    Taxes: 200,
    AOV: 50,
    OperationalExpenses: 1000,
    TotalSales: 5000,
    Fulfillment: 1000,
    OrderedProductSales: 3000,
    TransactionFees: 200,
    Returns: 100,
    OrderCount: 50,
    ROAS: 2,
    POAS: 1.5,
    NetMargin: 0.3,
    ConMargin: 0.4,
    date: 'Feb-01-2023',
  },
  {
    Costs: 1200,
    OtherRevenue: 600,
    ConProfit: 2500,
    NetProfit: 1800,
    GrossSales: 4500,
    COGS: 2200,
    Marketing: 600,
    Taxes: 250,
    AOV: 55,
    OperationalExpenses: 1200,
    TotalSales: 5500,
    Fulfillment: 1200,
    OrderedProductSales: 3500,
    TransactionFees: 250,
    Returns: 150,
    OrderCount: 60,
    ROAS: 2.2,
    POAS: 1.6,
    NetMargin: 0.35,
    ConMargin: 0.45,
    date: 'Feb-02-2023',

  },
  {
    Costs: 1400,
    OtherRevenue: 700,
    ConProfit: 3000,
    NetProfit: 2100,
    GrossSales: 5000,
    COGS: 2400,
    Marketing: 700,
    Taxes: 300,
    AOV: 60,
    OperationalExpenses: 1400,
    TotalSales: 6000,
    Fulfillment: 1400,
    OrderedProductSales: 4000,
    TransactionFees: 300,
    Returns: 200,
    OrderCount: 70,
    ROAS: 2.4,
    POAS: 1.7,
    NetMargin: 0.4,
    ConMargin: 0.5,
    date: 'Feb-03-2023',

  },
  {
    Costs: 1600,
    OtherRevenue: 800,
    ConProfit: 3500,
    NetProfit: 2400,
    GrossSales: 5500,
    COGS: 2600,
    Marketing: 800,
    Taxes: 350,
    AOV: 65,
    OperationalExpenses: 1600,
    TotalSales: 6500,
    Fulfillment: 1600,
    OrderedProductSales: 4500,
    TransactionFees: 350,
    Returns: 250,
    OrderCount: 80,
    ROAS: 2.6,
    POAS: 1.8,
    NetMargin: 0.45,
    ConMargin: 0.55,
    date: 'Feb-04-2023',

  },
  {
    Costs: 1800,
    OtherRevenue: 900,
    ConProfit: 4000,
    NetProfit: 2700,
    GrossSales: 6000,
    COGS: 2800,
    Marketing: 900,
    Taxes: 400,
    AOV: 70,
    OperationalExpenses: 1800,
    TotalSales: 7000,
    Fulfillment: 1800,
    OrderedProductSales: 5000,
    TransactionFees: 400,
    Returns: 300,
    OrderCount: 90,
    ROAS: 2.8,
    POAS: 1.9,
    NetMargin: 0.5,
    ConMargin: 0.6,
    date: 'Feb-05-2023',

  },
  {
    Costs: 2000,
    OtherRevenue: 1000,
    ConProfit: 4500,
    NetProfit: 3000,
    GrossSales: 6500,
    COGS: 3000,
    Marketing: 1000,
    Taxes: 450,
    AOV: 75,
    OperationalExpenses: 2000,
    TotalSales: 7500,
    Fulfillment: 2000,
    OrderedProductSales: 5500,
    TransactionFees: 450,
    Returns: 350,
    OrderCount: 100,
    ROAS: 3,
    POAS: 2,
    NetMargin: 0.55,
    ConMargin: 0.65,
    date: 'Feb-06-2023',

  },
  {
    Costs: 2200,
    OtherRevenue: 1100,
    ConProfit: 5000,
    NetProfit: 3300,
    GrossSales: 7000,
    COGS: 3200,
    Marketing: 1100,
    Taxes: 500,
    AOV: 80,
    OperationalExpenses: 2200,
    TotalSales: 8000,
    Fulfillment: 2200,
    OrderedProductSales: 6000,
    TransactionFees: 500,
    Returns: 400,
    OrderCount: 110,
    ROAS: 3.2,
    POAS: 2.1,
    NetMargin: 0.6,
    ConMargin: 0.7,
    date: 'Feb-07-2023',

  },
];


const MixBarChart = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const handleMetricSelect = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter((m) => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 300,
        width: 250,
      },
    },
  };

  const colors = [
    '#8884d8', '#ff69b4', '#32cd32', '#ffd700', '#6495ed', '#dc143c', '#7fffd4', '#ff7f50', '#8b0a1a', '#4682b4', '#9400ff', '#ff00ff', '#008000', '#4b0082', '#f0e4cc', '#add8e6', '#e5d8b6', '#f08080',
  ];

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 200, mt: 6, ml: 26 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select Metrics</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedMetrics}
          onChange={() => { }}
          input={<OutlinedInput label="Select Metrics" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {data[0] &&
            Object.keys(data[0]).map((metric, index) => (
              <MenuItem key={metric} value={metric}>
                <Checkbox checked={selectedMetrics.includes(metric)} onChange={() => handleMetricSelect(metric)} selected />
                <ListItemText primary={metric} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 4, ml: 10 }}>
        <ResponsiveContainer width={1000} height={400}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            {selectedMetrics.map((metric, index) => (
              <Line key={metric} type="monotone" dataKey={metric} stroke={colors[index % colors.length]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MixBarChart;