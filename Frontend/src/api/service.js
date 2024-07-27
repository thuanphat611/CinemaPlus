import axios from 'axios';

const serviceClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
});

export { 
  serviceClient 
};