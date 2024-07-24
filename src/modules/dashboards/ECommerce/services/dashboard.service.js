// services/expense.service.js
import axios from 'axios';

// const apiBaseUrl = 'https://dfe680d0-3b1e-43f5-8d0e-bbac3cbf1dd8.mock.pstmn.io/';
const apiBaseUrl = import.meta.env.VITE_MOCKAPI_LINK;

const token = localStorage.getItem('token')
const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: { Authorization: `Bearer ${token}` },

    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Authorization: `Bearer ${token}`,
    //   },
});
export const getreportData = async () => {
    return await axiosInstance.get(`/getreportdata`);
};
export const getsalesgraphData = async () => {
    return await axiosInstance.get(`/getsalesgraphdata`);
};
export const getexpenseprofitData = async () => {
    return await axiosInstance.get(`/getexpenseprofitdata`);
};
export const getrecentOrder = async () => {
    return await axiosInstance.get(`/getrecentorders`);
};
export const getrevenueData = async () => {
    return await axiosInstance.get(`/getrevenuedata`);
};
export const getpopularProduct = async () => {
    return await axiosInstance.get(`/getpopularproducts`);
};

export default { apiBaseUrl };
