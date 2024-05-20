import axios from 'axios';
const accessToken = 'Bearer ' + process.env.REACT_APP_TMBD_ACCESS_TOKEN;

const tmdbClient = axios.create({
  baseURL: 'http://localhost:3033',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': accessToken
  }
})

export { tmdbClient };