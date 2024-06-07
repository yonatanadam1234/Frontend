import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import data from './data';
import { Typography } from '@mui/material';

const SalesReport = () => (
  <>
  <Typography sx={{padding:5, fontSize:20}}>Daily Sales</Typography>
  <ResponsiveContainer width='100%' height={300} >
    <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
      <XAxis dataKey='name' />
      <YAxis />
      <CartesianGrid strokeDasharray='3 3' />
      <Tooltip />
      <Legend />
      <Line
        type='monotone'
        dataKey='pv'
        stroke='#4299E1'
        activeDot={{ r: 8 }}
      />
      <Line type='monotone' dataKey='uv' stroke='#F04F47' />
    </LineChart>
  </ResponsiveContainer>
  </>
);
export default SalesReport;
