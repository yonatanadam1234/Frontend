import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addCustomeExpense = (data) => {
  return axiosInstance.post('/expenses', data);
};
export const addContraExpense = (data) => {
  return axiosInstance.post('/expenses', data);
};
export const addVariableExpense = (data) => {
  return axiosInstance.post('/expenses', data);
};
export const getCustomeExpenseData = (userId) => {
  return axiosInstance.get(`/expenses?user_id=${userId}`);
};  
export const deleteExpense = (userId) => {
  return axiosInstance.get(`/expenses/${userId}`);
};  

export default { apiBaseUrl };
