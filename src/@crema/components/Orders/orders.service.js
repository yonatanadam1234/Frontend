import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;
const token =localStorage.getItem('token')

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,

  },
});

export const getEbayOrderData = (data) => {
  return axiosInstance.get('/order-list', { params: data });
};

export const getAmazonOrderData = (data) => {
  return axiosInstance.get('/order-list', { params: data });
};

export default { apiBaseUrl };

