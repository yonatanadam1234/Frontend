// services/expense.service.js
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;

const token = localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const getExpenseData = (userId) => {
  return axiosInstance.get(`/expenses?user_id=${userId}`);
};

export default { apiBaseUrl };
