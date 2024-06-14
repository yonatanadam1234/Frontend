import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getShopAuthorizeUrl = (email, region, platform, storeName, storefrontURL, timezone, userId) => {
  return axiosInstance.post('/get-authorize-url', {
    email,
    region,
    platform,
    store_name: storeName,
    store_url: storefrontURL,
    time_zone: timezone,
    user_id: userId
  });
};

export const getAccessToken = (state) => {
  return axiosInstance.post('/get-access-token-through-state', {
    state,
  });
};

export const getShopData = (userId) => {
  return axiosInstance.get(`/get-seller-data?userId=${userId}`);
};

export default { apiBaseUrl };
