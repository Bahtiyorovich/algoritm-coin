import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true // Replace with your actual API URL// This ensures cookies are sent with each request
});

export default instance;
