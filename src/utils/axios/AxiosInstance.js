import axios from 'axios';

export default axios.create({
  baseURL: 'longs-api.iamnew.net/',
  // baseURL: 'http://localhost:8080/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
