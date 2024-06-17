import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEbayOrderData = (data) => {
  return axiosInstance.get('/get-seller-data', { params: data });
};

export default { apiBaseUrl };