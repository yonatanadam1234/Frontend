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
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { Checkbox, InputLabel, ListItemText, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';

const data = [
  {
    Costs: 1233,
    OtherRevenue: 500,
    ConProfit: 2000,
    NetProfit: 3453,
    GrossSales: 4000,
    COGS: 2000,
    Marketing: 557,
    Taxes: 200,
    AOV: 50,
    OperationalExpenses: 1000,
    TotalSales: 5000,
    Fulfillment: 6433,
    OrderedProductSales: 3000,
    TransactionFees: 200,
    Returns: 100,
    OrderCount: 50,
    ROAS: 2,
    POAS: 1.5,
    NetMargin: 0.3,
    ConMargin: 0.4,
    date: 'Jul-08-2024',
  },
  {
    Costs: 4321,
    OtherRevenue: 600,
    ConProfit: 2500,
    NetProfit: 5547,
    GrossSales: 4500,
    COGS: 2200,
    Marketing: 600,
    Taxes: 250,
    AOV: 55,
    OperationalExpenses: 1200,
    TotalSales: 5500,
    Fulfillment: 333,
    OrderedProductSales: 3500,
    TransactionFees: 250,
    Returns: 150,
    OrderCount: 60,
    ROAS: 2.2,
    POAS: 1.6,
    NetMargin: 0.35,
    ConMargin: 0.45,
    date: 'Jul-09-2024',

  },
  {
    Costs: 1334,
    OtherRevenue: 700,
    ConProfit: 2334,
    NetProfit: 2100,
    GrossSales: 400,
    COGS: 2400,
    Marketing: 2343,
    Taxes: 300,
    AOV: 60,
    OperationalExpenses: 1400,
    TotalSales: 6000,
    Fulfillment: 2334,
    OrderedProductSales: 4000,
    TransactionFees: 300,
    Returns: 200,
    OrderCount: 70,
    ROAS: 2.4,
    POAS: 1.7,
    NetMargin: 0.4,
    ConMargin: 0.5,
    date: 'Jul-10-2024',

  },
  {
    Costs: 1231,
    OtherRevenue: 800,
    ConProfit: 3500,
    NetProfit: 200,
    GrossSales: 5500,
    COGS: 2600,
    Marketing: 800,
    Taxes: 350,
    AOV: 65,
    OperationalExpenses: 1600,
    TotalSales: 2444,
    Fulfillment: 1600,
    OrderedProductSales: 4500,
    TransactionFees: 350,
    Returns: 250,
    OrderCount: 80,
    ROAS: 2.6,
    POAS: 1.8,
    NetMargin: 0.45,
    ConMargin: 0.55,
    date: 'Jul-11-2024',

  },
  {
    Costs: 1231,
    OtherRevenue: 900,
    ConProfit: 4000,
    NetProfit: 2700,
    GrossSales: 4000,
    COGS: 2800,
    Marketing: 900,
    Taxes: 400,
    AOV: 70,
    OperationalExpenses: 1800,
    TotalSales: 4533,
    Fulfillment: 1800,
    OrderedProductSales: 5000,
    TransactionFees: 400,
    Returns: 300,
    OrderCount: 90,
    ROAS: 2.8,
    POAS: 1.9,
    NetMargin: 0.5,
    ConMargin: 0.6,
    date: 'Jul-12-2024',

  },
  {
    Costs: 3232,
    OtherRevenue: 1000,
    ConProfit: 4500,
    NetProfit: 3000,
    GrossSales: 3000,
    COGS: 3000,
    Marketing: 1000,
    Taxes: 450,
    AOV: 75,
    OperationalExpenses: 2000,
    TotalSales: 7500,
    Fulfillment: 2000,
    OrderedProductSales: 5500,
    TransactionFees: 450,
    Returns: 233,
    OrderCount: 100,
    ROAS: 3,
    POAS: 2,
    NetMargin: 0.55,
    ConMargin: 0.65,
    date: 'Jul-13-2024',

  },
  {
    Costs: 3422,
    OtherRevenue: 1100,
    ConProfit: 5000,
    NetProfit: 3300,
    GrossSales: 7000,
    COGS: 3200,
    Marketing: 200,
    Taxes: 123,
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
    date: 'Jul-14-2024',

  },
  {
    Costs: 34,
    OtherRevenue: 234,
    ConProfit: 4323,
    NetProfit: 5678,
    GrossSales: 2345,
    COGS: 3453,
    Marketing: 200,
    Taxes: 500,
    AOV: 80,
    OperationalExpenses: 3422,
    TotalSales: 6754,
    Fulfillment: 2345,
    OrderedProductSales: 6755,
    TransactionFees: 353,
    Returns: 242,
    OrderCount: 110,
    ROAS: 3.2,
    POAS: 2.1,
    NetMargin: 0.6,
    ConMargin: 0.7,
    date: 'Jul-15-2024',
  },
];



const metricColors = {
  Costs: '#ED6347', // pink
  OtherRevenue: '#50B83C', // green
  ConProfit: '#6495ED', // blue
  NetProfit: '#FFD700', // yellow
  GrossSales: '#F49342', // red
  COGS: '#5C6AC4', // light green
  Marketing: '#47C1BF', // orange
  Taxes: '#E3D0FF', // dark red
  AOV: '#5F63B3', // light blue
  OperationalExpenses: '#FD6AC6', // purple
  TotalSales: '#390083', // magenta
  Fulfillment: '#9EBCDA', // dark green
  OrderedProductSales: '#637381', // dark blue
  TransactionFees: '#9C6F19', // beige
  Returns: '#084E8A', // light gray
  OrderCount: '#000000', // pale yellow
  ROAS: '#47C1BF', // coral
  POAS: '#47C1BF', // pale blue
  NetMargin: '#F49342', // pastel pink
  ConMargin: '#C05717', // pastel orange
};

const MixChart = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(Object.keys(data[0]).filter((metric) => metric !== 'date'));

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

  return (
    <Box>
      <FormControl sx={{ m: 1, width: 200, mt: 6 }}>
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
          sx={{
            width: 290,
            height: 50,
          }}>
          {Object.keys(data[0]).filter((metric) => metric !== 'date').map((metric) => (
            <MenuItem key={metric} value={metric}>
              <Checkbox checked={selectedMetrics.includes(metric)} onChange={() => handleMetricSelect(metric)} />
              <span
                style={{
                  backgroundColor: metricColors[metric],
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: 8,
                }}
              />
              <ListItemText primary={metric} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 4 }}>
        <ResponsiveContainer width={1400} height={450}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            {selectedMetrics.map((metric) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={metricColors[metric]}
                strokeWidth={3}
                strokeOpacity={0.7}
              />))}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MixChart;