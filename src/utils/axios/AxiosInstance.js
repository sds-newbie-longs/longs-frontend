import axios from 'axios';

export default axios.create({
  baseURL: 'http://serverUrl.com/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
