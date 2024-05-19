import axios from 'axios';

const tmdbClient = axios.create({
  baseURL: 'http://localhost:3033',
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDI4N2QxNzFiY2RlMWYzNjkxNDNmMDg1NGYyYWI4NSIsInN1YiI6IjY2M2U0YTliNjM2NDBiZTEyOWU4ZDlhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ytjl_5GiYDCC6p34F9c1NTKjmUxMe0bywadUYJp9D0'
  }
})

export { tmdbClient };