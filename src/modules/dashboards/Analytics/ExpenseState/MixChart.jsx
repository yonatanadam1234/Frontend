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

const MixChart = ({data}) => {
  if (!data || !data.length) {
    return <Box>No data available</Box>;
  }
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