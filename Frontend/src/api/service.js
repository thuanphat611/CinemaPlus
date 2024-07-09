import axios from 'axios';

const serviceClient = axios.create({
  baseURL: 'http://localhost:3033',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
});

export { 
  serviceClient 
};