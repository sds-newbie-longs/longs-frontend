import axios from 'axios';

export default axios.create({
  // baseURL: 'http://35.216.94.36/',
  // baseURL: 'http://localhost:8080/',
  // baseURL: 'http://dev.rainmaker.cool/',
  baseURL: 'https://longs-api.iamnew.net/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
