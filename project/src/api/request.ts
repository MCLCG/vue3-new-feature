import axios from 'axios';

export const createRequest = axios.create({
  baseURL: 'http://localhost:5173/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
