import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;
const apiBaseUrlUS = import.meta.env.VITE_API_LINKUS;

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});
const axiosInstanceUs = axios.create({
    BaseUrlUS: apiBaseUrlUS,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getShopAuthorizeUrl = (email, platform, storeName, storefrontURL, region, timezone) => {
    return axiosInstance.post('/get-authorize-url', {
        email,
        platform,
        storeName,
        storefrontURL,
        region,
        timezone,
    });
};

export const getAccessToken = (state) => {
    return axiosInstance.post('/get-access-token-through-state', {
        state: state,
    });
};

export const CreateShop = (platform,
    state,
    JWTtoken,
    accessToken) => {
    return axiosInstanceUs.post('/shop/create', {
        state,
        platform,
        JWTtoken,
        accessToken
    });
};


export default { apiBaseUrl, apiBaseUrlUS };
