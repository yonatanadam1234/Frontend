import axios from 'axios';

const apiConfig = axios?.create({
  baseURL: 'https://squid-app-oqakh.ondigitalocean.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
