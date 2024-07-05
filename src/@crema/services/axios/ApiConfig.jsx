import axios from 'axios';

const apiConfig = axios?.create({
  baseURL: 'https://platform.anyprofit.io/staging/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
