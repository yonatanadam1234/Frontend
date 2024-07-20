import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_LINK;
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export const updateSubscription = async (subscriptionId) => {
    return axiosInstance.put('auth/edit/subscription', {
        subscription: subscriptionId,
    });
};
export const pricingPlanData = async () => {
    return axiosInstance.get('pricing-plan-list', {
    });
};
