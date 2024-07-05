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

export const getShopAuthorizeUrl = (data) => {
  return axiosInstance.post('/get-authorize-url', data);
};

export const getAccessToken = (state) => {
  return axiosInstance.post('/get-access-token-through-state', {
    state, 
  });
};

export const getShopData = (userId) => {
  return axiosInstance.get(`/get-seller-data?userId=${userId}`);
};

export const deleteShopData = (userId, shopid) => {
  return axiosInstance.post(`/remove-store`, {
    userId,
    sellerId:shopid
  });
};



export default { apiBaseUrl };
