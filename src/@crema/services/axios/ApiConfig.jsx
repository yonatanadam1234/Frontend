import axios from 'axios';
const apiBase = import.meta.env.VITE_API_LINK;

const apiConfig = axios?.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
