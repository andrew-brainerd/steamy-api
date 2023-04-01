import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.steampowered.com',
  headers: { 'Content-Type': 'application/json' }
});

export default client;
