import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
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

export const deleteShopData = (userId,state) => { 
  return axiosInstance.post(`/remove-store`,{
   userId,
   state
  });
};



export default { apiBaseUrl };
