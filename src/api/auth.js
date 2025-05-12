// auth.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL; // ✅ Matches .env

export const loginAdmin = async (email, password) => {
  return await axios.post(`${API_URL}/admin/login`, { email, password });
};

export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/users/login`, { email, password });
};
