import axios from 'axios';
const baseURL = import.meta.env.VITE_API_LINK;

const apiConfig = axios?.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
