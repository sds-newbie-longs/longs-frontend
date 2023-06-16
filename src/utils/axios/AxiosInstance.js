import axios from 'axios';

export default axios.create({
  baseURL: 'http://35.216.94.36:8080/',
  // baseURL: 'http://localhost:8080/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
