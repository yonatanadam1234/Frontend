import React, { useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PropTypes from 'prop-types';
import { FormControl, MenuItem, Select } from '@mui/material';
import { Checkbox, InputLabel, ListItemText, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import { Legend } from 'recharts';

const metricColors = {
  Sales: '#49BD65', 
  SalesProfit: '#0A8FDC', 
  SalesLost: '#F04F47', 
  NetProfit: '#3D5AFE', 
  margin:'#7ED4D2',
};

const MixBarChart = ({ data }) => {

  
  if (!data || !data.length) {
    return <Box>No data available</Box>;
  }

  const [selectedMetrics, setSelectedMetrics] = useState(Object.keys(data[0]).filter((metric) => metric !== 'name'));

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
          onChange={() => {}}
          input={<OutlinedInput label="Select Metrics" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{
            width: 290,
            height: 50,
          }}
        >
          {Object.keys(data[0]).filter((metric) => metric !== 'name').map((metric) => (
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

      <ResponsiveContainer width={1500} height={390}>
        <BarChart
          barSize={10}
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey='name' dy={10} />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetrics.includes('Sales') && <Bar dataKey='Sales' stackId='a' fill='#49BD65' radius={[10, 10, 0, 0]} />}
          {selectedMetrics.includes('SalesProfit') && <Bar dataKey='SalesProfit' stackId='b' fill='#0A8FDC' radius={[10, 10, 0, 0]} />}
          {selectedMetrics.includes('SalesLost') && <Bar dataKey='SalesLost' stackId='c' fill='#F04F47' radius={[10, 10, 0, 0]} />}
          {selectedMetrics.includes('NetProfit') && <Bar dataKey='NetProfit' stackId='d' fill='#3D5AFE' radius={[10, 10, 0, 0]} />}
          {selectedMetrics.includes('margin') && <Bar dataKey='margin' stackId='e' fill='#7ED4D2' radius={[10, 10, 0, 0]} />}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

MixBarChart.defaultProps = {
  data: [],
};

MixBarChart.propTypes = {
  data: PropTypes.array,
};

export default MixBarChart;
