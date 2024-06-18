import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;
console.log("🚀 ~ apiBaseUrl:", apiBaseUrl)

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEbayOrderData = (data) => {
  return axiosInstance.get('/order-list', { params: data });
};

export const getAmazonOrderData = (data) => {
  return axiosInstance.get('/order-list', { params: data });
};

export default { apiBaseUrl };