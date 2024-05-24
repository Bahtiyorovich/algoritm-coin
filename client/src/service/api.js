import axios from "axios";
import { getItem } from "../helpers/cookie-storage";

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your actual API URL// This ensures cookies are sent with each request
});

instance.interceptors.request.use(config => { 
  const token = getItem('token');
  const authorization = token ? `Token ${token}` : ''; 
  config.headers.Authorization = authorization;
  return config;
});

export default instance;
